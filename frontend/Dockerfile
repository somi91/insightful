FROM node:18

# Create app directory
WORKDIR /app/frontend

COPY *.json ./

# Install app dependencies
RUN npm install

EXPOSE 4200

# Dev env
CMD [ "npm", "start", "--", "--host=0.0.0.0"]
#####
