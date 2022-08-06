import type { AnyAction } from "redux";

type Matchable<ActionCreator extends () => AnyAction> = ActionCreator & {
	type: ReturnType<ActionCreator>["type"];
	match(action: AnyAction): action is ReturnType<ActionCreator>;
};

export function withMatcher<
	ActionCreator extends () => AnyAction & { type: string }
>(actionCreator: ActionCreator): Matchable<ActionCreator>;

export function withMatcher<
	ActionCreator extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: ActionCreator): Matchable<ActionCreator>;

export function withMatcher(actionCreator: Function) {
	const type = actionCreator().type();
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}

export type Action<Type> = {
	type: Type;
};

export type ActionWithPayload<Type, Payload> = {
	type: Type;
	payload: Payload;
};

export function createAction<Type extends string>(
	type: Type,
	payload: void
): Action<Type>;

export function createAction<Type extends string, Payload>(
	type: Type,
	payload: Payload
): ActionWithPayload<Type, Payload>;

export function createAction<Type extends string, Payload>(
	type: Type,
	payload: Payload
) {
	return { type, payload };
}
