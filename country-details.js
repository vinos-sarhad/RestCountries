

 
function fetchCountryDetails(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data[0];  
      });
  }
   
  function displayCountryDetails(country) {
     
    document.getElementById('country-name').textContent = country.name.common;
 
    document.getElementById('native-name').textContent = `Native Name: ${country.name.native}`;
    document.getElementById('population').textContent = `Population: ${country.population}`;
    document.getElementById('region').textContent = `Region: ${country.region}`;
    document.getElementById('sub-region').textContent = `Sub Region: ${country.subregion}`;
    document.getElementById('capital').textContent = `Capital: ${country.capital}`;
 
    document.getElementById('top-level-domain').textContent = `Top Level Domain: ${country.tld || 'N/A'}`;
    document.getElementById('currencies').textContent = `Currencies: ${country.currency || 'N/A'}`;
    document.getElementById('languages').textContent = `Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}`;
  
 
    document.getElementById('country-flag').src = country.flags.png;
  
    
    const borderCountriesContainer = document.getElementById('border-countries');
    borderCountriesContainer.innerHTML = '';  
    if (country.borders && country.borders.length > 0) {
  
      console.log(country)
      country.borders.forEach(borderCode => {
        const borderCountryLink = document.createElement('a');
        borderCountryLink.href = `detail.html?country=${borderCode}`;
        borderCountryLink.textContent = borderCode;
        borderCountryLink.addEventListener('click', function(event) {
          event.preventDefault();  
          const borderCountryName = borderCountryLink.textContent;
          fetchCountryDetails(borderCountryName)
            .then(borderCountry => {
              displayCountryDetails(borderCountry);
            })
            .catch(error => {
              console.error('There was a problem with fetching border country details:', error);
            });
        });


        // borderCountriesContainer.innerHTML=`<div class="border-2 p-2">${borderCountryLink}</div>`
        borderCountriesContainer.appendChild(borderCountryLink);
         
      const spcaeDiv=document.createElement('div')
      spcaeDiv.className='  inline p-5  '
        borderCountriesContainer.appendChild(spcaeDiv); // Add line break between links
      });
    } else {
      borderCountriesContainer.textContent = 'No border countries found.';
    }
  }
  
 
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get('country');
  
  
  fetchCountryDetails(countryName)
    .then(country => {
      displayCountryDetails(country);
    })
    .catch(error => {
      console.error('There was a problem with fetching country details:', error);
    });
  