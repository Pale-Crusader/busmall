/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  if (localStorage.getItem('cart')) {
    var cartItems = JSON.parse(localStorage.getItem('cart'));
  } else {
    var cartItems = [];
  }
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
var tbodyEl =document.getElementsByTagName('tbody')[0];
tbodyEl.innerHTML = null;


}
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  var tbodyEl = document.getElementsByTagName('tbody')[0];
  var orderFormDisplayAreaParent = document.getElementsByClassName('copy')[0];
  orderFormDisplayAreaParent.innerHTML = null;
  var orderFormDisplayArea = document.createElement('div');
  orderFormDisplayArea.setAttribute('id', 'orderFormDsplayArea');
  orderFormDisplayAreaParent.appendChild(orderFormDisplayArea);
  var orderFormEl = document.createElement('form');
  orderFormEl.setAttribute('id', 'orderForm');
  orderFormDisplayArea.appendChild(orderFormEl);
  var nameInputEl = document.createElement('input');
  nameInputEl.setAttribute('type', 'text');
  nameInputEl.setAttribute('id', 'customer');
  nameInputEl.setAttribute('placeholder', 'Name on Credit Card');
  orderFormEl.appendChild(nameInputEl);
  var streetInputEl = document.createElement('input');
  streetInputEl.setAttribute('type', 'text');
  streetInputEl.setAttribute('id', 'street');
  streetInputEl.setAttribute('placeholder', 'Street Address');
  orderFormEl.appendChild(streetInputEl);
  var cityInputEl = document.createElement('input');
  cityInputEl.setAttribute('type', 'text');
  cityInputEl.setAttribute('id', 'city');
  cityInputEl.setAttribute('placeholder', 'City and State');
  orderFormEl.appendChild(cityInputEl);
  var zipcodeInputEl = document.createElement('input');
  zipcodeInputEl.setAttribute('type', 'text');
  zipcodeInputEl.setAttribute('id', 'zip');
  zipcodeInputEl.setAttribute('placeholder', 'Zip Code');
  orderFormEl.appendChild(zipcodeInputEl);
  var phoneInputEl = document.createElement('input');
  phoneInputEl.setAttribute('type', 'text');
  phoneInputEl.setAttribute('id', 'phone');
  phoneInputEl.setAttribute('placeholder', 'Phone Number');
  orderFormEl.appendChild(phoneInputEl);
  var creditCardInputEl = document.createElement('input');
  creditCardInputEl.setAttribute('type', 'number');
  creditCardInputEl.setAttribute('id', 'card');
  creditCardInputEl.setAttribute('placeholder', 'Credit Card Number');
  orderFormEl.appendChild(creditCardInputEl);
  var submitInputEl = document.createElement('input');
  submitInputEl.setAttribute('type', 'submit');
  submitInputEl.setAttribute('id', 'submission');
  orderFormEl.appendChild(submitInputEl);

  // TODO: Iterate over the items in the cart
  for (var i =0; i < cart.items.length; i++) {
      // TODO: Create a TR
    var row = document.createElement('tr');
      // TODO: Create a TD for the delete link, quantity,  and the item
    var removeCell = document.createElement('td');
    removeCell.setAttribute('id', '' + i);
    removeCell.textContent = 'X';
    row.appendChild(removeCell);
    var quantityCell = document.createElement('td');
    if (cart.items[i].quantity === '') {
      quantityCell.textContent = '0';
    } else {
      quantityCell.textContent = ('' + cart.items[i].quantity);
    }
    row.appendChild(quantityCell);
    var productCell = document.createElement('td');
    productCell.textContent = cart.items[i].product;
    var imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'cartImgPreview');
    imgEl.setAttribute('alt', cart.items[i].product);
    imgEl.setAttribute('src', cart.items[i].source);
    productCell.appendChild(imgEl);
    row.appendChild(productCell);
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tbodyEl.appendChild(row);
  }
}
function ConstructCustomer(nameInput, streetInput, cityInput, zipcodeInput, phoneInput, creditCardInput) {
  this.nameInput = nameInput;
  this.streetInput = streetInput;
  this.cityInput = cityInput;
  this.zipcodeInput = zipcodeInput;
  this.phoneInput = phoneInput;
  this.creditCardInput = creditCardInput;
}


function orderFormHandler(event) {
  event.preventDefault();
  var nameInput = document.getElementById('customer').value;
  var streetInput = document.getElementById('street').value;
  var cityInput = document.getElementById('city').value;
  var zipcodeInput = document.getElementById('zip').value;
  var phoneInput = document.getElementById('phone').value;
  var creditCardInput = document.getElementById('card').value;
  var customerInfo =  JSON.stringify(new ConstructCustomer(nameInput, streetInput, cityInput, zipcodeInput, phoneInput, creditCardInput));
  localStorage.setItem('storedCustomer', customerInfo);
  renderCart();
  var mainAnimationEl = document.getElementsByTagName('section')[0];
  var submittedEl = document.createElement('h3');
  submittedEl.textContent = 'is Submitted.';
  mainAnimationEl.appendChild(submittedEl);
  mainAnimationEl.setAttribute('id', 'cssAnimation');
}

function removeItemFromCart(event) {
    cart.removeItem(event.target.id);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
var orderFormEl = document.getElementById('orderForm');
orderFormEl.addEventListener('submit', orderFormHandler);
