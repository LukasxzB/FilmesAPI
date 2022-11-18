import express, { Request, Response } from "express";
import axios from "axios";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validateRequest";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";
import { SubFilme } from "../../types/filme";

const router = express.Router();

router.get(
	"/pesquisar",
	[
		body("page").isInt().withMessage("Page deve ser um número").notEmpty(),
		body("query").isString().withMessage("A pesquisa deve ser uma string"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { query, page } = req.body;
		const path = `/search/movie?query=${query}&page=${page}&include_adult=true`;
		const url = getFullUrl(path);
		axios
			.get(url)
			.then((response) => {
				const { data } = response;
				const filmes: SubFilme[] = data.results.map((item: any): SubFilme => {
					return {
						id: item.id,
						titulo: item.title,
						capa_url: getFullImageUrl(item.poster_path),
						poster_url: getFullImageUrl(item.poster_path),
						rating: item.vote_average,
						data_estreia: item.release_date,
					};
				});
				res.send({ page, total_pages: data.total_pages, filmes });
			})
			.catch((error) => {
				console.error(error);
				res.status(400).send(error);
			});
	}
);

export { router as pesquisarFilmeRouter };
