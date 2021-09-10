import express from "express";
import { port } from "./config";

const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export default app;
