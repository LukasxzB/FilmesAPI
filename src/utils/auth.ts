import { Request } from "express";
import admin from "firebase-admin";

const getUser = async (req: Request) => {
	const token = req.headers.authorization;

	if (!token || token === "") return null;

	const auth = admin.app().auth();
	const user = await auth.verifyIdToken(token!, true).catch(() => null);
	return user;
};

export { getUser };
