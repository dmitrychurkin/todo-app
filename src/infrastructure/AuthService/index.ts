import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,
    linkWithRedirect
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export type UserCredentials = {
    readonly email: string;
    readonly password: string;
};

export const createUserWithEmail = ({ email, password }: UserCredentials) =>
    createUserWithEmailAndPassword(getAuth(), email, password);

export const signInWithEmail = ({ email, password }: UserCredentials) =>
    signInWithEmailAndPassword(getAuth(), email, password);

export const signInWithGoogle = () =>
    signInWithRedirect(getAuth(), googleProvider);

export const logout = () =>
    signOut(getAuth());

