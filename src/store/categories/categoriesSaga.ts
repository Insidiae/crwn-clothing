import { takeLatest, all, call, put } from "redux-saga/effects";

import {
	fetchCategoriesFailed,
	fetchCategoriesSuccess,
} from "./categoriesAction";
import { CATEGORIES_ACTION_TYPES } from "./categoriesTypes";

import { getCategoriesAndDocuments } from "../../utils/firebase";

import type { CallEffect, PutEffect } from "redux-saga/effects";
import type {
	FetchCategoriesSuccessAction,
	FetchCategoriesFailedAction,
} from "./categoriesAction";
import type { Category } from "./categoriesTypes";

export function* fetchCategoriesAsync(): Generator<
	| CallEffect<Category[]>
	| PutEffect<FetchCategoriesSuccessAction>
	| PutEffect<FetchCategoriesFailedAction>,
	void,
	unknown
> {
	try {
		const categories = (yield call(getCategoriesAndDocuments)) as Category[];
		yield put(fetchCategoriesSuccess(categories));
	} catch (error) {
		yield put(fetchCategoriesFailed(error as Error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]);
}
