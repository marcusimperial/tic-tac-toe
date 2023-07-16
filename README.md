# [Tic Tac Toe!](https://tic-tac-toe-a526f.web.app)

**[https://tic-tac-toe-a526f.web.app](https://tic-tac-toe-a526f.web.app)**

## Basic Functionality 

* The app defaults to home which displays previous user data and a button to start a game.

* When the button is pressed, the user is prompted to input their own name and the name of their opponent. 

* When this is complete, the user is redirected to the Game page and can begin playing. 

* When a game ends - whether a win, loss or draw, the user is prompted to continue or end the game. In either case, the data of the round is saved. 

* When the user ends the game, they are redirected back to the home page where their latest data will be seen. 


## Structure 

For easier viewing, the structure of the project is flattened into one layer. Please refer below to the **functional structure** of both the app and API. 

### API

```
index.js (entry)
    handlers.js
        mongodb.js
        firebase.js
```

### APP

```
index.js (entry)
firebase.js
requests.js
    App.jsx
    Context.jsx
    Utilities.jsx
    Home.jsx
        Record.jsx
    Game.jsx
        Board.jsx
```

## Technologies 

1. The API uses `MongoDB` for data handling and `ExpressJS` as the server framework.
2. The app is built on `React` and is supplemented by `TailwindCSS` as the CSS framework.
3. Both are supported by `Firebase`, specifically `Auth` and `Firestore` (for frontend data transfers).

*Special note on usage of Firebase: Firebase, specifically, Firestore was used to allow future support for a mutliplayer mode via realtime updates as well as due to its coherence with the Auth service; it's used for communication more than data handling, which MongoDB does.*

## Access the [API](https://asia-southeast1-tic-tac-toe-a526f.cloudfunctions.net/api)

**[https://asia-southeast1-tic-tac-toe-a526f.cloudfunctions.net/api](https://asia-southeast1-tic-tac-toe-a526f.cloudfunctions.net/api)**

The API is stored inside of the `server` folder. Local testing follows the same flow as the React app with exception of the variables: 

*Note: The API also uses Google's Application Default Credentials (ADC) in conjunction with firebase-tools; this means that an account with access to this project must be logged in*

```
MONGODB_URI=
MONGODB_DATABASE
```

## Local Testing

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the following variables:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

4. Run `npm start`