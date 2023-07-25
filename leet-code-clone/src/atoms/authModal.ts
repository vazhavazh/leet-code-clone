import { atom } from "recoil";

type AuthModalState = {
	isOpen: boolean;
	type: "login" | "register" | "forgotPassword";
};

const initialState: AuthModalState = {
	isOpen: false,
	type: "login",
};

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: initialState,
});


