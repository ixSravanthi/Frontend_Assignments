const urlParams = new URLSearchParams(window.location.search);
window.onload = generateDetails;

async function generateDetails(){
    const name=urlParams.get('name'); 
    const image=document.getElementById('main-image');
    const details=document.getElementById('main-details');
    const fullData=await fetch_details_ByName(name);
    image.src=fullData.sprites.other.home.front_default;
    details.innerHTML=`
        <h2 class="text-4xl font-bold">
            ${fullData.name.toUpperCase()}
        </h2>
        <br>
        <p><strong>ID:</strong> #${fullData.id}</p>
        <p><strong>Height:</strong> ${fullData.height}</p>
        <p><strong>Weight:</strong> ${fullData.weight}</p>

        <p><strong>Types:</strong>
            ${fullData.types
                .map(t => t.type.name)
                .join(", ")}
        </p>

        <p><strong>Abilities:</strong>
            ${fullData.abilities
                .map(a => a.ability.name)
                .join(", ")}
        </p>
`
}

async function fetch_details_ByName(name){
    try{
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data=await response.json();
        return data
    }
    catch(error){
        console.log("ERROR---> in fetch_details_ByName");
        console.log(error);
        return {}
    }
}