let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

function addToCart(name, price){
cart.push({name, price:Number(price)});
localStorage.setItem("cart", JSON.stringify(cart));
updateCart();
}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart", JSON.stringify(cart));
updateCart();
}

function applyDiscount(code){
if(code==="OFF10") discount=0.1;
else if(code==="OFF20") discount=0.2;
else { alert("Invalid code"); return; }

alert("Discount applied");
updateCart();
}

function updateCart(){
let box=document.getElementById("cartItems");
let count=document.getElementById("count");
let totalBox=document.getElementById("total");
let finalBox=document.getElementById("finalTotal");

if(!box) return;

box.innerHTML="";
let total=0;

cart.forEach((i,index)=>{
total+=i.price;

box.innerHTML+=`
<div style="display:flex;justify-content:space-between;margin:5px 0">
<span>${i.name}</span>
<span>
$${i.price}
<button onclick="removeItem(${index})" style="background:red;color:white;border:none">x</button>
</span>
</div>`;
});

let final=total-(total*discount);

count.innerText=cart.length;
totalBox.innerText=total;
if(finalBox) finalBox.innerText=final.toFixed(0);

localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart(){
let b=document.getElementById("cartBody");
b.style.display=b.style.display==="block"?"none":"block";
}

function checkout(){
if(cart.length===0){ alert("Cart empty"); return; }

let msg="🛒 Order:%0A";
let total=0;

cart.forEach(i=>{
msg+=i.name+" - $"+i.price+"%0A";
total+=i.price;
});

let final=total-(total*discount);

msg+="%0A💰 Total: $"+final.toFixed(0);

window.open("https://t.me/iphonearian?text="+msg,"_blank");
}

window.onload=updateCart;
