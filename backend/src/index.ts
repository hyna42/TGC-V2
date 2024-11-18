import express from "express";
import cors from "cors"; // Import de cors
import "reflect-metadata";
import { datasource } from "./config/db";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { In, Like } from "typeorm";
// import { validate } from "class-validator";

const app = express();
const port = 3000;
// Middleware JSON
app.use(express.json());

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend local
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/**ADS */
//fetch all ads
app.get("/ads", async (req, res) => {
  try {
    const categoryFilter = req.query.category
      ? { title: Like(`%${req.query.category}%`) }
      : undefined;

    const tagFilter = req.query.tag
      ? { name: Like(`%${req.query.tag}%`) }
      : undefined;

    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        ...(categoryFilter && { category: categoryFilter }),
        ...(tagFilter && { tags: tagFilter }),
      },
    });

    // console.log(ads);
    res.json(ads);
  } catch (error) {
    console.error("Error retrieving ads:", error.message);
    res.status(500).send("Error retrieving ads");
  }
});

//retrieve ad with d
app.get("/ads/:id", async (req, res) => {
  try {
    const ad = await Ad.findOne({ where: { id: parseInt(req.params.id) } });
    if (req.params.id) {
      res.json(ad);
    } else {
      res.status(404).send("Ad not found");
    }
  } catch (error) {
    console.error("Error retrieving ads:", error.message);
    res.status(500).send("Error retrieving ads");
  }
});

//create new ad (req.body)
app.post("/ads", async (req, res) => {
  try {
    // console.log("request body", req.body);

    // Création de l'entité annonce
    const ad = new Ad();
    ad.createdAt = req.body.createdAt;
    ad.description = req.body.description;
    ad.location = req.body.location;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.title = req.body.title;
    ad.pictures = req.body.pictures; // Ajout de la propriété `pictures`

    // Liaison de la catégorie si elle est trouvée
    if (req.body.category) {
      const category = await Category.findOne({
        where: { id: req.body.category },
      });
      if (category) {
        ad.category = category;
      }
    }

    // Liaison des tags si présents
    if (req.body.tags && Array.isArray(req.body.tags)) {
      const tags = await Tag.findBy({ id: In(req.body.tags) });
      ad.tags = tags;
    }

    // Sauvegarde de l'annonce
    const result = await ad.save();
    res.status(201).json({ message: "Ad has been successfully added", result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error adding ad");
  }
});

//edite an ad (req.params | req.query)
app.put("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad) {
      const {
        title = ad.title,
        description = ad.description,
        owner = ad.owner,
        price = ad.price,
        location = ad.location,
        createdAt = ad.createdAt,
        pictures = ad.pictures,
        category = ad.category,
        tags = ad.tags,
      } = req.body;

      // Mettre à jour la catégorie si elle est fournie
      if (category) {
        const foundCategory = await Category.findOne({
          where: { id: category },
        });
        ad.category = foundCategory || ad.category;
      }

      // Mettre à jour les tags si une liste de tags est fournie
      if (Array.isArray(tags)) {
        const foundTags = await Tag.findBy({ id: In(tags) });
        ad.tags = foundTags;
      }

      // Utilisation de Object.assign pour mettre à jour les autres propriétés de `ad`
      Object.assign(ad, {
        title,
        description,
        owner,
        price,
        location,
        createdAt,
        pictures,
      });

      await ad.save();
      res.send("Ad has been updated");
    } else {
      res.status(400).send("Add not found");
    }
    // console.log(id);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send("Error updating ad");
  }
});

//delete  ad (req.params | req.query)
app.delete("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ad = await Ad.findOneBy({ id });

    if (!ad) {
      res.status(404).send("Ad not found");
    } else {
      await ad.remove();
      res.send("Ad has been deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting Ad");
    console.log("SQL Error : ", error.message);
  }
});

/**CATEGORIES */
app.get("/categories", async (req, res) => {
  try {
    const nameFilter = req.query.name
      ? { title: Like(`%${req.query.name}%`) }
      : {};

    const categories = await Category.find({ where: nameFilter });

    res.json(categories);
  } catch (error) {
    console.log("SQL Error:", error.message);
    res.status(500).send("Error retrieving categories");
  }
});

app.post("/categories", async (req, res) => {
  try {
    const category = new Category();
    category.title = req.body.title;

    await category.save();
    res
      .status(201)
      .send(`Category has been successfully added with ID ${category.id}`);
  } catch (err) {
    console.log("SQL Error:", err.message);
    res.status(500).send(`Error adding category with ID`);
  }
});

app.put("/categories/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await Category.findOneBy({ id });
    if (!category) {
      res.status(400).send("Category not found");
    } else {
      category.title = req.body.title;
      await category.save();
      res.send("Category has been updated");
    }
  } catch (error) {
    res.status(500).send("Error updating category");
    console.log("SQL Error:", error.message);
  }
});

app.delete("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const category = await Category.findOneBy({ id });

  try {
    if (!category) {
      res.status(400).send("Category not found");
    } else {
      await category.remove();
      res.send("Category has been deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting category");
    console.log("SQL Error:", error.message);
  }
});

/**TAGS */
app.get("/tags", async (_req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    console.log("SQL Error:", error.message);
    res.status(500).send("Error retrieving tags");
  }
});

app.post("/tags", async (req, res) => {
  try {
    const tag = new Tag();
    tag.name = req.body.name;

    await tag.save();
    res.status(201).send(`Tag has been successfully added with ID ${tag.id}`);
  } catch (err) {
    console.log("SQL Error:", err.message);
    res.status(500).send(`Error adding tag`);
  }
});

app.put("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tag = await Tag.findOneBy({ id });
    if (!tag) {
      res.status(400).send("Tag not found");
    } else {
      tag.name = req.body.name;
      await tag.save();
      res.send("Tag has been updated");
    }
  } catch (error) {
    res.status(500).send("Error updating Tag");
    console.log("SQL Error:", error.message);
  }
});

app.delete("/tags/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const tag = await Tag.findOneBy({ id });

  try {
    if (!tag) {
      res.status(400).send("Tag not found");
    } else {
      await tag.remove();
      res.send("Tag has been deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting Tag");
    console.log("SQL Error:", error.message);
  }
});

//Ecoute le port
app.listen(port, async () => {
  await datasource.initialize();
  console.log(`Example app listening on port ${port}`);
});
