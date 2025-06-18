import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/update-scene", (req, res) => {
  const sceneData = req.body;

  fs.writeFile("scene.json", JSON.stringify(sceneData, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Failed to save");
    }
    console.log("scene.json updated!");
    res.send("Scene updated!");
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
