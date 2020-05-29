FROM node:12
WORKDIR	~/apps/bioinformatics
COPY package*.json ./

RUN npm	install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "prod"]
