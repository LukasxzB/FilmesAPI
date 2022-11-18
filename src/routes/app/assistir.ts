import express, { Request, Response } from "express";
import { body, header } from "express-validator";
import { requireAuth } from "../../middleware/requireAuth";
import { getUser } from "../../utils/auth";
import { getAssistidos, setAssistido } from "../../utils/firestore";

const router = express.Router();

router.post(
	"/api/assistir",
	[
		header("authorization").notEmpty().withMessage("Token inválido!"),
		body("id").notEmpty().isInt().withMessage("O id deve ser um número!"),
		requireAuth,
	],
	async (req: Request, res: Response) => {
		const { id } = req.body;
		const user = await getUser(req);
		const { uid } = user!;

		await setAssistido({ uid, id, assistido: true });
		res.send({ message: "Filme adicionado na lista com sucesso!" });
	}
);

router.delete(
	"/api/assistir",
	[
		header("authorization").notEmpty().withMessage("Token inválido!"),
		body("id").notEmpty().isInt().withMessage("O id deve ser um número!"),
		requireAuth,
	],
	async (req: Request, res: Response) => {
		const { id } = req.body;
		const user = await getUser(req);
		const { uid } = user!;

		await setAssistido({ uid, id, assistido: false });
		res.send({ message: "Filme removido da lista com sucesso!" });
	}
);

router.get(
	"/api/assistir",
	[
		header("authorization").notEmpty().withMessage("Token inválido!"),
		requireAuth,
	],
	async (req: Request, res: Response) => {
		const user = await getUser(req);
		const { uid } = user!;

		const assistidos = await getAssistidos(uid);
		res.send({ assistidos });
	}
);

export { router as assistirRouter };
