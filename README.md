# Full Backend

### Note: Django and react-app have dedicated README.md

## Project Overview
The web framework [Django](https://www.djangoproject.com/) runs on a [Gunicorn](https://gunicorn.org/) server, connected utilizing WSGI. A [postgreSQL](https://www.postgresql.org/) server runs to manage the applications database. A [NGINX](https://www.nginx.com/) server works as a reverse proxy / load balancer / static conent deliver boy for the system. [Vite](https://vitejs.dev/) handles the [react](https://react.dev/) frontend development and deployment. [Docker](https://www.docker.com/) is heavily utilized for deployment to cloud services.

### Trunch Based Development
The repository follows the "Trunk Based Theory" outlined here https://trunkbaseddevelopment.com/. This strategy keeps development close to production and helps eliminate the risk of "environment hell" where its hard to keep track of all your code changes and where they have been pushed up to. This project is particularly primed for one branch because the development team is one individual. The different "environments" specified below are differnt configurations, but all use the same code / branch. Production is released as a stable snapshot of the trunk that doesn't get merged back. 

### NO Hungarian Notation
Hungarian Notation was strongly considered earlier in the project i.e. strTicker, numShares, dtmBuy etc. This project is not written with Hungarian Notation because such practices obfuscate the code and make it harder to read. IT also makes refractoring more difficult because if the type changes, the notation will be incorrect. 

### Key differences between Environments
nginx.conf HTTP vs HTTPS
- staging use the local nginx.conf, port 80, no SSL
- (not in use) production use the production nginx.conf, port 443, SSL

nginx.conf 127.0.0.1 vs 172.0.0.1
- staging uses 172.17.0.1 and production uses 127.0.0.1
- Ideally, staging could also use 127.0.0.1 for consistency but im not sure if its possible
- This problem haunts me and I wish i understood it better. I believe AWS does not use a docker network bridge and so containers communicate through localhost ie 127.0.0.1. 
Staging, locally run with compose.yaml, uses a docker bridge network which container traffic must pass through to get to the localhost and so outward traffic through the NGINX container uses this bridges IP address (172.17.0.1)

Database 
- SQLite3 can be run in development
- A postgres container can be run in staging

## Starting each Environment
### Development
To start the django server, cd into Portfolio-Manager-Backend/django and run the following bash command.

    python3 manage.py runserver

This starts up a django development server on port 8000 running with an SQLite3 database or the RDS database.

To start up the react/vite server, cd into Portfolio-Manager-Backend/react-app and run the following bash command.

    npm run dev

This starts up a development server on port 5173 that serves out the react app with API URLS pointing to the django development server.

### Staging
The backend moves to containers in staging, but the front end remains being served by vite.
To start the backend containers, cd into Portfolio-Manager-Backend/django and run the following bash command.
    docker compose up
This starts up the mock production Docker containers including:
- Nginx container serving React frontend and working as a reverse proxy for django
- Gunicorn container running a django DRF based API server
- Postgres container connected to django storing, protecting, and mangaging permanant client data
To start up the react/vite server, cd into Portfolio-Manager-Backend/react-app and run the following bash command.

    npm run staging

This starts up a development server on port 5173 that serves out the react app with API URLS pointing to the Docker containers.

### Production / Hosting
This webapp is hosted for production on AWS. A task definition defines how the Gunicorn and NGINX containers are hosted using AWS fargate. A managed RDS server running postgres handles the database and persistant data. An AWS application load balancer handles HTTPS and provides extra security. The DNS route 53 validates the CA and resolves domain names to ip addresses.

### Dev Ops System Overview 
- All traffic is first resolved by the DNS route 53 and its list of records in the hosted zone, which includes:
1. A CNAME record that validates the CA certificate
2. A A record that directs traffic to the application load balancer (ALB).
- The ALB receives HTTP/HTTPS requests directs this traffic to a few different places:
1. HTTPS requests recieved on port 443 is routed to port 80 of the fargate/ecs service.
2. HTTP requests received on port 80 are routed to port 443, so all subsequent requests use SSL/TLS (HTTPS). 
- The NGINX container is listening on port 80 and serves two functions:
1. Serving out static files such as the react app, static django files, and other media.
2. Acting as a reverse proxy for the Django/Gunicorn server on port 8000.
3. Requests using the wrong domain, such as www.fattorestreet.com, are redirect to fattorestreet.com.
- The Gunicorn server communcates via HTTP with the PostgreSQL server running on RDS.

### Domain naming
The CA cert is *.fattore.com, so any subdomain is supported.
The hosted zone is called fattorestreet.com so all subdomains can be easily accomidated

### CI/CD Pipeline
The continous integration, continious deployment pipeline consists of a distinct CI and CD. The CI are automated tests for both the react and django apps. Images can be easily built using the build.sh file and a watchtower docker container automatically deploys new containers.

### Kubernetes
Kubernetes is a container orchestration largely used for container management and scaling. This project currently runs just fine with a simple container set up, no need for containers to spin up and down to meet demand. However, if this project ever gets popular enough, Kubernetes will be an excellent choice.

### Stock Data
Reliable cheap stock data delivered through APIs are hard to come by. Finnhub finaincal APIs have been utilized for stock quotes. Other options have been explored including IEX Cloud and Alpha Vantage.