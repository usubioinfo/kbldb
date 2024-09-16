FROM ubuntu:20.04

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
    cron  # Install cron

# Install MongoDB (community version) 
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \ 
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \ 
apt update && \ 
apt install -y mongodb-org 
# Create necessary directories for MongoDB 
RUN mkdir -p /data/db 
# Copy init script to initialize database and collections 
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB default port 
EXPOSE 27017

# Install Node.js (using the NodeSource repository for the desired version, here Node 16.x) 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
apt install -y nodejs


#start mongodb

CMD mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db



# Install PM2 globally

RUN npm install -g pm2

COPY . /kbldb

WORKDIR /kbldb

RUN npm install

# command: pm2 start npm --name=kbldb -- run start
CMD ["bash", "-c", "cd /kbldb && pm2 start npm --name=kbldb -- run start"]


