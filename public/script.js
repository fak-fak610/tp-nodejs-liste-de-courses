const liste = document.getElementById("liste");
const form = document.getElementById("addForm");
const nomInput = document.getElementById("nom");
const quantiteInput = document.getElementById("quantite");

const API_URL = "/api/produits";

// Charger la liste au démarrage
async function chargerProduits() {
  const res = await fetch(API_URL);
  const produits = await res.json();
  afficherProduits(produits);
}

function afficherProduits(produits) {
  liste.innerHTML = "";
  produits.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nom} - ${p.quantite}
      <span class="actions">
        <button class="edit" onclick="modifierProduit(${p.id})">✏️</button>
        <button onclick="supprimerProduit(${p.id})">🗑️</button>
      </span>
    `;
    liste.appendChild(li);
  });
}

// Ajouter un produit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nom = nomInput.value.trim();
  const quantite = Number(quantiteInput.value);

  if (!nom || !quantite) return alert("Remplis tous les champs");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, quantite }),
  });

  nomInput.value = "";
  quantiteInput.value = "";
  chargerProduits();
});

// Supprimer un produit
async function supprimerProduit(id) {
  if (confirm("Supprimer cet article ?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    chargerProduits();
  }
}

// Modifier un produit
async function modifierProduit(id) {
  const nom = prompt("Nouveau nom du produit :");
  const quantite = prompt("Nouvelle quantité :");

  if (!nom || !quantite) return alert("Champs invalides !");
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, quantite: Number(quantite) }),
  });
  chargerProduits();
}

// Charger la liste au démarrage
chargerProduits();
