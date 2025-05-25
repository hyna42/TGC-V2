#!/bin/sh

# Initialiser les fichiers dans /app/uploads si c'est vide
if [ -z "$(ls -A /app/uploads)" ]; then
  echo "📦 Initialisation des fichiers d'uploads..."
  cp -r /app/uploads_seed/* /app/uploads/
fi

# Démarrer le service cron en arrière-plan
crond -b

# Démarrer l'application principale (serveur)
npm run start
