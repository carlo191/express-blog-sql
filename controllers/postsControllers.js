// Importiamo il file di connessione al database
const connection = require("../data/connection.js");

// Index
function index(req, res) {
  // prepariamo la query
  const sql = "SELECT * FROM `posts'";
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// Show - Recupera i dettagli di un post specifico per ID
function show(req, res) {
  // recuperiamo l'id dall' URL
  const id = req.params.id
  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
  if (err) return res.status(500).json({ error: 'Database query failed' });
  if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
  res.json(results[0]);
  });
  }
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`id post not found`);
    err.code = 404;
    throw err;
  }

  res.json(post);
}

// Store - Crea un nuovo post
function store(req, res) {
  // Creiamo un nuovo id incrementando l'ultimo id presente
  const newId = postsData[postsData.length - 1].id + 1;
  // Creiamo un nuovo oggetto pizza
  const newPost = {
    id: newId,
    titolo: req.body.titolo,

    contenuto: req.body.contenuto,

    immagine: req.body.immagine,
    tags: req.body.tags,
  };
  // Aggiungiamo il nuovo post
  postsData.push(newPost);
  // controlliamo
  console.log(postsData);

  // Restituiamo lo status corretto e il post appena creato
  res.status(201);
  res.json(newPost);
}
// Update - Aggiorna un post esistente tramite ID
function update(req, res) {
  /* Recupero l'id e lo trasformo in numero */
  const id = parseInt(req.params.id);

  /* Cerco il post tramite l'id */
  const post = postsData.find((post) => post.id === id);

  /* Faccio il controllo*/
  if (!post) {
    const err = new Error(`id post not found`);
    err.code = 404;
    throw err;
  }

  /* Aggiorno il post */
  post.titolo = req.body.titolo;
  post.contenuto = req.body.contenuto;
  post.immagine = req.body.immagine;
  post.tags = req.body.tags;

  /* Stampo l'Array in console */
  console.log(postsData);

  /* Genero il post aggiornato */
  res.json(post);
}

// Delete - Elimina un post tramite ID
function destroy(req, res) {
  // recuperiamo l'id dall' URL
  const { id } = req.params;
  //Eliminiamo la pizza dal menu
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete pizza" });
    res.sendStatus(204);
  });
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`id post not found`);
    err.code = 404;
    throw err;
  }
  const postIndex = postsData.indexOf(post);
  postsData.splice(postIndex, 1);

  console.log(postsData);

  res.sendStatus(204);
}

module.exports = { index, show, store, update, destroy };
