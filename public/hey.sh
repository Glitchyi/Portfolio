#!/bin/bash

echo "hello"
echo -n "Loading the necessary scripts"
sleep 1
echo -n "."
sleep 1
echo -n "."
sleep 1
echo "."
sleep 3
echo "wait.."
sleep 2
echo "Something's not right !"
sleep 2
cat << "EOF"
_    _  ____  _      _____    ______ _____ _____  ______   _ _ _ 
| |  | |/ __ \| |    |  __ \  |  ____|_   _|  __ \|  ____| | | | |
| |__| | |  | | |    | |  | | | |__    | | | |__) | |__    | | | |
|  __  | |  | | |    | |  | | |  __|   | | |  _  /|  __|   | | | |
| |  | | |__| | |____| |__| | | |     _| |_| | \ \| |____  |_|_|_|
|_|  |_|\____/|______|_____/  |_|    |_____|_|  \_\______| (_|_|_)
EOF
sleep 2

# The 'xdg-open' command is used here, which should work on most Linux distributions.
# If it's not available, you can replace it with the appropriate command to open URLs.
open "https://glitchy.systems/ghost-astley-tokyo-music-video-smol.mp4"
