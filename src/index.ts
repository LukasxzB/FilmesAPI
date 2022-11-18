import { server } from "./server";
import { initializeEnvs } from "./utils/initializeEnv";

const start = () => {
	initializeEnvs();

	server.listen(3000, () => {
		console.log("Server iniciou na porta 3000");
	});
};

start();
