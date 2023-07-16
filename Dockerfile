FROM node
WORKDIR /cheminot
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /cheminot/public /usr/share/nginx/html
