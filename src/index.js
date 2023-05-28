import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelector = document.querySelector('.breed-select');
const img = document.querySelector('.image');
const catsBreed = document.querySelector('.cats-breed');
const description = document.querySelector('.cats-description');
const temperament = document.querySelector('.cats-temperament');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds().then(data => {
    loader.style.display = "none";
    breedSelector.style.display = "block";
    const breeds = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    breedSelector.insertAdjacentHTML('beforeend', breeds);
}).catch(err => console.log(err));

breedSelector.addEventListener('change', (e) => {
    const breedId = e.target.value;
    loader.style.display = "block";
    catInfo.style.display = "none";
    
    fetchCatByBreed(breedId).then(data => {
        catInfo.style.display = "flex";
        loader.style.display = "none";
        const breed = data[0];
        
        img.src = data[0].url;
        catsBreed.textContent = breed.breeds[0].name;
        description.textContent = breed.breeds[0].description;
        temperament.innerHTML = `<span class="span">Temperament: </span>${breed.breeds[0].temperament}`;
    }).catch(err => console.log(err))
});