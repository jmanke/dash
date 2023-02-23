FROM node:18-alpine AS PROD

    ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

    RUN apk add --update curl
    RUN npm install -g pnpm@7.18.2

    # Required for turborepo
    RUN apk add --no-cache libc6-compat

    WORKDIR /app

    # root level
    COPY ./package.json ./heroku.yml ./server.js ./turbo.json pnpm-lock.yaml ./pnpm-workspace.yaml  /app/
    
    # packages/dash-utils
    COPY ./packages/dash-utils/package.json /app/packages/dash-utils/
    COPY ./packages/dash-utils/build.js /app/packages/dash-utils/
    COPY ./packages/dash-utils/tsconfig.json /app/packages/dash-utils/
    COPY ./packages/dash-utils/LICENSE /app/packages/dash-utils/
    COPY ./packages/dash-utils/src /app/packages/dash-utils/src

    # packages/dash-components
    COPY ./packages/dash-components/package.json /app/packages/dash-components/
    COPY ./packages/dash-components/stencil.config.ts /app/packages/dash-components/
    COPY ./packages/dash-components/tsconfig.json /app/packages/dash-components/
    COPY ./packages/dash-components/LICENSE /app/packages/dash-components/
    COPY ./packages/dash-components/src /app/packages/dash-components/src

    # packages/hellodash-models
    COPY ./packages/hellodash-models/package.json /app/packages/hellodash-models/
    COPY ./packages/hellodash-models/build.js /app/packages/hellodash-models/
    COPY ./packages/hellodash-models/tsconfig.json /app/packages/hellodash-models/
    COPY ./packages/hellodash-models/LICENSE /app/packages/hellodash-models/
    COPY ./packages/hellodash-models/src /app/packages/hellodash-models/src

    # packages/hellodash-components
    COPY ./packages/hellodash-components/package.json /app/packages/hellodash-components/
    COPY ./packages/hellodash-components/stencil.config.ts /app/packages/hellodash-components/
    COPY ./packages/hellodash-components/tsconfig.json /app/packages/hellodash-components/
    COPY ./packages/hellodash-components/LICENSE /app/packages/hellodash-components/
    COPY ./packages/hellodash-components/src /app/packages/hellodash-components/src

    # packages/hellodash
    COPY ./packages/hellodash/index.html /app/packages/hellodash/
    COPY ./packages/hellodash/manifest.json /app/packages/hellodash/
    COPY ./packages/hellodash/package.json /app/packages/hellodash/
    COPY ./packages/hellodash/tsconfig.json /app/packages/hellodash/
    COPY ./packages/hellodash/tsconfig.node.json /app/packages/hellodash/
    COPY ./packages/hellodash/vite.config.ts /app/packages/hellodash/
    COPY ./packages/hellodash/src /app/packages/hellodash/src

    RUN pnpm install
    RUN pnpm build

    RUN rm -r node_modules
    RUN rm -r packages/dash-components/node_modules
    RUN rm -r packages/dash-utils/node_modules
    RUN rm -r packages/hellodash/node_modules

    RUN pnpm install --prod

    CMD ["node", "server.js"]