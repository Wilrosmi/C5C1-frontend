export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://c5c1-backend.herokuapp.com"
    : "http://localhost:4000";

export const frontEndUrl =
  process.env.NODE_ENV === "production"
    ? "https://c5c1-frontend.netlify.app/"
    : "http://localhost:3000";
