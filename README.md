# Motiv8 Mobile App

The Motiv8 mobile app is a usual single page application built using ReactJS, TypeScript, webpack, MobX, styled-components and other peripherial modules. The app is deployed to iOS and Andriod platforms using Apache Cordova.

## Instructions

- Make sure all the cordova pre-requisites are installed. https://cordova.apache.org/docs/en/latest/guide/cli/index.html
- Make sure node and npm are installed on your machine. This application has been built and tested on node version 8.9.4 and npm version 5.6.0
- Clone the repo.
- Navigate to the project root folder from your bash prompt, command prompt or terminal window.
- Run the following command to install the necessary npm modules:
    > npm install
- Navigate into the app folder (this is the cordova app) and install the npm modules using:
    > npm install
- To compile the build, run the following command from the root folder:
    > npm run build cordova
- To compile the cordova app for ios, run the following command from the app folder:
    > cordova build ios
- Follow the instructions at https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html to run the app in the iOS simulator.
- The App.tsx file is the entry point of the application. Build your React application starting with App.tsx