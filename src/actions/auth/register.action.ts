import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";
import { firebase } from "src/firebase/config";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, password, email, remember_me }, { cookies }) => {
    //Cookies
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    //Create account

    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      const currentUser = firebase.auth.currentUser;

      if (!currentUser) {
        throw new Error("No user available");
      }
      //Update displayName
      updateProfile(currentUser, { displayName: name });

      //verify Email
      await sendEmailVerification(currentUser, {
        url: "http://localhost:4321/protected",
      });

      return { uid: user.user.uid, email: user.user.email };
    } catch (error) {
      console.log(error);
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("Email is already in use");
      }

      throw new Error("Aaaaaa Something went wrong");
    }

    return { ok: true, msg: "User created" };
  },
});
