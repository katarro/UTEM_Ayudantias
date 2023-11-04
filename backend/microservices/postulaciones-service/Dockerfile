# Usar la imagen base de Node.js
FROM node:14

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias
# El asterisco es para asegurarse de que tanto package.json como package-lock.json sean copiados
COPY package*.json ./

RUN npm install

# Copiar los archivos del proyecto
COPY . .

# Exponer el puerto que usa el servicio
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD [ "node", "server.js" ]
