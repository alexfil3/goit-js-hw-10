import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelector = document.querySelector('.breed-select');
const img = document.querySelector('.image');
const catsBreed = document.querySelector('.cats-breed');
const description = document.querySelector('.cats-description');
const temperament = document.querySelector('.cats-temperament');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds().then(data => {
    loader.style.display = "none"
    breedSelector.style.display = "block";

    for (let i = 0; i < data.length; i += 1) {
        breedData = data[i];

        const option = document.createElement("option");
        option.value = breedData.id;
        option.textContent = breedData.name
        breedSelector.appendChild(option)
    }
}).catch(err => console.log(err));

breedSelector.addEventListener('change', (e) => {
    const breedId = e.target.value
    
    fetchCatByBreed(breedId).then(data => {
        catInfo.style.display = "flex";
        const breed = data[0]
        
        img.src = data[0].url;
        catsBreed.textContent = breed.breeds[0].name;
        description.textContent = breed.breeds[0].description;
        temperament.innerHTML = `<span class="span">Temperament: </span>${breed.breeds[0].temperament}` 
}).catch(err => console.log(err))
})