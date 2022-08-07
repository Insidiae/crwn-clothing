export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Category = {
	title: string;
	imageUrl: string;
	items: CategoryItem[];
};

export type CategoriesState = {
	readonly categories: Category[];
	readonly status: "idle" | "pending" | "rejected" | "resolved";
	readonly error: Error | null;
};

export type CategoriesMap = {
	[key: string]: Category;
};
