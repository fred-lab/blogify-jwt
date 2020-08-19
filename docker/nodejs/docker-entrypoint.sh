#!/bin/sh

# Functions

# Display a text with colors
display(){
  text="$1"

  case "$2" in
   "Green") echo -e '\033[0;32m' "###### $text  ######" '\033[0m'
   ;;
   "Blue") echo -e '\033[0;34m' "** $text  **" '\033[0m'
   ;;
   "Red") echo -e '\033[0;31m' "!! $text  !!" '\033[0m'
   ;;
   "Brown") echo -e '\033[0;33m' "- $text" '\033[0m'
   ;;
   "Purple") echo -e '\033[0;35m' "- $text" '\033[0m'
   ;;
esac  
}

# Script
workdir=$(pwd)
container_user=$(id -u)
container_usergroup=$(id -g)
# For debbuging
display "Check User ID & Group ID" "Blue"
display "Host user id : $container_user" "Purple"
display "Host usergroup id : $container_usergroup" "Purple"
 
ls -la

display "Checking if Package.json is present for the NodeJS server ..." "Blue"
if [ -f "./server/package.json" ]; then
  display "Package.json is present" "Purple"

  display "Checking if dependencies are installed ..." "Blue"
  if [ -d "./server/node_modules" ]; then
    display "Dependencies are installed in ./server/node_modules" "Purple"
  else
    display "Dependencies are not installed in ./server/node_modules. Running 'npm install --prefix server' ..." "Purple"
    npm install --prefix server
  fi
else
  display "Package.json is not present in the server directory ! Please provide at least a Package.json with 'npm init -y'" "Red"
fi

display "Checking if Package.json is present for the application ..." "Blue"
if [ -f "./package.json" ]; then
  display "Package.json is present" "Purple"

  display "Checking if dependencies are installed ..." "Blue"
  if [ -d "./node_modules" ]; then
    display "Dependencies are installed in ./node_modules" "Purple"
  else
    display "Dependencies are not installed in ./node_modules. Running 'npm install' ..." "Purple"
    npm install
  fi
else
  display "Package.json is not present for the application ! Please provide at least a Package.json with 'npm init -y'" "Red"
fi

display "Container is ready !" "Green"

display "Starting the NodeJS server ... " "Green"

printenv

exec "$@"