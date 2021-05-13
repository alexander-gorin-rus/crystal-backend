FROM node:15.10.0-alpine
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./
ENV PORT 5000
EXPOSE $PORT
#CMD ["npm", "run", "dev"]
CMD [ "node", "server.js" ]