import dotenv from "dotenv";
dotenv.config();

const initializeEnvs = () => {
	const envs = ["API_KEY"];

	for (const env of envs) {
		if (!process.env[env]) {
			console.log(`Environment variable ${env} is not set`);
			process.exit(1);
		}
	}
};

export { initializeEnvs };
