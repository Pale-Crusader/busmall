/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
var cart = new Cart(cartItems);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
    for (var i = 0; i < Product.allProducts.length; i++) {
    //TODO: Add an <option> tag inside the form's select for each product
        
      var selectElement = document.getElementById('items');
      var optionEl = document.createElement('option');
      optionEl.setAttribute("value", Product.allProducts[i].name);
      optionEl.textContent = Product.allProducts[i].name;
      selectElement.appendChild(optionEl);
      var assetEl = document.createElement('img');
      assetEl.setAttribute("src", Product.allProducts[i].filePath);
      optionEl.appendChild(assetEl);
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

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  var selectElement = document.getElementById('items');
  var quantityEl = document.getElementById('items');
  var selectedValue = selectElement.options[selectElement.selectedIndex].value;
  var quantityValue = quantityEl.options[quantityEl.selectedIndex].value;

  cart.addItem(selectedValue, quantityValue);
  console.log(cart.items);
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
  cartContentsEl.appendChild(ulEl);
  for (var i = 0; i < cart.items.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = cart.items[i].product + ': ' + cart.items[i].quantity;
    ulEl.appendChild(liEl);
    for (var index = 0; index < Product.allProducts.length; index++)
      if (cart.items[i].product === Product.allProducts[index].name);
        var imgEl = document.createElement('img');
        imgEl.setAttribute('class', 'cartImgPreview');
        imgEl.setAttribute('alt', cart.items[i].product);
        imgEl.setAttribute('src', Product.allProducts[index].filePath);
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