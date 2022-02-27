FROM node:16
WORKDIR /slavaukraini
COPY package.json /slavaukraini
RUN npm install
COPY . /slavaukraini
CMD node . --workers=50 --silent