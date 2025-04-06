import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/router.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = "https://xn----1-6cdtebzszxkgu1d7h.xn--p1ai/";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["POST"],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  const userAgent = req.headers["user-agent"] || "";

  if (
    (origin === allowedOrigin || referer.startsWith(allowedOrigin)) &&
    !userAgent.includes("Postman") &&
    !userAgent.includes("curl")
  ) {
    next();
  } else {
    return res.status(403).json({ message: "Доступ запрещён" });
  }
});

app.use("/api", router);

setInterval(() => {
  fetch(`${process.env.SERVER_LINK}/ping`)
    .then((res) => res.text())
    .then((data) => console.log(`Keep-alive: ${data}`))
    .catch((err) => console.error(`Keep-alive error: ${err}`));
}, 9 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
