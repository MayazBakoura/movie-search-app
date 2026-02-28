const fetchdata = async (searchTerm) =>{

    const response = await axios.get('http://www.omdbapi.com/' , {
        params :{
            apikey:'f59670b4',
            s: searchTerm
        }
    });

if(response.data.Error){
    return [];
}


    return response.data.Search;
};



const   root = document.querySelector('.autocomplete');
root.innerHTML=`
    <label><b>Search For a Movie</b></label>
    <input class ="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content result"></div>
        </div>
    </div>


`;



const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper =  document.querySelector(".result");



const  onInput = async event => {

const movies = await fetchdata(event.target.value);

if(!movies.length){
    dropdown.classList.remove('is-active');
return;
}

resultsWrapper.innerHTML="";

dropdown.classList.add('is-active');


for (let movie of movies) {
    const option = document.createElement('a');


    option.classList.add('dropdown-item');

    // define imgSrc first
    const imgSrc = movie.Poster === 'N/A' ? "" : movie.Poster;

    // set innerHTML once, with onerror
    option.innerHTML = `
      <img src="${imgSrc}" onerror="this.style.display='none'" />
      ${movie.Title}
    `;

    resultsWrapper.appendChild(option);
}



};

input.addEventListener('input' , debounce(onInput,500));


document.addEventListener('click' , event =>{
if(!root.contains(event.target)){
dropdown.classList.remove('is-active');
}
});