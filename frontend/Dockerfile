# Usamos Node 18
FROM node:18-alpine

WORKDIR /app

# Copiamos los package.json del frontend
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código de React/Next
COPY . .

# Construimos la aplicación
RUN npm run build

EXPOSE 3000

# Comando para iniciar Next.js
CMD ["npm", "run", "start"]