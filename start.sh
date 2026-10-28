#!/bin/sh

echo "Rodando as migrations!"
node /app/app/migrations.js || exit 1

echo "Rodando servidor web!"
exec node /app/app/server.js