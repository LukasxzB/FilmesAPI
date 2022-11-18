import { server } from "./server";
import { initializeEnvs } from "./utils/initializeEnv";
const admin = require("firebase-admin");

const start = () => {
	initializeEnvs();

	const firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
		measurementId: process.env.FIREBASE_MEASUREMENT_ID,
	};

	initializeApp(firebaseConfig);

	server.listen(3000, () => {
		console.log("Server iniciou na porta 3000");
	});
};

start();
