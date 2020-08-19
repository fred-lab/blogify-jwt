# Docker environment for a Nodejs application

> A ligthweight Docker environment to run NodeJS application with ExpressJS and MongoDB. The ExpressJS server is in "server" folder, you can add a React app at the root and start the server with a npm command (like : npm run dev --prefix server).

## Quick Start

- Clone this repo : `git clone https://github.com/fred-lab/docker_mern.git`

- Create a **.env** file : `cp .env.dist .env`  
  Edit the values as you see fit

- Install server dependencies : `npm install --prefix server`

- Start a server :
  For production environment, use the NodeJS server : `npm run prod --prefix server`  
   For development environment, use the Nodemon (to automatically reload the NodeJS server when a change is done on the server): `npm run dev --prefix server`  
  The **NodeJS** server provide the application on **http://localhost:3000** by default.

- You can, now, create a project at the root of this folder
