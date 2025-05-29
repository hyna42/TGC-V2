FROM node:lts-alpine

RUN apk --no-cache add curl dcron

WORKDIR /app

# Copier package et installer dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers du projet
COPY src src
COPY tsconfig.json tsconfig.json
COPY clean.ts clean.ts
COPY crontab /etc/crontabs/root
COPY start.sh /app/start.sh

# COPY uploads/ /app/uploads

# Rendre le script exécutable
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
