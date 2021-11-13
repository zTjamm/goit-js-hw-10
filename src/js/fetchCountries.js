const NAME_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages'
function fetchCountries(name) {
  return fetch(`${NAME_URL}${name}${FILTER}`).then(response => {
    if(response.ok){
       return response.json(); 
   }

  });
}
export default { fetchCountries };