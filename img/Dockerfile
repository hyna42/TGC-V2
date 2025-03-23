FROM node:lts-alpine
# Ajoute curl et cron

RUN apk --no-cache add curl dcron

WORKDIR /app

RUN mkdir uploads

# Copie des fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

# Copie des fichiers du projet
COPY src src
COPY uploads uploads
COPY tsconfig.json tsconfig.json
COPY clean.ts clean.ts

# Copie des fichiers pour le cron
COPY crontab /etc/crontabs/root  
COPY start.sh /app/start.sh

# Rendre le script exécutable
RUN chmod +x /app/start.sh


# Commande à exécuter pour démarrer le backend
# CMD ["npm","run","start","clean"]

# Commande de démarrage
CMD ["/app/start.sh"]