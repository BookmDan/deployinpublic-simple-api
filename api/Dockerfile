FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
# CMD npm run migration:run && node dist/main.js

CMD npm run migration:run && npm run start:prod 

# CMD ["node", "dist/main.js"]