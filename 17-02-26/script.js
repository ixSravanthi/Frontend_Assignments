async function fetching(){
    try{
        let DataObject=await fetch_details();

        let pokemon_image=document.getElementById('pokemon-image');
        pokemon_image.src=DataObject.sprites.other.home.front_default;
        pokemon_image.style.display='block';
    }
    catch(error){
        console.log("ERROR---> e");
        console.log(error);
    }
}

async function fetch_details(){
    try{
        let pokemon_name=document.getElementById('pokemon-name').value.toLowerCase();
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
        const data=await response.json();
        return data
    }
    catch(error){
        console.log("This is error");
        console.log(error);
        return {}
    }
}

function generateCards(limit,offset){
    
    for(let i=offset;i<limit;i++){

    }

}