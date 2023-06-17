# --------------- builder stage: build project ---------------------------------
FROM node:18-alpine3.16 as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/schema.prisma ./schema.prisma

RUN npm install
RUN npx prisma generate

COPY . ./

RUN npm run build

# --------------- production stage: copy only needed files to image ------------
FROM node:18-alpine3.16 as production

WORKDIR /usr/src/app

COPY --from=build --chown=node /usr/src/app/package*.json /usr/src/app/
COPY --from=build --chown=node /usr/src/app/dist ./dist
COPY --from=build --chown=node /usr/src/app/prisma/migrations /usr/src/app/prisma/migrations
COPY --from=build --chown=node /usr/src/app/prisma/schema.prisma /usr/src/app/prisma/schema.prisma
COPY --from=build --chown=node /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3003

CMD ["node", "dist/main.js"]