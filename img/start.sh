#!/bin/sh

# Démarrer le service cron en arrière-plan
crond -b

# Démarrer l'application principale (serveur)
npm run start