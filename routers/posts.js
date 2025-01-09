const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsControllers.js");

// Index - Recupera la lista di tutti i post
router.get("/", postsController.index);

// Show - Recupera i dettagli di un post specifico per ID
router.get("/:id", postsController.show);

// Store - Crea un nuovo post
router.post("/", postsController.store);

// Update - Aggiorna un post esistente tramite ID
router.put("/:id", postsController.update);

// Delete - Elimina un post tramite ID
router.delete("/:id", postsController.destroy);

module.exports = router;
