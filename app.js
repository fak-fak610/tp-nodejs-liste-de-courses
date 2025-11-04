const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

let produits = [
  { id: 1, nom: "chips", quantite: 10 },
  { id: 2, nom: "ice tea", quantite: 20 },
  { id: 3, nom: "chocolat", quantite: 15 },
];

// Afficher toute la liste GET
app.get("/api/produits", (req, res) => {
  res.json(produits); // Renvoie le tableau complet
});

// Afficher un produit précis GET par id
app.get("/api/produits/:id", (req, res) => {
  const id = Number(req.params.id); // On récupère l'id dans l’URL
  const produit = produits.find((item) => item.id === id);
  if (!produit) return res.status(404).json({ message: "Non trouvé" });
  res.json(produit);
});

// Ajouter un produit POST
app.post("/api/produits", (req, res) => {
  const { nom, quantite } = req.body;
  const nouvelId = produits.length ? produits[produits.length - 1].id + 1 : 1;
  const nouveauProduit = { id: nouvelId, nom, quantite };
  produits.push(nouveauProduit);
  res.status(201).json(nouveauProduit);
});

// Modifier un produit PUT par id
app.put("/api/produits/:id", (req, res) => {
  const id = Number(req.params.id);
  const produit = produits.find((item) => item.id === id);
  if (!produit) return res.status(404).json({ message: "Non trouvé" });
  produit.nom = req.body.nom || produit.nom;
  produit.quantite = req.body.quantite || produit.quantite;
  res.json(produit);
});

// Supprimer un produit DELETE par id
app.delete("/api/produits/:id", (req, res) => {
  const id = Number(req.params.id);
  produits = produits.filter((item) => item.id !== id);
  res.json({ message: "Supprimé" });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
