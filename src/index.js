// Import the functions you need from the SDKs and Files you need
import { changePage, addFormListener, recipes, idxVal } from "./index.js";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithCredential,
	updateProfile,
} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDUql_SIOlDML1Z6z8hbgR2j46m2fyfGIs",
	authDomain: "n315-jacogarw.firebaseapp.com",
	projectId: "n315-jacogarw",
	storageBucket: "n315-jacogarw.appspot.com",
	messagingSenderId: "1084176107346",
	appId: "1:1084176107346:web:e4f354a5916e1f100a1c8b",
	measurementId: "G-F367M6XX1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function checkAuth() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			const splitName = user.displayName.split(" ");
			$(".sign-in").css("display", "none");
			$(".sign-up").css("display", "none");
			$(".log-out-holder").css("display", "flex");
		} else {
			// User is signed out
			console.log("NO USER");
		}
	});
}

function initListeners() {
	$("#app").on("click", "#sign-in-button", function (e) {
		e.preventDefault();
		let email = $("#SignInEmail").val();
		let password = $("#SignInPassword").val();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				//Signed up

				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMsg = error.message;
				alert(`ERROR: Error code ${errorCode}: ${errorMsg}`);
			});
	});
	$("#app").on("click", "#sign-up-button", function (e) {
		e.preventDefault();
		let fName = $("#fName").val();
		let lName = $("#lName").val();
		let email = $("#SignUpEmail").val();
		let password = $("#SignUpPassword").val();
		let name = `${fName} ${lName}`;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				//Signed up

				const user = userCredential.user;
				console.log(user);
				updateProfile(user, { displayName: name });
				alert(`Thanks for signing up!`);
				checkAuth();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMsg = error.message;
				alert(`ERROR: Error code ${errorCode}: ${errorMsg}`);
			});
	});
	$("#app").on("click", "#log-out-button", function (e) {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				//Signed Out
				alert("You have signed out!");
				$(".sign-in").css("display", "block");
				$(".sign-up").css("display", "block");
				$(".log-out-holder").css("display", "none");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMsg = error.message;
				alert(`ERROR: Error code ${errorCode}: ${errorMsg}`);
			});
	});
}

$(document).ready(function () {
	initListeners();
	checkAuth();
});
