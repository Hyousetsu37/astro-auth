import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "src/prodfirebase/config";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
      });
    } else {
      cookies.delete("email", { path: "/" });
    }

    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return {
        uuid: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
      };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log(error);
      if (firebaseError.code === "auth/invalid-credential") {
        throw new Error(
          "Invalid Credentials, please check your email or password"
        );
      }
      throw new Error("Oh no! something bad has happened");
    }
  },
});
