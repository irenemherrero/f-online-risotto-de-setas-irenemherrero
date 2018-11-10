'use strict';

const nameRecipe = document.querySelector('.main-title');
let recipeData;
let ingredients;
const listIngredients = document.querySelector('.list-ingredients');
const buttonSelect = document.querySelector('.button-select');
const buttonRemove = document.querySelector('.button-unselect');
const numberItems = document.querySelector('.number-items');
const subtotal = document.querySelector('.subtotal');
const delivery = document.querySelector('.delivery');
const total = document.querySelector('.total');
const submitPurchaseButton = document.querySelector('.submit-purchase-button');
const submitPurchaseAmount = document.querySelector('.submit-purchase-amount');
let checkboxList;
let inputQuantityList;
let counterIngredients;
let counterSubtotal;
let counterDeliveryCharges = 7.00;
let counterTotal = 0;

//Print list of articles

function printArticles(){
    nameRecipe.innerHTML = recipeData.name;
    ingredients.map((ingredient, index) => {
            const newItem = document.createElement('li');
            newItem.classList.add('listItem');
            newItem.setAttribute('id', index);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('name', 'ingredient');
            checkbox.classList.add('checkbox-ingredient');
            checkbox.addEventListener('change', handleCheckbox);
            checkbox.setAttribute('id', index);

            const counterContainer = document.createElement('div');
            counterContainer.classList.add('counter-container');

            const counterData = document.createElement('input');
            counterData.type = 'number';
            counterData.setAttribute('name', 'quantity-ingredient');
            counterData.setAttribute('name', 'quantity-ingredient');
            counterData.addEventListener('keyup', handleInputQuantity);
            counterData.classList.add('counter-data');
            counterData.value = ingredient.items;
            counterData.setAttribute('id', index);

            const ingredientDataContainer = document.createElement('div');
            ingredientDataContainer.classList.add('ingredient-data-container');

            const nameIngredient = document.createElement('p');
            nameIngredient.innerHTML = ingredient.product;

            const brandIngredient = document.createElement('p');
            brandIngredient.innerHTML = ingredient.brand;

            const quantityIngredient = document.createElement('p');
            quantityIngredient.innerHTML = ingredient.quantity;

            const priceContainer = document.createElement('div');
            priceContainer.classList.add('price-container');

            const priceIngredient = document.createElement('p');
            priceIngredient.innerHTML = ingredient.price + '€';

            priceContainer.appendChild(priceIngredient);
            ingredientDataContainer.append(nameIngredient, brandIngredient, quantityIngredient);
            counterContainer.appendChild(counterData);

            newItem.append(checkbox, counterContainer, ingredientDataContainer, priceContainer);

            listIngredients.appendChild(newItem);

    });
    checkboxList = document.querySelectorAll('.checkbox-ingredient');
    inputQuantityList = document.querySelectorAll('.counter-data');
    updatePurchaseData();
}

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

//Function select all ingredients button

function addAllIngredients(){
    for(let i = 0; i < checkboxList.length; i++){
        checkboxList[i].checked = true;
        ingredients[i].items = 1;
        inputQuantityList[i].value = ingredients[i].items;
    }
    updatePurchaseData();
}

buttonSelect.addEventListener('click', addAllIngredients);

//Function remove all ingredients button

function removeAllIngredients(){
    for(let i = 0; i < checkboxList.length; i++){
        ingredients[i].items = 0;
        inputQuantityList[i].value = ingredients[i].items;
    }
    updatePurchaseData();
}

buttonRemove.addEventListener('click', removeAllIngredients);

//Update purchase data when you select ingredient(s)

function updatePurchaseData(){
    counterIngredients = 0;
    counterSubtotal = 0;
    counterTotal = 0;
    for(let i = 0; i < ingredients.length; i++){
        if(inputQuantityList[i].value > 0){
            checkboxList[i].checked = true;
        } else {
            checkboxList[i].checked = false;
        }
        const inputValue = parseInt(ingredients[i].items);
        counterIngredients += inputValue;
        const priceIngredient = ingredients[i].price * inputValue;
        counterSubtotal += priceIngredient;
        counterTotal = counterSubtotal + counterDeliveryCharges;
    }
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
    console.log(value);
    console.log(id);
    if(value === ''){
        ingredients[id].items = 0;
    } else{
        ingredients[id].items = value;
    }
    updatePurchaseData();
}

//Submit message

function submitPurchase(){
    console.log(counterTotal);
    if(counterTotal > 7){
        alert('Gracias por su compra');
    } else {
        alert('Seleccione algún producto'); 
    }
}

submitPurchaseButton.addEventListener('click', submitPurchase);