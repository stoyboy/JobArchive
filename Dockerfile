FROM node:lts as dependencies
WORKDIR /JobArchive
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /JobArchive
COPY . .
COPY --from=dependencies /JobArchive/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /JobArchive
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /JobArchive/next.config.js ./
COPY --from=builder /JobArchive/public ./public
COPY --from=builder /JobArchive/.next ./.next
COPY --from=builder /JobArchive/node_modules ./node_modules
COPY --from=builder /JobArchive/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]