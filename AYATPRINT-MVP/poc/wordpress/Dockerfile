FROM wordpress:latest

# Install dependencies for wp-cli
RUN apt-get update && apt-get install -y \
    less \
    default-mysql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy custom plugin
COPY plugins/ayat-studio-connector /var/www/html/wp-content/plugins/ayat-studio-connector

# Copy entrypoint
COPY entrypoint.sh /usr/local/bin/ayat-entrypoint.sh
RUN chmod +x /usr/local/bin/ayat-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["ayat-entrypoint.sh"]
