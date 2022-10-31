# nodejs-scrap-uf-aws-lambda
Lambda service to scrap the Unidad de Fomento (UF) from the website of the Central Bank of Chile

# Install
```bash
> npm install
```

# Run
```bash
# run the docker container
> docker-compose up
# call que lambda function
> curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

