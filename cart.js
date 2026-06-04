let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price){
cart.push({name, price:Number(price)});
save();
updateCart();
openCart();
}

function removeItem(i){
cart.splice(i,1);
save();
updateCart();
}

function clearCart(){
cart=[];
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
<div style="
display:flex;
justify-content:space-between;
align-items:center;
background:#2a2a2a;
color:white;
padding:10px;
margin:6px 0;
border-radius:10px;
">

<span>${item.name}</span>

<div>
<span>$${item.price}</span>
<button onclick="removeItem(${i})"
style="margin-left:8px;background:red;color:white;border:none;border-radius:6px;padding:4px 8px;">
x
</button>
</div>

</div>
`;
});

count.innerText = cart.length;
totalBox.innerText = total;
}

function openCart(){
document.getElementById("cartBody").style.display="block";
document.getElementById("overlay").style.display="block";
}

function closeCart(){
document.getElementById("cartBody").style.display="none";
document.getElementById("overlay").style.display="none";
}

function toggleCart(){
let b=document.getElementById("cartBody");
let o=document.getElementById("overlay");

if(b.style.display==="block"){
closeCart();
}else{
openCart();
}
}

function checkout(){
if(cart.length===0){
alert("Cart is empty");
return;
}

let msg="🛒 New Order:%0A%0A";
let total=0;

cart.forEach(i=>{
msg+="• "+i.name+" - $"+i.price+"%0A";
total+=i.price;
});

msg+="%0A💰 Total: $"+total;

window.open("https://t.me/iphonearian?text="+encodeURIComponent(msg),"_blank");
}

window.onload=updateCart;
