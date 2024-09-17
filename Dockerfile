FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Update and install dependencies
RUN apt-get update && \
    apt-get install -y \
    wget \
    curl \
    build-essential \
    python3-pip \
    python3-dev \
    git \
    cron \
    gnupg

# Install MongoDB 7.0 (using the new GPG key management method)
RUN apt-get install -y gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org

# Create necessary directories for MongoDB
RUN mkdir -p /data/db

# Copy init script to initialize database and collections
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB default port
EXPOSE 27017

# Install Node.js (using the NodeSource repository for Node 16.x)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install PM2 globally
RUN npm install -g pm2

# Copy application code
COPY . /kbldb

# Set the working directory
WORKDIR /kbldb

# Install project dependencies
RUN npm install

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script to start MongoDB and the Node.js app
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
