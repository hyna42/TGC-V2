#!/bin/sh

# Initialiser les fichiers dans /app/uploads si c'est vide


# Démarrer le service cron en arrière-plan
crond -b

# Démarrer l'application principale (serveur)
npm run start
