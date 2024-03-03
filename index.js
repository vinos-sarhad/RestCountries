 

    function generateCountryCards(data) {
    const countryCardsContainer = document.getElementById('country-cards');
    countryCardsContainer.innerHTML = ''; // Clear previous cards
    data.forEach(country => {
  
const countryCard= document.createElement("div")
countryCard.className = 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 pb-4 bg-white dark:bg-gray-700 shadow-md rounded-md';


const countryImage=document.createElement("img")

countryImage.className='w-full rounded-t-md h-40';
countryImage.src = country.flags.png;
countryCard.appendChild(countryImage)


const countryLink = document.createElement("a"); // Create <a> element
countryLink.href = `detail.html?country=${encodeURIComponent(country.name.common)}`; // Set the href attribute to your desired URL
countryCard.appendChild(countryLink)
countryLink.appendChild(countryImage)



const countryName = document.createElement('h1');
  countryName.className = 'font-bold text-lg mt-2 px-3 dark:text-white ';
  countryName.textContent=country.name.common;

countryCard.appendChild(countryName)
countryName.innerHTML=`<a href="detail.html?country=${country.name.common}">${country.name.common}</a>`

const population = document.createElement('p');
population.className = 'mt-1 px-3 text-gray-600 text-sm dark:text-gray-300 ';
population.innerHTML=`<strong>Population: </strong> ${country.population}`

countryCard.appendChild(population)

const region = document.createElement('p');
      region.className = 'px-3 text-gray-600 text-sm dark:text-gray-300';
      region.innerHTML = `<strong>Region:</strong> ${country.region}`;
      countryCard.appendChild(region);

      const capital = document.createElement('p');
      capital.className = 'px-3 text-gray-600 text-sm dark:text-gray-300';
      capital.innerHTML = `<strong>Capital:</strong> ${country.capital}`;
      countryCard.appendChild(capital);

      countryCardsContainer.appendChild(countryCard);

     });
    // Process the data as needed
  }
//   

 
function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchText));
    generateCountryCards(filteredCountries);
  }

  
  // Function to handle region filter
function handleRegionFilter(event) {
    const selectedRegion = event.target.value;
    let filteredCountries;
    if (selectedRegion) {
      filteredCountries = countries.filter(country => country.region === selectedRegion);
    } else {
      filteredCountries = countries;
    }
    generateCountryCards(filteredCountries);
  }
  // Add event listener to search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', handleSearch);

// Add event listener to region select dropdown
const regionSelect = document.getElementById('region-select');
regionSelect.addEventListener('change', handleRegionFilter);


  let countries = [];
  // Fetch all countries from the API
fetch('https://restcountries.com/v3.1/all')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  countries = data;
  generateCountryCards(countries);
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});
  
 
 