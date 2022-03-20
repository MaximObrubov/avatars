#!/bin/bash
set -e

if [ "$ENV" = 'DEV' ]; then
  echo "Running development server"
  npm run start:dev
else
  echo "Running production server"
  npm run serve
fi