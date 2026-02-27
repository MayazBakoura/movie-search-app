const fetchdata = async (searchTerm) =>{

    const response = await axios.get('http://www.omdbapi.com/' , {
        params :{
            apikey:'f59670b4',
            s: searchTerm
        }
    });

    return response.data.Search;
};

const input = document.querySelector('input');





const  onInput = async event => {

const movies = await fetchdata(event.target.value);
console.log(movies);
};

input.addEventListener('input' , debounce(onInput,2000));