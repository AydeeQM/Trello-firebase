import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBE9qcjnHfiHSbeX44w1yB0s6yJI95l8IU",
    authDomain: "trello-fire.firebaseapp.com",
    databaseURL: "https://trello-fire.firebaseio.com",
    projectId: "trello-fire",
    storageBucket: "trello-fire.appspot.com",
    messagingSenderId: "587446245909"
};
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();