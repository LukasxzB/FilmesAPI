import axios from "axios";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middleware/validateRequest";
import { Data } from "../../types/data";
import { Elenco } from "../../types/elenco";
import { Filme, SubFilme } from "../../types/filme";
import { Genero } from "../../types/genero";
import { Produtora } from "../../types/produtora";
import { Review } from "../../types/review";
import { Trailer } from "../../types/trailer";
import { getFullImageUrl, getFullUrl } from "../../utils/tmdbUrl";

const router = express.Router();

router.get(
	"/detalhes",
	[
		body("id").isInt().notEmpty().withMessage("O id deve ser um número!"),
		validateRequest,
	],
	(req: Request, res: Response) => {
		const { id } = req.body;
		const path = `movie/${id}?append_to_response=videos,reviews,similar,recommendations,release_dates,credits`;
		const url = getFullUrl(path);

		axios
			.get(url)
			.then((response) => {
				const { data } = response;
				const filme: Filme = {
					id: data.id,
					adulto: data.adult,
					capa_url: getFullImageUrl(data.backdrop_path),
					orcamento: response.data.budget,
					poster_url: getFullImageUrl(data.poster_path),
					titulo: data.title,
					rating: data.vote_average,
					generos: data.genres.map((genero: any): Genero => {
						return {
							id: genero.id,
							nome: genero.name,
						};
					}),
					data_estreia: data.release_date,
					duracao: data.runtime,
					sinopse: data.overview,
					producao: data.production_companies.map(
						(produtora: any): Produtora => {
							return {
								id: produtora.id,
								nome: produtora.name,
								logo_url: getFullImageUrl(produtora.logo_path),
							};
						}
					),

					receita: data.revenue,
					tagline: data.tagline,
					status: data.status,
					trailers: data.videos.results
						.filter((item: any) => item.type === "Trailer")
						.map((item: any): Trailer => {
							const { id, iso_639_1, name, key, site, official } = item;
							return {
								id,
								key,
								nome: name,
								lingua: iso_639_1,
								oficial: official,
								site,
							};
						}),
					recomendacoes: {
						paginas: data.recommendations.total_pages,
						itens: data.recommendations.results.map((item: any): SubFilme => {
							return {
								id: item.id,
								titulo: item.title,
								capa_url: getFullImageUrl(item.backdrop_path),
								poster_url: getFullImageUrl(item.poster_path),
								rating: item.vote_average,
								data_estreia: item.release_date,
							};
						}),
					},
					similares: {
						paginas: data.similar.total_pages,
						itens: data.similar.results.map((item: any): SubFilme => {
							return {
								id: item.id,
								titulo: item.title,
								capa_url: getFullImageUrl(item.backdrop_path),
								poster_url: getFullImageUrl(item.poster_path),
								rating: item.vote_average,
								data_estreia: item.release_date,
							};
						}),
					},
					reviews: {
						paginas: data.reviews.total_pages,
						itens: data.reviews.results.map((item: any): Review => {
							const { username, avatar_path, rating } = item.author_details;
							return {
								autor: username,
								conteudo: item.content,
								avatar_url: getFullImageUrl(avatar_path),
								rating,
								id: item.id,
							};
						}),
					},
					datas: data.release_dates.results.map((item: any): Data => {
						return {
							pais: item.iso_3166_1,
							datas: item.release_dates.map((item: any) => {
								return {
									data: item.release_date,
									tipo: item.type,
									nota: item.notes,
									certificacao: item.certification,
								};
							}),
						};
					}),
					elenco: data.credits.cast.map((item: any): Elenco => {
						return {
							id: item.id,
							nome: item.name,
							personagem: item.character,
							foto_url: getFullImageUrl(item.profile_path),
						};
					}),
				};

				res.send(filme);
			})
			.catch((error) => {
				console.log(error);
				res.status(400).send({ message: error });
			});
	}
);

export { router as detalhesRouter };
