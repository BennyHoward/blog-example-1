# Blog Example 1

<hr>

**WARNING**: This is a work in progress.  Once this is complete this warning will be removed.  Thank you for your patience.  

<hr>

This is an example project for educational purposes.

This will show students what an almost production ready blogging platform using a MERN stack will look like.  
Almost production ready because there are a few minor things you shouldn't do that this project does due to it being a development environment.  Like generating self-signed certs, etc.  

And by MERN stack I specifically mean:

- [MongoDB](https://docs.mongodb.com/) (as Docker containers)
- [ExpressJS](https://expressjs.com/) (as the [NestJS](https://docs.nestjs.com/) Framework)
- [React.js](https://reactjs.org/) (this will also use Material Design as part of the frontend techstack)
- [Node.js](https://nodejs.org/en/docs/)

Also other technologies will be used as well such as Docker.  

## Author(s)

- [Benny Howard](mailto:bennyhoward.opensource@gmail.com)

## License

This is intended for education purposes only, but if you with to extend this into a viable commercial product I encourage you in your commercial endeavors.  
Therefore, this code is under the permissive [MIT](https://opensource.org/licenses/MIT) license.  

However, attribution will be appreciated.  

*Refer to [here](./LICENSE) for the license.*

## Development Environment Setup

This repo requires a certain tools to enable it to run properly.  

Those requirements are the following (Mac only at the moment):  

- [Git](https://git-scm.com/) (via [Xcode Select](https://developer.apple.com/library/archive/technotes/tn2339/_index.html#//apple_ref/doc/uid/DTS40014588-CH1-WHAT_IS_THE_COMMAND_LINE_TOOLS_PACKAGE_))
- [Homebrew](https://brew.sh/)
- [ASDF VM](https://asdf-vm.com/#/plugins-all?id=plugin-list) (via Homebrew)
- [Node.js](https://nodejs.org/)  
- [Python2](https://docs.python.org/2.7/)  
  Because `node-gyp` uses Python2 to compile native binary extensions for some dependencies.  
  Yes Python2 is deprecated, but it's still used for some reason.  
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Docker](https://hub.docker.com/) (and Docker Compose) and [VirtualBox](https://www.virtualbox.org/)  
  Notice how [MongoDB](https://www.mongodb.com/) isn't listed here.  
  That is because we'll be running this in Docker container.  In fact, the deliverables will be two Docker containers, one running MongoDB and the other running the actual demo application.  Since the Docker engine cannot run directly on macOS, it must be run through a virtualized Linux machine.  Therefore, VirtualBox is needed to run the Linux instance that Docker will run on.  

*Refer to the development environment setup instructions [here](./DEV_ENV_SETUP.md).*  

## Bootstrapping the Project

The following in this sections are steps needed to bootstrap this project.  
Assuming that you have your machine setup properly (refer to the development environment setup instructions [here](./DEV_ENV_SETUP.md)), you'll only need to run these steps once in order to get the project to run.  
But if you perform a fresh clone or if you run `git clean -xdf`, you'll need to run these steps again.  

### Install the Node.js dependencies

```sh
npm install
```

### Generate the SSL certificates

```sh
npm run generate:ssl-certs
```

**NOTE**: These SSL certificates are only for development purposes only.  DO NOT use these in production.  

### Generate the database fixtures

```sh
npm run generate:fixtures
```

**NOTE**: This will generate `.json` files in the `./fixtures` folder.  On initial boot of the MongoDB Docker container (if the database is empty) it will add those fixtures to the database.  

## Usage

### Environment Variables

This project is divided into two parts, the Application service and the MongoDB service.  

Though the MongoDB service can be configured via environment variables, for our purposes these will be hard-coded to provide a consistent configuration.  

However the Application service can be configured and will take the following environment variables:  

- `APP_PORT`  
  Sets the port for the application.  
  Defaults to `3000` if not specified.  
- `APP_MONGODB_HOST`  
  Sets the host for the MongoDB service.  
  Allows the Application service to find the MongoDB service in order to connect.  
  Defaults to the Docker machine's IP, will acquire it by attempting to running `docker-machine ip vbox-blogexample1`.  The Application Docker container will provide the MongoDB host via the hostname of the MongoDB machine (`mongodb1.blogexample1.local`) via the Docker network, so it won't attempt to run the Docker Machine command.  
- `APP_MONGODB_USERNAME`  
  Sets the username which will be used to log into MongoDB.  Defaults to `root`.  
- `APP_MONGODB_PASSWORD`: Sets the password which will be used to log into MongoDB.  Defaults to `password1`.  

**NOTE**: Notice `APP_*` naming convention.  If you plan on adding more environment variables to configure the Application service.  Please stick to this naming convention.  

### Running the Application Locally (via CLI)

Run the backend development server locally (not in the Docker container) with the following command:  

```sh
npm run start
```

**NOTE**: Development server will run on [https://localhost:3000/](https://localhost:3000/).  

Run the backend development server locally (not in the Docker container) in watch mode with the following command:  

```sh
npm run start:dev
```

**NOTE**: Development server will run on [https://localhost:3000/](https://localhost:3000/).  

Run the backend server locally (not in the Docker container) in production mode with the following command:  

```sh
npm run start:prod
```

**NOTE**: Development server will run on [https://localhost:3000/](https://localhost:3000/).  

### Running the Tests

Run the unit tests with the following command:  

```sh
npm run test
```

Run the unit tests and generate the coverage report with the following command:  

```sh
npm run test:cov
```

Run the end-to-end tests with the following command:  

```sh
npm run test:e2e
```

### Running MongoDB (via Docker or Docker Compose)

The following section provided instructions for how to run the MongoDB Docker container directly.  
While not the recommended way to bring up this application, the recommended way is to use Docker Compose, this section exists for educational purposes demonstrating how to run the MongoDB container with the proper configurations and options.  Also, in the case the developer would need to run it by itself for other purposes.  

This is the official MongoDB Docker container.  
This Docker container is based on the Ubuntu Linux container, using the latest LTS (v18.04 Bionic Beaver).  
Visit the following URLs for more information:  

- [https://hub.docker.com/_/mongo](https://hub.docker.com/_/mongo)
- [https://github.com/docker-library/mongo/](https://github.com/docker-library/mongo/)

To bring up the MongoDB container by itself run the following command:  

```sh
docker run --detach --rm --name mongodb1.blogexample1.local \
  --network blog-example-1 \
  --hostname mongodb1.blogexample1.local \
  --publish 27017-27019:27017-27019/tcp \
  --volume $(pwd)/fixtures:/docker-entrypoint-initdb.d/:ro \
  --volume $(pwd)/certs/server.pem:/etc/ssl/certs/server.pem:ro \
  --volume $(pwd)/config/mongod.yml:/etc/mongod.conf:ro \
  --volume $(pwd)/data:/data/db \
  --env MONGO_INITDB_DATABASE=blogexample1DB \
  --env MONGO_INITDB_ROOT_USERNAME=root \
  --env MONGO_INITDB_ROOT_PASSWORD=password1 \
  --entrypoint '' \
  mongo:4.2.3-bionic bash -c 'docker-entrypoint.sh mongod --config /etc/mongod.conf'
```

Should be able to connect with the following URL: `mongodb://root:password1@$(docker-machine ip vbox-blogexample1):27017/blogexample1DB?authSource=admin&readPreference=primary&ssl=true`  

**NOTE**: Notice the `$(docker-machine ip vbox-blogexample1)` part.  This is because you cannot directly connect to docker with `localhost`.  You actually need to reference the Docker machine's local IP.  Once again getting around a quirk with Docker on macOS.  
**NOTE**: This may take a few seconds to get up and running due to database initialization if your database is empty (initial boot or you cleared a previous database).  
**NOTE**: Since we're using self-signed certs for development purposes, you'll need to disable SSL validation on the MongoDB client side.  

Yes, the pure `docker ...` command a long command.  Thats why it's best practices to use Docker Compose.  
So an easier and cleaner way to run the MongoDB service is to run the following `docker-compose ...` command:  

```sh
docker-compose --file 'docker-compose.yml' up --no-build --detach blog_example_1_mongodb_service1
```

### Building the Application Docker Container

**TODO**

### Running the Application (via Docker or Docker Compose)

The following section provided instructions for how to run the Application Docker container directly.  
While not the recommended way to bring up this application, the recommended way is to use Docker Compose, this section exists for educational purposes demonstrating how to run the Application container with the proper configurations and options.  Also, in the case the developer would need to run it by itself for other purposes.  

This is the official Node.js Docker container.  
This Docker container is based on the slimmed down build of the Debian container, using the latest version (v10 Buster).  
Visit the following URL(s) for more information:  

- [https://github.com/nodejs/docker-node](https://github.com/nodejs/docker-node)

To bring up the MongoDB container by itself run the following command:  

```sh
docker run --detach --rm --name app1.blogexample1.local \
  --network blog-example-1 \
  --hostname app1.blogexample1.local \
  --publish 0.0.0.0:3000:3000/tcp \
  --volume $(pwd)/certs/server.key:/etc/ssl/certs/server.key:ro \
  --volume $(pwd)/certs/server.crt:/etc/ssl/certs/server.crt:ro \
  --volume $(pwd)/src/placeholder.js:/placeholder.js:ro \
  --env APP_PORT=3000 \
  --env APP_MONGODB_HOST=mongodb1.blogexample1.local \
  --env APP_MONGODB_USERNAME=root \
  --env APP_MONGODB_PASSWORD=password1 \
  --entrypoint '' \
  node:10.19.0-buster-slim bash -c 'node /placeholder.js'
```

**TODO**: Update this to use the real application once it's done rather than the placeholder, once it's ready.  

You can test this with `curl` with the following command:  

```sh
curl --insecure https://$(docker-machine ip vbox-blogexample1):3000/
```

**NOTE**: Notice the `$(docker-machine ip vbox-blogexample1)` part.  This is because you cannot directly connect to docker with `localhost`.  
**NOTE**: Because we're using self-signed certs, we'll need to pass the `--insecure` to `curl`.

Yes, the pure `docker ...` command a long command.  Thats why it's best practices to use Docker Compose.  
So an easier and cleaner way to run the Application service is to run the following `docker-compose ...` command:  

```sh
docker-compose --file 'docker-compose.yml' up --no-build --detach blog_example_1_app_service1
```

### Running via Docker Compose for all services

The following will run the application and MongoDB Docker containers together.  
This is closer to how you'd actually run this system in production.  
Though keep in mind, this is still a development container as there are some security-hardening procedures that need to be done first.  
Also, it's likely that you'll be managing this with [Kubernetes (K8s)](https://kubernetes.io/), however this is beyond the scope of this demo application.  

```sh
docker-compose --file 'docker-compose.yml' up --no-build --detach
```

You can bring the entire system down with the following command:

```sh
docker-compose --file 'docker-compose.yml' down --remove-orphans
```

**NOTE**: This will also remove the lingering containers.  So no need to explicitly remove the container or a `--rm` options.  But adding `--remove-orphans` to ensure a clean shutdown of Docker services.  
