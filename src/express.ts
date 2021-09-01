import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5678;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export default app;
