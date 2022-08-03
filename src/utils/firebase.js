// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD9DbPHJhCOH9GyMYNsM_CzhDUS2f-zbGw",
	authDomain: "crwn-db-aae4d.firebaseapp.com",
	projectId: "crwn-db-aae4d",
	storageBucket: "crwn-db-aae4d.appspot.com",
	messagingSenderId: "463251593089",
	appId: "1:463251593089:web:1eaeff8a52f38bfe23ba80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export async function createUserDocumentFromAuth(
	authUser,
	additionalInformation = {}
) {
	if (authUser) {
		const userDocRef = doc(db, "users", authUser.uid);

		const userSnapshot = await getDoc(userDocRef);

		if (!userSnapshot.exists()) {
			const { displayName, email } = authUser;
			const createdAt = new Date();

			try {
				await setDoc(userDocRef, {
					displayName,
					email,
					createdAt,
					...additionalInformation,
				});
			} catch (err) {
				console.error("Error creating user:", err.message);
			}
		}

		return userDocRef;
	}
}

export async function createAuthUserWithEmailAndPassword(email, password) {
	if (email && password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
}

export async function signInAuthUserWithEmailAndPassword(email, password) {
	if (email && password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
}

export async function signOutUser() {
	await signOut(auth);
}

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
