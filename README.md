# Blogify : My own Headless CMS

> A simple app to write articles and post them on different blogs (my blog, medium, dev.io ...)

# Credits

This software uses the following open source packages:

- **NodeJS** with **ExpressJS**
- **MongoDB** with **Mongoose**
- **React** to make the application
- **Docker** to host everything :smiley:

# Quick Start

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) (which comes with npm) installed on your computer.  
From your command line:

```bash

# Clone this repo
git clone https://github.com/fred-lab/docker_mern.git

# Create a **.env** file and edit the values with your owns values
cp .env.dist .env

# Install server dependencies :
npm install --prefix server

#Install application dependencies :
npm install

# Start a server :
#For production environment, use the NodeJS server :
npm run prod --prefix server

# For development environment, use the Nodemon (to automatically reload the NodeJS server when a change is done on the server):
npm run dev --prefix server

```

The **NodeJS** server provide the application on **http://localhost:3000** by default.

# License

MIT
