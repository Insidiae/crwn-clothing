import type { CategoryItem } from "../categories/categoriesTypes";

export type CartItem = CategoryItem & {
	quantity: number;
};

export enum CART_ACTION_TYPES {
	SET_CART_ITEMS = "cart/SET_CART_ITEMS",
	SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
}

export type CartState = {
	isCartOpen: boolean;
	cartItems: CartItem[];
};
