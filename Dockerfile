FROM node:16-slim

# Dependencies
ADD ["./package*.json", "/usr/"]
WORKDIR /usr/
RUN npm install --silent
ENV NODE_PATH=/usr/node_modules

EXPOSE 3001
