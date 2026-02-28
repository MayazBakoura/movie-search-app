const createAutoComplete = ({root}) => {



root.innerHTML=`
    <label><b>Search For a Movie</b></label>
    <input class ="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content result"></div>
        </div>
    </div>


`;



const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper =  root.querySelector(".result");



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


 option.addEventListener('click' , ()=>{
 dropdown.classList.remove('is-active');
input.value= movie.Title;
 onMovieSelect(movie);

 

 });

    resultsWrapper.appendChild(option);
}



};

input.addEventListener('input' , debounce(onInput,500));


document.addEventListener('click' , event =>{
if(!root.contains(event.target)){
dropdown.classList.remove('is-active');
}
});

};