import express, { Router, response } from 'express';
import ArticleModel from '../models/article.js';
import { deleteModel } from 'mongoose';
import bodyParser from 'body-parser';

const router = express.Router();

router.post("/articles", async (request, response) => {
  const article = new ArticleModel(request.body)
  try {
    await article.save()
    response.send(article)
  } catch (error) {
    response.status(500).send(error)

  }
});
router.get("/articles/get/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const article = await ArticleModel.findById(id);
    if (!article) {
      return response.status(404).send({ error: "Article not found" });
    }
    response.send(article);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/articles/put/:id", async (req, res) => {
  const article = new ArticleModel(req.body);

  try {
    const requiredFields = ['title', 'description', 'content'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    await article.save();
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }

});


router.delete("/articles/delete:id", async (request, response) => {
  const { id } = request.params;

  try {
    const updated = await ArticleModel.findByIdAndDelete(id);
    response.status(200).send({ message: "Article deleted successfully", body: updated });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/articles/patch/:id", async (request, response) => {
  const { id } = request.params;
  const updates = request.body;
  const options = { new: true, runValidators: true };

  try {
    const article = await ArticleModel.findByIdAndUpdate(id, updates, options);
    if (!article) {
      return response.status(404).send({ error: "Article not found" });
    }
    response.send(article);
  } catch (error) {
    response.status(500).send(error);
  }
});


export default router;