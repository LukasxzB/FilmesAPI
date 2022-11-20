import express, { Request, Response } from "express";
import { body } from "express-validator";
import axios from "axios";
import { validateRequest } from "../../middleware/validateRequest";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";
import { SubFilme } from "../../types/filme";

const router = express.Router();

router.get(
	"/populares",
	[
		body("page").isInt().withMessage("A página deve ser um número!"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { page } = req.body;
		const path = `/movie/popular?page=${page}`;
		const url = getFullUrl(path);
		axios
			.get(url)
			.then((response) => {
				const dados = response.data;

				const filmes: SubFilme[] = [];

				dados.results.forEach((filme: any) => {
					const filmeFormatado: SubFilme = {
						id: filme.id,
						capa_url: getFullImageUrl(filme.poster_path),
						titulo: filme.title,
						poster_url: getFullImageUrl(filme.poster_path),
						rating: filme.vote_average,
						data_estreia: filme.release_date,
					};
					filmes.push(filmeFormatado);
				});
				res.send({ page, page_total: dados.total_pages, filmes });
			})
			.catch((error) => {
				console.error(error);
				res.status(400).send({ message: error });
			});
	}
);

export { router as popularesRouter };
