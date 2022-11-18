import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import auth from "firebase/auth";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
};

export { requireAuth };
