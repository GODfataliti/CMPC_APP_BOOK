# -- [STAGE - 1] -- Dependencias.
FROM node:21-alpine3.19 AS deps
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json* ./
COPY . .

RUN npm install

# -- [STAGE - 2] -- Construcción.
FROM node:21-alpine3.19 AS build
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

# -- [STAGE - 3] -- Generación de la imagen.
FROM node:21-alpine3.19 AS show
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]