# vue-chat
Live demo link: 

## Description and Images
This project is a chat application built with Vue and Firebase. Multiple people can join multiple chatrooms and talk together! The user also has the option to join two chatrooms simultaneously in one window. Once they're done, they can close one of their chat rooms and join another one. To keep the database clean, if more than 5 chatrooms are created, a cloud function is set to delete the oldest chatroom that has been hasn't been messaged in. There's also another cloud function set to delete old messages when the chatroom exceeds 10 messages.
![login](https://user-images.githubusercontent.com/52221230/138035688-93f140c9-c3a5-41c7-93c5-69183ce5005b.JPG)
![single-chat](https://user-images.githubusercontent.com/52221230/138035826-49185a71-e1a9-41bd-96f0-19ac9f6c4674.JPG)
![join-room](https://user-images.githubusercontent.com/52221230/138035754-af08a095-b20f-4ac4-be61-8711f22c137f.JPG)
![double-chat](https://user-images.githubusercontent.com/52221230/138035581-1be4e6ae-8d57-4f8b-aff8-509983bc9e52.JPG)


## Installation
#### Configuring Firebase
* Create a firebase project and enable cloud firestore and cloud functions
* Select add firebase to your web app.
#### Installing npm
* If you haven't installed npm on your device yet, do so by running:
* **sudo apt install npm**
#### Creating a vuejs project
* Run these commands:
* **sudo npm install -g @vue/cli**
* **git clone https://github.com/kevin-cheng90/vue-chat**
* cd into the vue-chat directory by running:
* **cd vue-chat**
* Once in the project directory, run these commands to install the required packages
* **npm install** (this adds node_modules to the directory)
* **npm install bootstrap jquery poppers.js**
* **npm install firebase**
* **npm install moment**
* **npm install vue-chat-scroll**
* **sudo npm install -g firebase-tools**
#### Adding your own config and API keys
Copy the config given to your firebase app from google firebase
and paste the information into src/firebase/init.js. It should look
like this before you paste your configuration.
```
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```
Be sure only to modify the information in the brackets.
#### Adding Cloud Functions
* Log into firebase by typing the command:
* **firebase login**
* Copy and paste the url provided into your browser to low in and select allow
* Return to your command line and run:
* **firebase init**
* You'll be prompted to configure settings for the command line interface. Follow the instructions below.
```
Which Firebase CLI features: select functions
Select default Firebase project: select the vue-js project that you created earlier 
What language would you like to use: select javascript
Do you want to allow ESLint to catch bugs and enforce style: N
Do you want to install dependencies with npm now: Y
```
* run **npm install firebase-tools**
* **firebase deploy --only functions** (this may take couple minutes to run)
* run **npm run serve**
* Visit the localhost website provided in the command line! Now the chat app should be up and running! 
