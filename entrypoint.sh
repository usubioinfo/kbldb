#!/bin/bash

# Start MongoDB in the background
mongod --logpath /var/log/mongodb.log --dbpath /data/db &

# Start the Node.js application with PM2
pm2 start npm --name=kbldb -- run start

# Keep the container running by tailing MongoDB logs
tail -f /var/log/mongodb.log
