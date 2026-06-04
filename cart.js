let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price){
cart.push({name, price:Number(price)});
save();
updateCart();
}

function removeItem(i){
cart.splice(i,1);
save();
updateCart();
}

function updateCart(){

let box = document.getElementById("cartItems");
let count = document.getElementById("count");
let totalBox = document.getElementById("total");

if(!box) return;

box.innerHTML = "";

let total = 0;

cart.forEach((item,i)=>{
total += item.price;

box.innerHTML += `
<div style="display:flex;justify-content:space-between;margin:5px 0">
<span>${item.name}</span>
<span>$${item.price}
<button onclick="removeItem(${i})">x</button>
</span>
</div>
`;
});

count.innerText = cart.length;
totalBox.innerText = total;
}

function toggleCart(){
let b=document.getElementById("cartBody");
b.style.display = b.style.display==="block"?"none":"block";
}

function checkout(){
if(cart.length===0){
alert("سبد خرید خالی است");
return;
}

let msg = "🛒 New Order:%0A%0A";
let total = 0;

cart.forEach(i=>{
msg += "▪ " + i.name + " - $" + i.price + "%0A";
total += i.price;
});

msg += "%0A💰 Total: $" + total;

msg += "%0A%0A📦 Please confirm order";

window.open("https://t.me/iphonearian?text=" + encodeURIComponent(msg), "_blank");
}

window.onload = updateCart;
