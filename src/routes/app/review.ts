import express, { Request, Response } from "express";
import { body, header } from "express-validator";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { getUser } from "../../utils/auth";
import { deleteReview, getReviews, setReview } from "../../utils/firestore";

const router = express.Router();

router.post(
	"/api/review",
	[
		header("authorization").notEmpty().withMessage("Token inválido!"),
		body("id").notEmpty().isInt().withMessage("O id deve ser um número!"),
		body("nota")
			.notEmpty()
			.isInt({ min: 0, max: 10 })
			.withMessage("Nota inválida!"),
		body("comentario")
			.notEmpty()
			.isString()
			.withMessage("Comentário deve ter ao menos 10 caracteres!")
			.isLength({ min: 10 }),
		requireAuth,
		validateRequest,
	],
	async (req: Request, res: Response) => {
		const { id, nota, comentario } = req.body;
		const user = await getUser(req);
		const { uid } = user!;

		await setReview({ uid, id, nota, comentario });
		res.send({ message: "Review modificada com sucesso!" });
	}
);

router.get(
	"/api/review",
	[
		body("id").notEmpty().isInt().withMessage("O id deve ser um número!"),
		validateRequest,
	],
	async (req: Request, res: Response) => {
		const { id } = req.body;

		const reviews = await getReviews(id);
		res.send({ reviews });
	}
);

router.delete(
	"/api/review",
	[
		header("authorization").notEmpty().withMessage("Token inválido!"),
		body("id").notEmpty().isInt().withMessage("O id deve ser um número!"),
		requireAuth,
		validateRequest,
	],
	async (req: Request, res: Response) => {
		const { id } = req.body;
		const user = await getUser(req);
		const { uid } = user!;

		await deleteReview({ uid, id });
		res.send({ message: "Review deletada com sucesso!" });
	}
);

export { router as reviewRouter };
