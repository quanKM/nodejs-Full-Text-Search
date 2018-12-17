# nodejs-example

## Requirements

-   Node 8
-   Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/quanKM/nodejs-example.git
cd nodejs-example
cp .env.example .env
```

```bash
npm install
or
yarn install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm start or yarn start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Use Docker

You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/quanKM/nodejs-example.git
```

Step 2: Build the Docker image

```bash
docker build -t nodejs-example .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d nodejs-example
```
