let productsInCart = [];
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');

//sumPrice : counting the sum price of all products in the cart.

const countTheSumPrice = function () {
	let sum = 0;
	//looping through the products in cart
	productsInCart.forEach(item => {
		//updating the sum price.
		sum += item.price;
	});
	return sum;
}

//it check if there's any product in the class list
//and if it does, it will loop through all of those products and generate a HTML (quote) for each of them
// and at the end add the HTML quote in the parentELement.
// nut if there's no product in cart, it hides the cart with a text element of "Your shopping cart is empty"

const updateShoppingCartHTML = function () { 
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>#${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		//updating the sunPrice
		cartSumPrice.innerHTML = '#' + countTheSumPrice();

	}
	else {

		//NO PRODUCTS IN CART
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

//looping through all the products in the list and check if the product passed in exist.
//if it does exist inicrease the count by 1 and if it doesn't -- add the product to the list i.e productsInCart

function updateProductsInCart(product) {
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return; //existing from the function
		}
	}

	//product doesn't exist in cart, so push the product.
	productsInCart.push(product);
}

//selecting all product

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

//checking the plus and minus button.
//initializing a function to increase/decrease the item 
// deleting(splice) an item if <= 0.

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

