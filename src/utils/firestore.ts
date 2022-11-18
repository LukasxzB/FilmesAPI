import admin from "firebase-admin";
import { Review } from "../types/review";

interface assistidoArgs {
	uid: string;
	id: number;
	assistido: boolean;
}

interface reviewArgs {
	uid: string;
	id: number;
	nota?: number;
	comentario?: string;
}

const setAssistido = (dados: assistidoArgs) => {
	const { uid, id, assistido } = dados;

	const db = admin.app().firestore();

	const docRef = db
		.collection("users")
		.doc(uid.toString())
		.collection("assistidos")
		.doc(id.toString());

	return docRef.set({ assistido });
};

const getAssistidos = async (uid: string) => {
	const db = admin.app().firestore();

	const docRef = db
		.collection("users")
		.doc(uid.toString())
		.collection("assistidos");

	const results = await docRef.get();
	const assistidos: number[] = [];

	results.docs.forEach((doc) => {
		const id = doc.id;
		assistidos.push(parseInt(id));
	});

	return assistidos;
};

const setReview = async (dados: reviewArgs) => {
	const { uid, id, nota, comentario } = dados;

	const db = admin.app().firestore();
	const batch = db.batch();

	const userReviewRef = db
		.collection("users")
		.doc(uid.toString())
		.collection("reviews")
		.doc(id.toString());

	const movieReviewRef = db
		.collection("movies")
		.doc(id.toString())
		.collection("reviews")
		.doc(uid.toString());

	batch.set(userReviewRef, { nota, comentario });
	batch.set(movieReviewRef, { nota, comentario });

	return batch.commit();
};

const deleteReview = async (dados: reviewArgs) => {
	const { uid, id } = dados;

	const db = admin.app().firestore();
	const batch = db.batch();

	const userReviewRef = db
		.collection("users")
		.doc(uid.toString())
		.collection("reviews")
		.doc(id.toString());

	const movieReviewRef = db
		.collection("movies")
		.doc(id.toString())
		.collection("reviews")
		.doc(uid.toString());

	batch.delete(userReviewRef);
	batch.delete(movieReviewRef);

	return batch.commit();
};

const getReviews = async (id: number) => {
	const db = admin.app().firestore();
	const auth = admin.app().auth();

	const docRef = db
		.collection("movies")
		.doc(id.toString())
		.collection("reviews");

	const results = await docRef.get();
	const reviews: Review[] = [];

	results.docs.forEach(async (doc) => {
		const uid = doc.id;
		const user = await auth.getUser(uid);
		const name = user.displayName;
		const photo = user.photoURL;

		const { nota, comentario } = doc.data();

		const review: Review = {
			autor: name!,
			avatar_url: photo!,
			conteudo: comentario,
			id: uid,
			rating: nota,
		};

		reviews.push(review);
	});

	return reviews;
};

export { setAssistido, setReview, deleteReview, getReviews, getAssistidos };
