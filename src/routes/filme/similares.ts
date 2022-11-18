import axios from "axios";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validateRequest";
import { SubFilme } from "../../types/filme";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";

const router = express.Router();

router.get(
	"/similares",

	[
		body("id").isInt().notEmpty().withMessage("O id deve ser um número!"),
		body("page").notEmpty().isInt().withMessage("A página deve ser um número!"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { id, page } = req.body;

		const path = `/movie/${id}/similar?page=${page}`;
		const url = getFullUrl(path);

		axios
			.get(url)
			.then((response) => {
				const data = response.data;
				const filmes: SubFilme[] = [];

				data.results.forEach((filme: any) => {
					const filmeFormatado: SubFilme = {
						id: filme.id,
						capa_url: getFullImageUrl(filme.poster_path),
						titulo: filme.title,
						poster_url: getFullImageUrl(filme.poster_path),
						rating: filme.vote_average,
						data_estreia: filme.release_date,
					};
					return filmeFormatado;
				});
				res.send({ page, page_total: data.total_pages, filmes });
			})
			.catch((error) => {
				console.error(error);
				res.status(400).send({ message: error });
			});
	}
);

export { router as similaresRouter };
