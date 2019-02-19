# Motiv8 Mobile App

The Motiv8 mobile app is a usual single page application built using ReactJS, TypeScript, webpack, MobX, styled-components and other peripherial modules. The app is deployed to iOS and Andriod platforms using Apache Cordova.

## Instructions

- Make sure node and npm are installed on your machine. This application has been built and tested on node version 8.9.4 and npm version 5.6.0
- Clone the repo.
- Navigate to the rproject folder from your bash prompt, command prompt or terminal window.
- Run the following command to install the necessary npm modules:
    > npm install
- To start the application in development mode run the following command:
    > npm start

    This command will run the webpack-dev-server and open your browser to http://localhost:8080 where you should see the application running.

    Any changes you make to the application code will now recompile the application and refresh the browser automatically.

- To compile the production version of the application run the following command:
    > npm run build

    This command will bundle the application into two files in the dist folder:
     >> main.bundle.js - Contains the code for your application.

     >> common.bundle.js - Contains common code.

    Deploy the contents of the 'dist' folder to a web server for running the application. If you clone the 'node-app-template' application, copy the contents of the 'dist' folder to the 'static' folder in the 'node-app-template' application.
- The App.js file is the entry point of the application. Build your React application starting with App.js