# Base image avec Node.js et TypeScript
FROM mcr.microsoft.com/devcontainers/typescript-node:latest

# Définir le répertoire de travail
WORKDIR /workspace

# Copier le package.json et le package-lock.json (si présent)
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Compiler le TypeScript au moment du build
RUN npx tsc

# Exposer le port de l'application (à adapter si besoin)
EXPOSE 3000

# Lancer une recompilation avant le démarrage (au cas où il y a des changements)
CMD ["sh", "-c", "npx tsc && node src/index.js"]
