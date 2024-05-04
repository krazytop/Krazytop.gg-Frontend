# Utilisez une image de base contenant Node.js
FROM node:20.6.1

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copiez les fichiers de votre projet Angular dans le conteneur
COPY . .

# Installez les dépendances du projet
RUN npm install

# Compilez votre application Angular pour la production
RUN npm run build

# Exposez le port sur lequel votre application Angular écoute
EXPOSE 4200

# Commande pour exécuter votre application Angular
CMD ["npm", "start"]
