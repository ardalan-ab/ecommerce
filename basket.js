const BasketPage = document.getElementById("basketpage");
const ul =document.getElementById("basketlist")
 const total=document.getElementById("total")
function renderbasket(list) {
    let Total=0
      BasketPage.style.display="block"
         BasketPage.style.width="300px"
        document.body.style.marginLeft="300px"
  const template = list.map((item) => {
   return( item.map((item2)=>{  
 
    Total+=item2.price
    return `      
        <li class="basketlist">
          <img src="${item2.image}" alt="">
          <div id="text">
          <h3>${item2.title}</h3>
          <h4>price:${item2.price}$</h4>
        </div>
        <button class="added button btn" onclick="handleRemoveFromBasket(${item2.id})">Remove</button>
        </li>
     
       
      
      `;}))
     
    
 
  });
  total.innerHTML="TOTAL:"+Total +"$"
  ul.innerHTML=template.join("")
 
}
function closebasket() {
   BasketPage.style.display="none"
   BasketPage.style.width="0"
         document.body.style.marginLeft="0"
}