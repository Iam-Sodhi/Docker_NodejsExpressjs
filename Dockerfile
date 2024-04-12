FROM node:18
WORKDIR /app
COPY package.json .
#at build time npm install
RUN npm install    
#we split the copy into two parts for optimization that when only source code is change , then we don't need to again run step 3 where package.json is again copied and then installed
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["npm","run","dev"]