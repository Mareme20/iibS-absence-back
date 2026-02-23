# Dockerfile
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Compiler le TypeScript
RUN npm run build

# Exposer le port
EXPOSE 5000

# Commande pour démarrer l'app
CMD ["node", "dist/app.js"]
