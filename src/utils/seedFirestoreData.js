import { addCollectionAndDocuments } from "./firebase.js";

import SHOP_DATA from "../shop-data.js";

async function seedFirestoreShopData() {
	try {
		await addCollectionAndDocuments("categories", SHOP_DATA);
		console.log("Done seeding Firestore shop data!");
	} catch (err) {
		console.error("Error seeding Firestore shop data:", err.message);
	}
}

seedFirestoreShopData();
