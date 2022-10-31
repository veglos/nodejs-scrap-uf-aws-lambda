FROM public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package*.json ./ src/*.ts ./
RUN npm install
RUN npm run build


FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
COPY --from=builder /usr/app/node_modules ./
CMD ["app.handler"]