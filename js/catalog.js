/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.

if (localStorage.getItem('cart')) {
  var cartItems = JSON.parse(localStorage.getItem('cart'));
} else {
  var cartItems = [];
}
var cart = new Cart(cartItems);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
    for (var i = 0; i < Product.allProducts.length; i++) {
    //TODO: Add an <option> tag inside the form's select for each product
        
      var selectElement = document.getElementById('items');
      var optionEl = document.createElement('option');
      optionEl.setAttribute('value', Product.allProducts[i].name);
      optionEl.textContent = Product.allProducts[i].name;
      selectElement.appendChild(optionEl);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // TODO: Prevent the page from reloading
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  console.log(cart.items);
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  var productFormEl = document.getElementById('items');
  var quantityFormEl = document.getElementById('quantity');
  var productValue = productFormEl.value;
  var quantityValue = quantityFormEl.value;
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (productValue === Product.allProducts[i].name) {
      var sourceValue = Product.allProducts[i].filePath;
    }
  }
  cart.addItem(productValue, quantityValue, sourceValue);
}

  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart


// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var count = document.getElementById('itemCount');
  count.textContent = cart.items.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var cartContentsEl = document.getElementById('cartContents')
  cartContentsEl.innerHTML = '';
  var ulEl = document.createElement('ul');
  ulEl.setAttribute('id', 'cartDisplayUlList');
  cartContentsEl.appendChild(ulEl);
  for (var i = 0; i < cart.items.length; i++) {
    var liEl = document.createElement('li');
    liEl.setAttribute('class', 'cartDisplayLi');
    liEl.textContent = cart.items[i].product + ': ' + cart.items[i].quantity;
    ulEl.appendChild(liEl);
    var imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'cartImgPreview');
    imgEl.setAttribute('alt', cart.items[i].product);
    imgEl.setAttribute('src', cart.items[i].source);
    cartContentsEl.appendChild(imgEl);
  }
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
// console.log(Product.allProducts.length + ' = Product.allProducts.length');
// console.log(Product.allProducts[1].filePath + ' = Banana Source? ');
// console.log(Product.allProducts[1].name + ' = Banana Source? ');
if (localStorage) {
  updateCounter();
  updateCartPreview();
}
