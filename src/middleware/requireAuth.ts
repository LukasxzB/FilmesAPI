import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { getUser } from "../utils/auth";

const auth = admin.app().auth();

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
	const user = await getUser(req);

	if (!user) {
		return res.status(401).send({ error: "Token inválido!" });
	}

	next();
};

export { requireAuth };
