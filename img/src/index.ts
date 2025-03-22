import express, { Response, Request } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
// app.use("/img", express.static(path.join(__dirname, "../uploads")));
const port = 4000;

// Formats autorisés
const allowedFormats = ["image/jpeg", "image/png", "image/gif"];

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format non autorisé"));
    }
  },
});

app.get("/", (_req, res) => {
  res.send("Healthcheck Okay");
});

app.post("/img", (req: Request, res: Response) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Format non autorisé, utilisez JPEG, PNG ou GIF" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier envoyé" });
    }

    fs.readFile(req.file.path, (err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur de lecture du fichier" });
      }
      return res
        .status(201)
        .json({ status: true, filename: "/img/" + req.file?.filename });
    });
    return;
  });
});

app.get("/img/:filename", (req, res) => {
  let file = path.join(__dirname + "/../uploads", req.params.filename);
  console.log("file", file);
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text" });
      res.write("File Not Found!");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/octet-stream" });
      res.write(content);
      res.end();
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
