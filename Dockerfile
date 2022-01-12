FROM node:fermium

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN yarn install

CMD ["/bin/bash"]