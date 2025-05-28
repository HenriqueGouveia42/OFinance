# Etapa 1 - Build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2 - Servidor estático com Nginx
FROM nginx:stable-alpine

# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build para a pasta pública do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia um nginx.conf customizado se desejar (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
