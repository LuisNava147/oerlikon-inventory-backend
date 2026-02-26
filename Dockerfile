# Usamos Node 18
FROM node:18-alpine

# Creamos la carpeta de la app
WORKDIR /app

# Copiamos solo los package.json primero (para optimizar caché)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto de tu código backend
COPY . .

# Construimos la aplicación de NestJS
RUN npm run build

# Exponemos el puerto 
EXPOSE 3000

# Comando para iniciar en producción
CMD ["npm", "run", "start:prod"]