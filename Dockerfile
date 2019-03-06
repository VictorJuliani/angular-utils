FROM rastasheep/alpine-node-chromium
WORKDIR /opt

COPY package.json ./
RUN yarn install

COPY tslint.json ./
COPY Jenkinsfile ./
COPY webpack.config.js ./
COPY tsconfig.json ./
COPY src/ ./src

COPY testing/ ./testing/
COPY tests/ ./tests/