import './css/styles.css';
import Notiflix from 'notiflix';
import API from './js/fetchCountries';
import fetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

let countryInfoMarkup = null;
let countryListMarkup = null;
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() {
    const country = input.value.trim();
    if(country.length===0){
        cleaning();
        return;
    }
    API.fetchCountries(country).then(render).catch(onError);
}
function  render() {
     countryList.innerHTML = countryListMarkup;
     if(country.length >10){
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
         cleaning();
     }else if(country.length===1){
        countryInfo.innerHTML = countryInfoMarkup;
        document.querySelector('.country-item').style.fontSize = '12px';
     }else{
         countryInfo.innerHTML='';
     }    
}
function onError(error) {
    Notiflix.Notify.warning('Oops, there is no country with that name');
    // refs.countryInfo.innerHTML = '';
}
function cleaning() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}