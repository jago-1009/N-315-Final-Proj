import data from "../../data/data.json" assert { type: "json" };
let products = data.products;
let myProducts = [];
let showing = false;
let totalPrice = 0;
function addtoArr(product) {
	console.log(product);
}
function setIndexVal(idx) {
	console.log(idx);
}
function changeRoute() {
	let hashTag = window.location.hash;
	let pageID = hashTag.replace("#", "");
	//   console.log(hashTag + ' ' + pageID);
	if (pageID != "") {
		$.get(`pages/${pageID}.html`, function (data) {
			// console.log("data " + data);
			$("#app").html(data);
			loadData(pageID);
		});
	} else {
		$.get(`pages/home.html`, function (data) {
			// console.log("data " + data);
			$("#app").html(data);
			loadData("home");
		});
	}
	if (pageID == "home") {
	}
}

function loadData(data) {
	if (data == "home") {
		$.each(products, (idx, product) => {
			$("#home-products").append(`<div class="product-card">
    <div class="product-img"><img src="${product.imgURL}" class="image"></div>
    <div class="product-text">
    <div class="title">${product.name}</div>
    <div class="price">$${product.price}</div>
    <div class="rating">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
    </div>
    <div class="shipping">
        <i class="fa-solid fa-truck-fast"></i> Free Shipping
    </div>
    <div class="compare">
        <input type="checkbox"> Compare
    </div>
    
    </div>
    <div class="buyNow" id="${idx}"><button class="buyBtn">Buy Now</button></div>
</div>
`);
		});

		initListListener();
	}
	if (data === "cart") {
		if (myProducts.length == 0) {
			$("#cart-products").append(
				`<h1 class="noItems">You currently have no items in your cart right now.</h1>`
			);
		} else {
			$(".shopping-cart").css("display", "flex");
			$("#cart-products").append(
				`<div class="trash-all"><i class="fa-solid fa-trash"></i>Clear Cart</div><div class="my-product-list"></div>`
			);
			$("#subtotal-items").html(
				`You have ${myProducts.length} item/s in your cart.`
			);
			$("#order-total").html(`Total Price:${totalPrice}`);
			$.each(myProducts, (idx, product) => {
				$(".shopping-cart-holder").append(
					`<div class="cart-card">
					<img src=${product.imgURL} class="cart-img"><h3>${product.name}</h3><h4>${product.price}</h4></div>`
				);
			});
		}
	}
}

function initListListener(product, idx) {
	$(".buyNow").on("click", (e) => {
		let id = e.currentTarget.id;
		console.log("product id ", products[id]);
		myProducts.push(products[id]);

		totalPrice += products[id].price;
		if (showing == false) {
			$(".cart-length").css("display", "block");
			$(".cart-length").html(myProducts.length);
		}
	});
}

function initURLListener() {
	$("#app").on("click", `.trash-all`, (e) => {
		myProducts = [];
		window.location.reload();
	});
	$(window).on("hashchange", changeRoute);
	changeRoute();
	$("#app").on("click", `.login-btn`, (e) => {
		console.log("LOGIN");
		$(".sign-in").css("display", "flex");
		$(".sign-up").css("display", "none");
		$(".login-button").css("border", "1px solid #000");
	});
	$("#app").on("click", `.signup-btn`, (e) => {
		$(".sign-in").css("display", "none");
		$(".sign-up").css("display", "flex");
	});
	$(".account").on("click", (e) => {
		$(".account-modal").css("display", "block");
		$(".sign-in").css("display", "flex");
		$(".sign-up").css("display", "none");
		$(".login-button").css("border", "1px solid #000");
	});
	$("#app").on("click", `.close-button`, (e) => {
		$(".account-modal").css("display", "none");
	});
}

$(document).ready(function () {
	initURLListener();
});
