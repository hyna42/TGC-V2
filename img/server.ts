import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 5000;

// Configuration du stockage des images
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());

// Correction : Type de la fonction middleware en "void"
app.post(
  "/img/upload",
  upload.single("file"),
  (req: Request, res: Response, _next: NextFunction): void => {
    if (!req.file) {
      res.status(400).json({ message: "Aucun fichier reçu" });
      return;
    }
    res
      .status(200)
      .json({ url: `http://localhost:${port}/uploads/${req.file.filename}` });
  }
);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
