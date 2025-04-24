import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "src/firebase/config";

const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware(
  async ({ url, request, locals }, next) => {
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    // if (user) {
    //   locals.user = {
    //     avatar: user.photoURL ?? "",
    //     email,
    //   };
    // }

    locals.isLoggedIn = isLoggedIn;

    next();
  }
);
