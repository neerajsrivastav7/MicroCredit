FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}
RUN npm run build
FROM node:18-alpine
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 5173
CMD ["serve", "-s", "/app/dist", "-l", "5173"]

