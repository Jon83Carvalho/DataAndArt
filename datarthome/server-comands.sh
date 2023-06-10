#add bin to PATH
export PATH=$PATH:/bin/

#serve wit nginx for HTTP
sudo systemctl start nginx

#directing IPs
chmod iptables
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 19006
sudo iptables -D PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports 8080
sudo iptables -t nat -nvL^C


. ~/.nvm/nvm.sh 
nvm use 16.0.0
expo install
nohup npx serve web-build -l 8080 &