/**
 * OBJECTIF : nettoyer le dossier /uploads des fichiers image qui ne sont pas liées à une annonce dans la base de donée
 *
 * 1. Requette SELECT ==> recupèrer la liste des url des ad qui sont dans la table Picture
 * 2. Mapper la liste des urls dans le dossier uploads
 * 3. Supprimer les urls dans uploads qui ne sont pas dans la db (Piture)
 */
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
    const res = await client.query("SELECT * FROM picture");
    console.log(res.rows);
  } catch (err) {
    console.error("Error connecting to db", err);
  } finally {
    await client.end();
  }
})();
