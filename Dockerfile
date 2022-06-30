FROM node:16

WORKDIR /usr/src/app

COPY . ./

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN npm cache clean --force
RUN npm install --update-binary --no-shrinkwrap

RUN npm run build

CMD [ "npm", "run", "start" ]
