#! /bin/bash
set -e
if [$ENV = 'DEV']; then
  echo "Running development server"
  exec npm run start
else
  echo "Running production server"
  exec npm run serve
fi