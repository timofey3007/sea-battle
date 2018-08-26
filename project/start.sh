#!/bin/sh

function npm_package_is_installed {
  # set to 1 initially
  local is_installed=1
  # set to 0 if not found
  npm ls --global --depth=1 | grep "$1@" >/dev/null 2>&1 || { local is_installed=0; }
  # return value
  return $is_installed
}

if npm_package_is_installed pm2; then
    npm install pm2 -g
fi

npm install

npm start