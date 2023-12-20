//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imagUrl, altTexte, articleName
}
console.log(id);
//--------------------------------------------------------------------------
// Récupération des produits de l'api
//--------------------------------------------------------------------------
fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then (res => operateKanap(res))

function operateKanap(kanap) {
    const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description
    const imageUrl = kanap.imageUrl
    const name = kanap.name
    const price = kanap.price
    const _id = kanap._id
    itemPrice = price
    imagUrl = imageUrl
    altTexte = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
   const image = document.createElement("img")
   image.src = imageUrl
   image.alt = altTxt
   const parent = document.querySelector(".item__img")
   if (parent != null) parent.appendChild(image)

}
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent= name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent= color
            select.appendChild(option)
        })
    }
}
const button = document.querySelector("#addToCart")
button.addEventListener("click",clickable) 

function clickable() {
const color = document.querySelector("#colors").value 
const quantity = document.querySelector("#quantity").value 
if (invalid(color, quantity)) return 
(valid(color, quantity))
saveData(color, quantity) 
directionCart()
} 

function saveData(color, quantity) {
    const newKey =`${id}-${color}`
    const fiche = {
        id: id,
        quantity: Number(quantity),
        color: color, 
        price: itemPrice,
        imageUrl: imagUrl,
        altTxt: altTexte,
        name : articleName,
        
    }
    localStorage.setItem(newKey, JSON.stringify(fiche))
}
function invalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0 || quantity >= 101) {
        alert( "Veuillez sélectionner une couleur et nombre d'articles entre 1 et 100 😉​")
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Produit non ajouté ❌ "
        return true
    } 

}

function valid (color, quantity) {
    if (color != null || color != "" || quantity != null || quantity != 0) {
        document.querySelector("#addToCart").style.color = "rgb(255, 20, 20)";
        document.querySelector("#addToCart").textContent = "Produit ajouté !"
    } 
}

function directionCart() {
    window.location.href = "cart.html"
  }

