FROM node:18
WORKDIR /app
COPY package.json .

#at build time npm install
# RUN npm install    
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
# we did it so that  devDependencies will not be installed in production mode

#we split the copy into two parts for optimization that when only source code is change , then we don't need to again run step 3 where package.json is again copied and then installed
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node","index.js"]