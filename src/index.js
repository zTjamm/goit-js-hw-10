import './css/styles.css';
import Notiflix from 'notiflix';
import API from './js/fetchCountries';
import countryLst from './tmp/list-country.hbs';
import countryFlags from './tmp/flags.hbs';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() {
    const name = input.value.trim();
        
    if(name.length===0){
        cleaning();
        return;
    }
    API.fetchCountries(name).then(render).catch(onError);          
}
function  render(name) {
     countryList.innerHTML = countryFlags({name})
     if(country.length >10){
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
         cleaning();
     }else if(country.length===1){
        countryInfo.innerHTML = countryLst({name});
        document.querySelector('.country-item').style.fontSize = '15px';
     }else{
         countryInfo.innerHTML='';
     }    
}
function onError(error) {
    Notiflix.Notify.warning('Oops, there is no country with that name');
    countryInfo.innerHTML = '';
}
function cleaning() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

