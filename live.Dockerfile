FROM node
WORKDIR /cheminot
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
CMD npm run start
