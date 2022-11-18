import { json } from "body-parser";
import express from "express";
import { cartazRouter } from "./routes/filme/cartaz";
import { categoriaRouter } from "./routes/filme/categoria";
import { detalhesRouter } from "./routes/filme/detalhes";
import { pesquisarFilmeRouter } from "./routes/filme/pesquisar";
import { popularesRouter } from "./routes/filme/populares";
import { reviewsRouter } from "./routes/filme/reviews";
import { similaresRouter } from "./routes/filme/similares";

const server = express();
server.use(json());
server.use(popularesRouter);
server.use(cartazRouter);
server.use(detalhesRouter);
server.use(similaresRouter);
server.use(reviewsRouter);
server.use(categoriaRouter);
server.use(pesquisarFilmeRouter);

server.all("*", (req, res) => {
	res.status(404).send({ message: "Rota não encontrada!" });
});

export { server };
