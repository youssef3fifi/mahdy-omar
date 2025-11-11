# AWS EC2 Deployment Guide

This guide will walk you through deploying the Doctor Management System on AWS EC2.

## Prerequisites

- AWS Account
- Basic knowledge of SSH and Linux commands
- EC2 instance running Ubuntu 20.04 or later

## Step 1: Launch EC2 Instance

1. Log in to AWS Console
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Choose **Ubuntu Server 20.04 LTS (HVM), SSD Volume Type**
5. Select instance type: **t2.micro** (free tier eligible) or **t2.small** for better performance
6. Configure security group with the following inbound rules:
   - SSH (port 22) - Your IP only
   - HTTP (port 80) - Anywhere (0.0.0.0/0)
   - Custom TCP (port 3000) - Anywhere (0.0.0.0/0)
7. Create or select an existing key pair
8. Launch instance

## Step 2: Connect to EC2 Instance

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system packages
sudo apt update && sudo apt upgrade -y
```

## Step 3: Install Node.js and npm

```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 4: Install Git

```bash
sudo apt install git -y
```

## Step 5: Clone Repository

```bash
# Clone the repository
git clone https://github.com/youssef3fifi/mahdy-omar.git
cd mahdy-omar

# Install dependencies
npm install
```

## Step 6: Configure Environment

```bash
# Create .env file
cp .env.example .env

# Edit .env file if needed
nano .env
```

Default configuration:
```
PORT=3000
NODE_ENV=production
HOST=0.0.0.0
```

## Step 7: Test the Application

```bash
# Start the server
npm start
```

Open a browser and navigate to:
- `http://your-ec2-public-ip:3000`

You should see the Doctor Management System dashboard.

## Step 8: Setup as System Service (Optional but Recommended)

For production, it's better to run the application as a system service:

### Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Start the application with PM2
cd /home/ubuntu/mahdy-omar
pm2 start backend/server.js --name doctor-management-system

# Set PM2 to start on system boot
pm2 startup systemd
pm2 save
```

### Useful PM2 Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs doctor-management-system

# Restart application
pm2 restart doctor-management-system

# Stop application
pm2 stop doctor-management-system

# Remove from PM2
pm2 delete doctor-management-system
```

## Step 9: Setup Nginx as Reverse Proxy (Optional)

To serve the application on port 80 (standard HTTP):

### Install Nginx

```bash
sudo apt install nginx -y
```

### Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/doctor-management
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/doctor-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Now you can access the application at:
- `http://your-ec2-public-ip` (without specifying port 3000)

## Step 10: Setup Firewall (Optional)

```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Updating the Application

When you need to update the application:

```bash
cd /home/ubuntu/mahdy-omar
git pull origin main
npm install
pm2 restart doctor-management-system
```

## Troubleshooting

### Application not accessible

1. Check if the server is running:
   ```bash
   pm2 status
   ```

2. Check security group rules in AWS Console
   - Ensure port 3000 (or 80) is open

3. Check firewall:
   ```bash
   sudo ufw status
   ```

4. View application logs:
   ```bash
   pm2 logs doctor-management-system
   ```

### Port already in use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

## Security Considerations

For production deployment, consider:

1. **Use HTTPS**: Set up SSL certificate using Let's Encrypt
2. **Restrict CORS**: Update CORS settings in `backend/server.js` to only allow your domain
3. **Environment Variables**: Store sensitive data in environment variables
4. **Database**: Consider using a real database instead of in-memory storage
5. **Authentication**: Implement user authentication and authorization
6. **Regular Updates**: Keep system and dependencies updated
7. **Backups**: If using a database, set up regular backups
8. **Monitoring**: Set up monitoring and alerting

## Additional Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## Support

For issues or questions, please open an issue on GitHub.
