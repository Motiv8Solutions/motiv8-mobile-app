# Motiv8 Mobile App

The Motiv8 mobile app is a single page web application. It is built using the Motiv8 atoms UI component library. It is packaged into iOS and Andriod apps using Apache Cordova.

## Build and Deployment Instructions

- Install the Apache Cordova pre-requisites from https://cordova.apache.org/docs/en/latest/guide/cli/index.html.
- Make sure node and npm are installed on your machine. This application has been built and tested on node version 8.9.4 and npm version 5.6.0
- Clone the repo.
- Navigate to the project root folder from your bash prompt, command prompt or terminal window.
- Run the following command to install the necessary npm modules:
    > npm install
- Navigate into the 'app' folder (this is the cordova app) and install the npm modules using:
    > npm install
- To compile the build, run the following command from the root folder:
    > npm run build:cordova
- To compile the cordova app for ios, run the following command from the app folder:
    > cordova build ios
- Follow the instructions at https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html to run the app in the iOS simulator.
- The App.jsx file is the entry point of the application.

## Development Instructions
- The application is packaged using Webpack.
- To make it easy to develop and debug the application can be run in a browser using the webpack-dev-server.
- From the command prompt run the following command to open the app in a browser:
    > npm start

    **IMPORTANT** - The version of webpack-dev-server is fixed at 3.0.0 because of this [error](https://stackoverflow.com/questions/53690282/typeerror-cannot-destructure-property-compile-of-undefined-or-null).