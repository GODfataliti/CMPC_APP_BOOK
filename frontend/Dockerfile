# -- [STAGE - 1] -- Dependencias.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./

ARG VITE_VERSION
ENV VITE_VERSION=$VITE_VERSION

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install

# -- [STAGE - 2] -- Construcción.
COPY . .

RUN npm run build

# -- [STAGE - 3] -- Generación de la imagen.
FROM nginx:alpine AS run

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]