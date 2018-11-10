'use strict';

const nameRecipe = document.querySelector('.main-title');
let recipeData;
const listIngredients = document.querySelector('.list-ingredients');

//Print list of articles

function printArticles(){
    const ingredients = recipeData.ingredients;
    ingredients.map(ingredient => {
            const newItem = document.createElement('li');
            newItem.classList.add('listItem');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('name', 'ingredient');

            const counterContainer = document.createElement('div');
            counterContainer.classList.add('counter-container');

            const counterData = document.createElement('p');
            counterData.classList.add('counter-data');
            counterData.innerHTML = ingredient.items;

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
}

//Fetch data from Server

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => {
        return response.json();
    })
    .then(response => {
        recipeData = response.recipe;
        nameRecipe.innerHTML = recipeData.name;
        printArticles();
    });
