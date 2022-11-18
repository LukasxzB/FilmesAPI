import { Data } from "./data";
import { Elenco } from "./elenco";
import { Genero } from "./genero";
import { Produtora } from "./produtora";
import { Review } from "./review";
import { Trailer } from "./trailer";

type SubFilme = {
	id: number;
	titulo: string;
	poster_url: string | null;
	capa_url: string | null;
	rating: number;
	data_estreia: string | null;
};

type Filme = {
	id: number;
	adulto: boolean;
	capa_url: string | null;
	orcamento?: number;
	generos?: Genero[];
	sinopse?: string;
	poster_url: string | null;
	producao?: Produtora[];
	data_estreia?: string;
	receita?: number;
	duracao?: number;
	status?: string;
	tagline?: string;
	titulo: string;
	rating: number;
	trailers?: Trailer[];
	reviews?: {
		paginas: number;
		itens: Review[];
	};
	recomendacoes?: {
		paginas: number;
		itens: SubFilme[];
	};
	similares?: {
		paginas: number;
		itens: SubFilme[];
	};
	datas?: Data[];
	elenco: Elenco[];
};

export { Filme, SubFilme };
