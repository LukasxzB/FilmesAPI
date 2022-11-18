import express, { Request, Response } from "express";
import { body } from "express-validator";
import axios from "axios";
import { validateRequest } from "../../middleware/validateRequest";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";
import { Review } from "../../types/review";

const router = express.Router();

router.get(
	"/reviews",
	[
		body("page").isInt().withMessage("A página deve ser um número!"),
		body("id").isInt().withMessage("O id deve ser um número!"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { id, page } = req.body;
		const path = `/movie/${id}/reviews?page=${page}`;
		const url = getFullUrl(path);

		axios
			.get(url)
			.then((response) => {
				const { data } = response;
				const reviews = data.results.map((item: any) => {
					const { content, id } = item;
					const { username, avatar_path, rating } = item.author_details;

					const review: Review = {
						autor: username,
						conteudo: content,
						id,
						avatar_url: getFullImageUrl(avatar_path),
						rating,
					};

					return review;
				});

				res.send({ page, page_total: data.total_pages, reviews });
			})
			.catch((error) => {
				console.error(error);
				res.status(400).send({ message: error });
			});
	}
);

export { router as reviewsRouter };
