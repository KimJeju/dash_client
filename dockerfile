FROM node:16.16.0

RUN mkdir /code/
WORKDIR /code/

COPY . /code/

RUN npm install typescript@latest
RUN npm install 
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]