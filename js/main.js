'use strict';

const nameRecipe = document.querySelector('.main-title');
const listIngredients = document.querySelector('.list-ingredients');
const buttonSelect = document.querySelector('.button-select');
const buttonRemove = document.querySelector('.button-unselect');
const numberItems = document.querySelector('.number-items');
const subtotal = document.querySelector('.subtotal');
const delivery = document.querySelector('.delivery');
const total = document.querySelector('.total');
const submitPurchaseButton = document.querySelector('.submit-purchase-button');
const submitPurchaseAmount = document.querySelector('.submit-purchase-amount');
let recipeData;
let ingredients;
let checkboxList;
let inputQuantityList;
let itemPriceList;
let counterIngredients;
let counterSubtotal;
let counterDeliveryCharges;
let counterTotal = 0;

//Fetch data from Server

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => {
        return response.json();
    })
    .then(response => {
        recipeData = response.recipe;
        ingredients = recipeData.ingredients;
        printArticles();
    });

//Print list of articles

function printArticles(){
    nameRecipe.innerHTML = recipeData.name;
    ingredients.map((ingredient, index) => {
            //Creating lis
            const newItem = document.createElement('li');
            newItem.classList.add('listItem');
            newItem.setAttribute('id', index);
            //Creating checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = 'true';
            checkbox.setAttribute('name', 'ingredient');
            checkbox.classList.add('checkbox-ingredient');
            checkbox.addEventListener('change', handleCheckbox);
            checkbox.setAttribute('id', index);
            //Creating input quantity
            const counterData = document.createElement('input');
            counterData.type = 'number';
            counterData.setAttribute('name', 'quantity-ingredient');
            counterData.setAttribute('name', 'quantity-ingredient');
            counterData.addEventListener('keyup', handleInputQuantity);
            counterData.addEventListener('change', handleInputQuantity);
            counterData.classList.add('counter-data');
            counterData.value = ingredient.items;
            counterData.setAttribute('id', index);
            //Creating product data
            const ingredientDataContainer = document.createElement('div');
            ingredientDataContainer.classList.add('ingredient-data-container');

            const nameIngredient = document.createElement('p');
            nameIngredient.innerHTML = ingredient.product;

            const brandIngredient = document.createElement('p');
            brandIngredient.innerHTML = ingredient.brand || '';

            const quantityIngredient = document.createElement('p');
            quantityIngredient.innerHTML = ingredient.quantity;
            //Creating price
            const priceContainer = document.createElement('div');
            priceContainer.classList.add('price-container');

            const priceIngredient = document.createElement('p');
            priceContainer.classList.add('price-item');
            priceIngredient.innerHTML = ingredient.price + '€';
            //Putting elements inside anothers
            priceContainer.appendChild(priceIngredient);
            ingredientDataContainer.append(nameIngredient, brandIngredient, quantityIngredient);
            newItem.append(checkbox, counterData, ingredientDataContainer, priceContainer);
            listIngredients.appendChild(newItem);
    });
    checkboxList = document.querySelectorAll('.checkbox-ingredient');
    inputQuantityList = document.querySelectorAll('.counter-data');
    itemPriceList = document.querySelectorAll('.price-item');
    updatePurchaseData();
}

//Update purchase data when you select ingredient(s)

function updatePurchaseData(){
    counterIngredients = 0;
    counterSubtotal = 0;
    counterTotal = 0;
    for(let i = 0; i < ingredients.length; i++){
        const numberItems = parseInt(ingredients[i].items);
        counterIngredients += numberItems;
        const priceIngredient = ingredients[i].price * numberItems;
        itemPriceList[i].innerHTML = Math.round(priceIngredient*100)/100 + '€';
        counterSubtotal += priceIngredient;
    }
    if(counterIngredients === 0){
        counterDeliveryCharges = 0;
    } else {
        counterDeliveryCharges = 7;
    }
    counterTotal = counterSubtotal + counterDeliveryCharges;
    numberItems.innerHTML = counterIngredients;
    subtotal.innerHTML = Math.round(counterSubtotal*100)/100 + ' €';
    delivery.innerHTML = counterDeliveryCharges + ' €';
    total.innerHTML = Math.round(counterTotal*100)/100 + ' €';
    submitPurchaseAmount.innerHTML = Math.round(counterTotal*100)/100 + ' €'; 
}

//Handle checkbox

function handleCheckbox(e){
    const target = e.target;
    const id = e.target.id;
    if(target.checked === false){
        ingredients[id].items = 0;
        inputQuantityList[id].value = ingredients[id].items;
    } else {
        ingredients[id].items = 1;
        inputQuantityList[id].value = ingredients[id].items;
    }
    updatePurchaseData();
}

//Handle input quantity

function handleInputQuantity(e){
    const value = e.target.value;
    const id = e.target.id;
    if(value === ''){
        ingredients[id].items = 0;
        checkboxList[id].checked = false;
    } else{
        ingredients[id].items = value;
        checkboxList[id].checked = true;
    }
    updatePurchaseData();
}

//Function select all ingredients button

function addAllIngredients(){
    for(let i = 0; i < checkboxList.length; i++){
        ingredients[i].items = 1;
        inputQuantityList[i].value = ingredients[i].items;
    }
    updatePurchaseData();
}

//Function remove all ingredients button

function removeAllIngredients(){
    for(let i = 0; i < checkboxList.length; i++){
        ingredients[i].items = 0;
        inputQuantityList[i].value = ingredients[i].items;
    }
    updatePurchaseData();
}

//Submit message

function submitPurchase(){
    if(counterTotal > 0){
        console.log(ingredients);
    } else {
        alert('Seleccione algún producto'); 
    }
}

buttonSelect.addEventListener('click', addAllIngredients);
buttonRemove.addEventListener('click', removeAllIngredients);
submitPurchaseButton.addEventListener('click', submitPurchase);