FROM node:lts-alpine

WORKDIR /app

# Copie des fichiers de configuration et de dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copie des fichiers de l'application
COPY public public
COPY src src

COPY codegen.ts codegen.ts

COPY index.html index.html

COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json

COPY vite.config.ts vite.config.ts

# Commande à exécuter pour démarrer le frontend
CMD ["npm", "run", "start"]
