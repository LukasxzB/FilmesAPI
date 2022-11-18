const getFullUrl = (path: string) => {
	const key = process.env.API_KEY;
	const divisor = path.includes("?") ? "&" : "?";
	const url = `https://api.themoviedb.org/3/${path}${divisor}api_key=${key}&language=pt-BR&region=BR`;
	return url;
};

const getFullImageUrl = (path: string) => {
	if (!path) return null;

	const url = `https://image.tmdb.org/t/p/w500${path}`;
	return url;
};

export { getFullUrl, getFullImageUrl };
