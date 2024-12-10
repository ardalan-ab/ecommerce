
const request = new XMLHttpRequest();
request.open("GET", "https://fakestoreapi.com/products");
request.send();
request.addEventListener("load", getProducts);

// dom nodes
const root = document.getElementById("root");
const span = document.querySelector("span");
const input = document.querySelector("#search > input");
const buttons = document.querySelectorAll("button");

let ALL_PRODUCTS = [];
const BASKET = [];
const BASKETID=[];


function getProducts() {
  const data = JSON.parse(request.responseText);
  ALL_PRODUCTS = data;
  render(data);
}

function render(list) {
  const template = list.map((item) => {
    return `
            <div class='product'>
                <img src='${item.image}' /> 
                <h3>${item.title}</h3>
                <h5>category: ${item.category}</h5>
                <p>price: ${item.price}$</p>
                ${
                  BASKETID.includes(item.id)
                    ? `<button class="added button" onclick="handleRemoveFromBasket(${item.id})">Remove From Basket</button>`
                    : `<button class="button" onclick="handleAddToBasket(${item.id})">ADD to Cart</button>`
                }
            </div>
        `;
  });
  root.innerHTML = template.join("");
  span.textContent = BASKET.length;
}

function handleAddToBasket(productId) {

  BASKETID.push(productId);

  BASKET.push(ALL_PRODUCTS.filter((item)=>{
    return item.id===productId
  }));
  render(ALL_PRODUCTS);
  renderbasket(BASKET)
}

function handleRemoveFromBasket(productId) {

  const indexx = BASKETID.indexOf(productId);
  BASKETID.splice(indexx, 1);


   const index=BASKET.map((item ,i)=>{
    if(     item.map((item2)=>{
      return item2.id==productId

    }))

    return i
   }).indexOf(productId);
  BASKET.splice(index, 1);
  render(ALL_PRODUCTS);
  renderbasket(BASKET)
}

function handleSearch(event) {
  const value = event.target.value;
  const result = ALL_PRODUCTS.filter((product) => {
    return product.title.search(value) >= 0;
  });
  render(result);
}

function handleFilter(event) {
  debugger;
  const result = ALL_PRODUCTS.filter((product) => {
    return product.category === event.target.textContent;
  });

  render(result);
}

// events
input.addEventListener("keyup", handleSearch);
for (const btn of buttons) {
  btn.addEventListener("click", handleFilter);
}
