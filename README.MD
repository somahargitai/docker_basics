# Node.js Express API with MongoDB Docker Setup

This project demonstrates a dockerized Node.js Express API that connects to a MongoDB database, also running in a container. You can use this to understand how to use Docker and Docker Compose for applications.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```sh
docker-basics/
├── Dockerfile
├── docker-compose.yml
├── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.MD
```

## Docker basics

A `docker image` is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files. You can make your own image from any application. Images are built on the top of existing images. For example, in this project, we have used the `node:16` and `mongo:4` images from Docker Hub which already contain the operating system, runtime, libraries, and other dependencies needed to run the application.

A `docker container` is a runtime instance of a Docker image. It runs a specific application or process inside the image.

`Docker Hub` is a cloud-based registry service that allows you to link to code repositories, build your images, test them, store manually pushed images, and link to Docker Cloud so you can deploy images to your hosts.

`docker-compose.yml` is a YAML file used by Docker Compose to define and manage multi-container Docker applications. It specifies the services, networks, and volumes required for the application. For example, in this project, we have defined two services: `app` and `mongo`. The `app` service runs the Node.js application, and the `mongo` service runs the MongoDB database.

A `Dockerfile` is a script that contains a series of instructions on how to build a Docker image. Each instruction in the Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only the layers that have changed are rebuilt. This make the build process faster.

### Most important Docker commands

- `docker ps`: List all running containers
- `docker ps -a`: List all containers (running and stopped)
- `docker images`: List all images
- `docker build -t image-name .`: Build a Docker image from the current directory
- `docker run -d --name app image-name`: Run a Docker container in the background
- `docker exec -it app bash`: Run a command in a running container
- `docker stop app`: Stop a running container
- `docker rm app`: Remove a stopped container
- `docker rmi image-name`: Remove an image
- `docker logs app`: View the logs of a container

## Setup Instructions

### Step 1: Clone the Repository

```sh
git clone git@github.com:somahargitai/docker_basics.git
cd docker_basics
```

### Step 2: Build Docker Image

Build the Docker image using Docker Compose:

```sh
docker-compose build
```

### Step 3: Run Docker Containers

Start the containers:

```sh
docker-compose up
```

This command will start both the Node.js application and the MongoDB database.

### Step 4: Test the API Endpoints

You can test the API using curl commands from the terminal.

Test the Root Endpoint:

```sh
curl http://localhost:3000/
```

Expected response:

```sh
Welcome to the Express API!
```

Create a New Item:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "Item1"}' http://localhost:3000/item
```

Create Another New Item:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "Item2"}' http://localhost:3000/item
```

Fetch All Items:

```sh
curl http://localhost:3000/items
```

Stopping the Containers
To stop the running containers, press CTRL+C in the terminal where docker-compose up is running. Alternatively, you can run:

```sh
docker-compose down
```

## Running Containers Independently

In this example project we are using Docker Compose to manage the containers. However, you can also run the containers independently using the docker run command. It may be useful if you run an application on your local machine without docker, but you would like to run a temporary database in a container.

### Step 1: Build the Docker Images

Build the MongoDB Image

MongoDB uses an official image, so there's no need to build it manually. Pull the image from Docker Hub:

```sh
docker pull mongo:latest
```

Build the Node.js image using the Dockerfile:

```sh
docker build -t app .
```

### Step 2: Run the Containers

Run the MongoDB Container

```sh
docker run -d --name mongodb -p 27017:27017 -v mongo-data:/data/db mongo:latest
```

Start the Node.js application container and link it to the MongoDB container:

```sh
docker run -d --name node-app --link mongodb:mongo -p 3000:3000 node-app
```
