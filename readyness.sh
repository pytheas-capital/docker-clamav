#!/bin/sh

set -e

if clamdscan eicar.com | grep -q 'Infected files: 1'; then
    echo "Clamd running successfully"
    exit 0
  else
    echo "Clamd not running"
    exit 1
fi
