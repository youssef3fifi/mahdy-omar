#!/bin/bash

# EC2 Setup Script for Doctor Management System
# Run this script on a fresh Ubuntu EC2 instance

set -e

echo "================================================"
echo "Doctor Management System - EC2 Setup Script"
echo "================================================"

# Update system packages
echo "Step 1: Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js
echo "Step 2: Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install Git
echo "Step 3: Installing Git..."
sudo apt install git -y

# Install PM2 globally
echo "Step 4: Installing PM2 process manager..."
sudo npm install -g pm2

# Create application directory
echo "Step 5: Setting up application directory..."
cd /home/ubuntu

# Check if repository already exists
if [ -d "mahdy-omar" ]; then
    echo "Repository already exists. Pulling latest changes..."
    cd mahdy-omar
    git pull
else
    echo "Cloning repository..."
    git clone https://github.com/youssef3fifi/mahdy-omar.git
    cd mahdy-omar
fi

# Install dependencies
echo "Step 6: Installing application dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Step 7: Creating .env file..."
    cp .env.example .env
fi

# Start application with PM2
echo "Step 8: Starting application with PM2..."
pm2 delete doctor-management-system 2>/dev/null || true
pm2 start backend/server.js --name doctor-management-system

# Configure PM2 to start on system boot
echo "Step 9: Configuring PM2 startup..."
pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save

# Display PM2 status
pm2 status

echo ""
echo "================================================"
echo "Setup Complete!"
echo "================================================"
echo ""
echo "Your Doctor Management System is now running!"
echo ""
echo "Access the application at:"
echo "  http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo ""
echo "Useful commands:"
echo "  pm2 status                          - Check application status"
echo "  pm2 logs doctor-management-system   - View application logs"
echo "  pm2 restart doctor-management-system - Restart application"
echo "  pm2 stop doctor-management-system   - Stop application"
echo ""
echo "================================================"
