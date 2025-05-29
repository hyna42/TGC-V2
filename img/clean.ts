/**
 * OBJECTIF : nettoyer le dossier /uploads des fichiers image qui ne sont pas liées à une annonce dans la base de donée
 *
 * 1. Requette SELECT ==> recupèrer la liste des url des ad qui sont dans la table Picture
 * 2. Mapper la liste des urls dans le dossier uploads
 * 3. Supprimer les urls dans uploads qui ne sont pas dans la db (Piture)
 */
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "uploads");

import pg from "pg";
const { Client } = pg;
import "dotenv/config";
(async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
  });

  try {
    await client.connect();
    const response = await client.query("SELECT * FROM picture");
    if (!response.rowCount) return;
    // 1 liste des urls presents en DB
    const dbUrls = response.rows.map((item) => item.url.slice(5));
    // console.log("dbURLs", dbUrls);

    if (!dbUrls.length) {
      console.log("La DB est vide ou indisponible, skip du nettoyage.");
      process.exit(0);
    }


    //2 liste des urls dans le dossier uploads du service img
    fs.readdir(
      directoryPath,
      function (err: NodeJS.ErrnoException, files: string[]) {
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        // console.log("uploadsURLs ==> ", files);
        //supprimer le fichier s'il nest pas dans la bd
        let count = 0;
        files.forEach(function (file) {
          if (!dbUrls.includes(file)) {
            count++;
            fs.unlink(
              `${directoryPath}/${file}`,
              (err: NodeJS.ErrnoException) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  return;
                }
              }
            );
          }
        });
        if (count) console.log(`❌ ${count} unused files sucessfully removed from /uploads.🗑️🗑️🗑️`);
      }
    );
  } catch (err) {
    console.error("Error connecting to db", err);
  } finally {
    await client.end();
  }
})();
