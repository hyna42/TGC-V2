FROM node:lts-alpine

RUN apk --no-cache add curl make g++ sqlite-dev python3 py3-pip

WORKDIR /app

# Copie des fichiers nécessaires
# COPY package.json package.json
COPY package.json package-lock.json ./
RUN npm install

COPY src src

COPY good_corner.sqlite good_corner.sqlite

COPY tsconfig.json tsconfig.json

# Commande à exécuter pour démarrer le backend
CMD ["npm", "start"]

