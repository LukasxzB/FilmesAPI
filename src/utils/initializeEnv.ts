import dotenv from "dotenv";
dotenv.config();

const initializeEnvs = () => {
	const envs = [
		"API_KEY",
		"FIREBASE_API_KEY",
		"FIREBASE_AUTH_DOMAIN",
		"FIREBASE_PROJECT_ID",
		"FIREBASE_STORAGE_BUCKET",
		"FIREBASE_MESSAGING_SENDER_ID",
		"FIREBASE_APP_ID",
		"FIREBASE_MEASUREMENT_ID",
	];

	for (const env of envs) {
		if (!process.env[env]) {
			console.log(`Environment variable ${env} is not set`);
			process.exit(1);
		}
	}
};

export { initializeEnvs };
