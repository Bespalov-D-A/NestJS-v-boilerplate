FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update apk add --no-cache postgresql postgresql-client
WORKDIR /server
COPY package*.json ./
EXPOSE 5000
ENV NODE_ENV development
COPY . .
CMD ["npm", "run", "start:dev"]
