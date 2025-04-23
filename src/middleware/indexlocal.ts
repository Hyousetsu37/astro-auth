import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware(async ({ url, request }, next) => {
  const authHeaders = request.headers.get("authorization") ?? "";

  if (privateRoutes.includes(url.pathname)) {
    return checkLocalauth(authHeaders, next);
  }
  return next();
});

const checkLocalauth = (authHeaders: string, next: MiddlewareNext) => {
  if (authHeaders) {
    const authValue = authHeaders.split(" ").at(-1) ?? "user:pass";
    const decodedValue = atob(authValue).split(":");
    const [user, password] = decodedValue;

    console.log({ user, password });
    if (user === "admin" && password === "admin2") {
      return next();
    }
  }

  return new Response("AuthRequired", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic real="Secure Area',
    },
  });
};
