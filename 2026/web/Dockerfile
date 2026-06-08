# Estágio 1: Build da SPA
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# Estágio 2: Nginx para servir arquivos estáticos
FROM nginx:alpine

# Copia a configuração customizada do Nginx que suporta rotas SPA (evita erros 404 no refresh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build final compilado do Angular para o diretório padrão do Nginx
COPY --from=build /app/dist/tecloja/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
