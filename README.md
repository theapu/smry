# SMRY

Modified fork of [SMRY](https://github.com/mrmps/SMRY)

## Installation
### Build Docker image and run
1. To build the docker image
```
docker build -t smry:1.1 .
```
2. To run edit docker-compose.yml change `image: theapu/smry:latest` to  image: `smry:l1.1`. Set a random long string as `SRH_TOKEN`. Set same as `KV_REST_API_TOKEN` and `KV_REST_API_READ_ONLY_TOKEN`. Change `NEXT_PUBLIC_URL` to smry service url
3. Run `docker compose up -d`
 
### Run using dockerhub image
1. Edit docker-compose.yml and set a random long string as `SRH_TOKEN`. Set same as `KV_REST_API_TOKEN` and `KV_REST_API_READ_ONLY_TOKEN`. Change `NEXT_PUBLIC_URL` to smry service url
2. Run `docker compose up -d`
