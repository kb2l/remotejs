sudo chmod 755 /etc/init.d/myservice 
sudo chown root:root /etc/init.d/myservice 
sudo update-rc.d myservice defaults
sudo update-rc.d myservice enable
