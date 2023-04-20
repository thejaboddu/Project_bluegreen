FROM node:16-alpine as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN yarn
COPY . /usr/src/app/
#COPY ./.env /usr/src/app/
RUN yarn build


FROM base as release
#COPY --from=base /usr/src/app/.env  /usr/src/app/.env
EXPOSE 3000
CMD ["yarn", "start"]
