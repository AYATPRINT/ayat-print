<?php
/**
 * Plugin Name: Ayat Studio Connector
 * Description: Connects WooCommerce product pages to the external Ayat Studio SPA for artwork customization.
 * Version: 1.0.0
 * Author: AyatPrint Engineering
 */

if (!defined('ABSPATH')) exit;

// ─── Configuration ──────────────────────────────────────────────────────────────
define('AYAT_STUDIO_URL', getenv('AYAT_STUDIO_URL') ?: 'http://localhost:5173');
define('AYAT_API_URL', getenv('AYAT_API_URL') ?: 'http://api:3002');
define('AYAT_API_PUBLIC_URL', getenv('AYAT_API_PUBLIC_URL') ?: 'http://localhost:3002');

// ─── 1. Add "Customize in Ayat Studio" Button to Product Pages ──────────────────
add_action('woocommerce_after_add_to_cart_button', 'ayat_add_studio_button');
function ayat_add_studio_button() {
    global $product;
    if (!$product) return;

    $product_id = $product->get_id();
    $product_name = esc_attr($product->get_name());
    $return_url = urlencode(home_url('/ayat-return/'));
    $studio_url = AYAT_STUDIO_URL . "/?mode=headless&productId={$product_id}&productName={$product_name}&returnUrl={$return_url}";
    
    echo '<div style="margin-top: 15px;">';
    echo '<a href="' . esc_url($studio_url) . '" class="button alt wp-element-button" style="background-color: #C5A059; color: #1C1917; border: none; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 12px 24px; display: block; text-align: center; font-size: 14px;">';
    echo '✦ Customize in Ayat Studio';
    echo '</a>';
    echo '</div>';
}

// ─── 2. Register Custom Return Endpoint ─────────────────────────────────────────
add_action('init', 'ayat_register_return_endpoint');
function ayat_register_return_endpoint() {
    add_rewrite_rule('^ayat-return/?$', 'index.php?ayat_return=1', 'top');
}

add_filter('query_vars', 'ayat_add_query_vars');
function ayat_add_query_vars($vars) {
    $vars[] = 'ayat_return';
    $vars[] = 'design_id';
    return $vars;
}

add_action('template_redirect', 'ayat_handle_return');
function ayat_handle_return() {
    if (!get_query_var('ayat_return')) return;

    $design_id = isset($_GET['design_id']) ? sanitize_text_field($_GET['design_id']) : '';
    if (empty($design_id)) {
        wp_redirect(wc_get_cart_url());
        exit;
    }

    // Fetch design details from the Core API
    $api_url = AYAT_API_URL . '/api/designs/' . $design_id;
    $response = wp_remote_get($api_url, ['timeout' => 10]);
    
    if (is_wp_error($response)) {
        wc_add_notice('Could not fetch design details. Please try again.', 'error');
        wp_redirect(wc_get_cart_url());
        exit;
    }

    $design = json_decode(wp_remote_retrieve_body($response), true);
    if (!$design || !isset($design['id'])) {
        wc_add_notice('Design not found. Please try again.', 'error');
        wp_redirect(wc_get_cart_url());
        exit;
    }

    // Add to WooCommerce cart as a custom item
    $cart_item_data = [
        'ayat_design_id'     => $design['id'],
        'ayat_artwork_id'    => $design['artworkId'],
        'ayat_preview_image' => $design['previewImage'],
        'ayat_material'      => $design['material'],
        'ayat_frame'         => $design['frame'],
        'ayat_size'          => $design['size'],
        'ayat_language'      => $design['language'],
        'ayat_custom_price'  => floatval($design['price']),
    ];

    // Find the first WooCommerce product to use as the base (or use a dedicated "custom" product)
    $products = wc_get_products(['limit' => 1, 'status' => 'publish']);
    $product_id = !empty($products) ? $products[0]->get_id() : 0;

    if ($product_id) {
        WC()->cart->add_to_cart($product_id, 1, 0, [], $cart_item_data);
        wc_add_notice('Your custom artwork has been added to the cart!', 'success');
    }

    wp_redirect(wc_get_cart_url());
    exit;
}

// ─── 3. Override Price in Cart with Custom Design Price ─────────────────────────
add_action('woocommerce_before_calculate_totals', 'ayat_set_custom_price', 20, 1);
function ayat_set_custom_price($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;
    foreach ($cart->get_cart() as $cart_item) {
        if (isset($cart_item['ayat_custom_price'])) {
            $cart_item['data']->set_price($cart_item['ayat_custom_price']);
        }
    }
}

// ─── 4. Display Custom Metadata in Cart ─────────────────────────────────────────
add_filter('woocommerce_get_item_data', 'ayat_display_cart_meta', 10, 2);
function ayat_display_cart_meta($item_data, $cart_item) {
    if (isset($cart_item['ayat_design_id'])) {
        $item_data[] = ['key' => 'Design ID', 'value' => $cart_item['ayat_design_id']];
        $item_data[] = ['key' => 'Material', 'value' => ucfirst(str_replace('_', ' ', $cart_item['ayat_material']))];
        $item_data[] = ['key' => 'Frame', 'value' => ucfirst(str_replace('_', ' ', $cart_item['ayat_frame']))];
        $item_data[] = ['key' => 'Size', 'value' => $cart_item['ayat_size']];
        $item_data[] = ['key' => 'Language', 'value' => strtoupper($cart_item['ayat_language'])];
    }
    return $item_data;
}

// ─── 5. Show Preview Image in Cart ──────────────────────────────────────────────
add_filter('woocommerce_cart_item_thumbnail', 'ayat_custom_cart_thumbnail', 10, 3);
function ayat_custom_cart_thumbnail($thumbnail, $cart_item, $cart_item_key) {
    if (isset($cart_item['ayat_preview_image']) && !empty($cart_item['ayat_preview_image'])) {
        return '<img src="' . esc_url($cart_item['ayat_preview_image']) . '" alt="Custom Artwork Preview" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" />';
    }
    return $thumbnail;
}

// ─── 6. Save Design Metadata to Order ───────────────────────────────────────────
add_action('woocommerce_checkout_create_order_line_item', 'ayat_save_order_meta', 10, 4);
function ayat_save_order_meta($item, $cart_item_key, $values, $order) {
    if (isset($values['ayat_design_id'])) {
        $item->add_meta_data('Design ID', $values['ayat_design_id']);
        $item->add_meta_data('Artwork ID', $values['ayat_artwork_id']);
        $item->add_meta_data('Material', $values['ayat_material']);
        $item->add_meta_data('Frame', $values['ayat_frame']);
        $item->add_meta_data('Size', $values['ayat_size']);
    }
}

// ─── 7. Create Print Job on Order Completion ────────────────────────────────────
add_action('woocommerce_order_status_processing', 'ayat_create_print_job');
add_action('woocommerce_order_status_completed', 'ayat_create_print_job');
function ayat_create_print_job($order_id) {
    $order = wc_get_order($order_id);
    if (!$order) return;

    foreach ($order->get_items() as $item) {
        $design_id = $item->get_meta('Design ID');
        if (!$design_id) continue;

        $api_url = AYAT_API_URL . '/api/print-jobs';
        $body = json_encode([
            'designId' => $design_id,
            'orderId'  => 'wc_' . $order_id,
        ]);

        wp_remote_post($api_url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body'    => $body,
            'timeout' => 10,
        ]);
    }
}

// ─── 8. Flush Rewrite Rules on Activation ───────────────────────────────────────
register_activation_hook(__FILE__, 'ayat_flush_rewrites');
function ayat_flush_rewrites() {
    ayat_register_return_endpoint();
    flush_rewrite_rules();
}
