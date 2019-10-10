import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBeHTTwskN0g-uVVfo7D7e0VMxZOpeTvls",
    authDomain: "udemy-learn-ba949.firebaseapp.com",
    databaseURL: "https://udemy-learn-ba949.firebaseio.com",
    projectId: "udemy-learn-ba949",
    storageBucket: "udemy-learn-ba949.appspot.com",
    messagingSenderId: "973417182596",
    appId: "1:973417182596:web:3dcf2523aca737b8bdd9d1",
    measurementId: "G-SXL5DDBFXY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
            })
        } catch (error) {
            console.log('error: ', error.message);
        }
    }
    return userRef
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;