#!/bin/bash
set -e

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL..."
while ! mysqladmin ping -h"$WORDPRESS_DB_HOST" --silent 2>/dev/null; do
    sleep 2
done
echo "✅ MySQL is ready."

# Run the default WordPress entrypoint in the background to set up wp-config.php
docker-entrypoint.sh apache2-foreground &
WP_PID=$!

# Wait for WordPress files to be available
echo "⏳ Waiting for WordPress to initialize..."
sleep 15

# Download WP-CLI
if [ ! -f /usr/local/bin/wp ]; then
    echo "📥 Installing WP-CLI..."
    curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    mv wp-cli.phar /usr/local/bin/wp
fi

# Wait for wp-config.php to be created by the official entrypoint
while [ ! -f /var/www/html/wp-config.php ]; do
    echo "⏳ Waiting for wp-config.php..."
    sleep 3
done

# Check if WordPress is already installed
if wp core is-installed --path=/var/www/html --allow-root 2>/dev/null; then
    echo "✅ WordPress is already installed. Skipping setup."
else
    echo "🔧 Installing WordPress..."
    wp core install \
        --url="http://localhost:8080" \
        --title="AyatPrint — Luxury Islamic Art" \
        --admin_user=admin \
        --admin_password=admin123 \
        --admin_email=admin@ayatprint.com \
        --path=/var/www/html \
        --allow-root \
        --skip-email

    echo "🛒 Installing WooCommerce..."
    wp plugin install woocommerce --activate --path=/var/www/html --allow-root

    echo "🎨 Installing Storefront theme..."
    wp theme install storefront --activate --path=/var/www/html --allow-root

    echo "🔌 Activating Ayat Studio Connector..."
    wp plugin activate ayat-studio-connector --path=/var/www/html --allow-root

    echo "🛍️ Setting up WooCommerce pages..."
    wp option update woocommerce_shop_page_id "$(wp post list --post_type=page --name=shop --field=ID --path=/var/www/html --allow-root 2>/dev/null || echo 0)" --path=/var/www/html --allow-root 2>/dev/null || true

    # Create WooCommerce pages if they don't exist
    wp wc tool run install_pages --user=1 --path=/var/www/html --allow-root 2>/dev/null || true

    echo "📦 Creating sample products..."
    
    # Create "Surah Al-Ikhlas — Premium Canvas"
    wp wc product create \
        --name="Surah Al-Ikhlas — Premium Canvas" \
        --type=simple \
        --regular_price="149.00" \
        --description="A stunning museum-quality canvas featuring Surah Al-Ikhlas in elegant Thuluth calligraphy. Available in Premium Canvas, Fine Art Paper, and Acrylic. Customize in Ayat Studio to select your frame, size, and color palette." \
        --short_description="Sacred Quranic calligraphy. Customize in Ayat Studio." \
        --categories='[{"name":"Islamic Calligraphy"}]' \
        --status=publish \
        --user=1 \
        --path=/var/www/html \
        --allow-root 2>/dev/null || true

    # Create "Ayat Al-Kursi — Floating Frame"
    wp wc product create \
        --name="Ayat Al-Kursi — Floating Frame" \
        --type=simple \
        --regular_price="249.00" \
        --description="The Throne Verse rendered in gold-leaf inspired digital calligraphy on premium museum canvas, presented in a handcrafted walnut floating frame." \
        --short_description="The Throne Verse. Premium floating frame." \
        --categories='[{"name":"Islamic Calligraphy"}]' \
        --status=publish \
        --user=1 \
        --path=/var/www/html \
        --allow-root 2>/dev/null || true

    # Create "Bismillah — Modern Kufic"
    wp wc product create \
        --name="Bismillah — Modern Kufic" \
        --type=simple \
        --regular_price="99.00" \
        --description="A contemporary interpretation of Bismillah in geometric Kufic script. Perfect for modern interiors." \
        --short_description="Contemporary Kufic calligraphy." \
        --categories='[{"name":"Islamic Calligraphy"}]' \
        --status=publish \
        --user=1 \
        --path=/var/www/html \
        --allow-root 2>/dev/null || true

    # Set permalinks for clean URLs (needed for ayat-return endpoint)
    wp rewrite structure '/%postname%/' --path=/var/www/html --allow-root
    wp rewrite flush --path=/var/www/html --allow-root

    echo "✅ WordPress + WooCommerce setup complete!"
    echo "   Shop: http://localhost:8080/shop"
    echo "   Admin: http://localhost:8080/wp-admin (admin / admin123)"
fi

# Keep Apache running in the foreground
wait $WP_PID
