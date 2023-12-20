fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => addProducts(data))

function addProducts(data) {
 data.forEach((kanap) => {
    const _id = kanap._id
    const imageUrl = kanap.imageUrl
    const altTxt = kanap.altTxt
    const name = kanap.name
    const description = kanap.description 
    const image = constructImage(imageUrl, altTxt)
    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const h3 = makeH3(name)
    const p = makeParagraph(description)
    appendElementsToArticle(article, image, h3, p)
    appendArticleToAnchor(anchor, article)
})
}
function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}
function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}
function constructImage(imagUrl, altTxt) {
    const image = document.createElement ("img")
    image.src = imagUrl
    image.alt = altTxt
    return image
}
function makeH3(name) {
const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}
function makeParagraph(description) {
const p = document.createElement("p")
p.textContent = description
p.classList.add("productDescription")
return p
} 