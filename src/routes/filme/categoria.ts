import axios from "axios";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validateRequest";
import { SubFilme } from "../../types/filme";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";

const router = express.Router();

router.get(
	"/categoria",
	[
		body("page").isInt().withMessage("A página deve ser um número!"),
		body("generos").isArray().withMessage("O id deve ser um array de números!"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { page, generos } = req.body;
		const generosString = generos.join(",");
		const path = `/discover/movie?with_genres=${generosString}&page=${page}`;
		const url = getFullUrl(path);

		axios
			.get(url)
			.then((response) => {
				const { data } = response;

				const filmes: SubFilme[] = data.results.map((item: any) => {
					const filme: SubFilme = {
						id: item.id,
						capa_url: getFullImageUrl(item.poster_path),
						titulo: item.title,
						poster_url: getFullImageUrl(item.poster_path),
						rating: item.vote_average,
						data_estreia: item.release_date,
					};
					return filme;
				});

				res.send({ page, page_total: data.total_pages, filmes });
			})
			.catch((error) => {
				console.log(error);
				res.status(400).send({ message: error });
			});
	}
);

export { router as categoriaRouter };
