const limit=20;
const total_page=52;

const params = new URLSearchParams(window.location.search);

let current_page =
    parseInt(params.get("page")) || 1;

const input = document.getElementById("pokemon-name");
input.addEventListener("input", showSuggestions);

document.getElementById('search').onclick=()=>searchPokemon(document.getElementById('pokemon-name').value),current_page;

let pokemonList = [];

async function loadPokemonNames(){
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1300"
    );

    const data = await res.json();
    pokemonList = data.results;
}

window.onload = async () => {
    await loadPokemonNames();
    generateCards(current_page);
};

async function fetch_details_ByName(){
    try{
        let pokemon_name=document.getElementById('pokemon-name').value.toLowerCase();
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
        const data=await response.json();
        return data
    }
    catch(error){
        console.log("ERROR---> in fetch_details_ByName");
        console.log(error);
        return {}
    }
}

async function fetch_details_ById(a){
    try{
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${a}`);
        return await  response.json();
    }
    catch(error){
        console.log("ERROR---> in fetch_details_ById");
        console.log(error);
        return {}
    }
}

async function generateCards(page){
    try{
        const s=((page-1)*limit)+1;
        const e=s+limit;
        current_page=page;
        updateURL(page);

        const container=document.getElementById('container');
        container.innerHTML=""

        for(let i=s;i<e;i++){
            const details=await fetch_details_ById(i);
            if(!details || !details.sprites){
                generatePagenation();
                return;
            }
            const myCard=document.createElement("div");

            myCard.addEventListener("click", () => {
                searchPokemon(details.name,current_page);
            });
            myCard.innerHTML=`
            <div class="h-70 w-50 border m-10 rounded-xl bg-blue-400">
                <div class="bg-fuchsia-200 h-69 w-50 rounded-full">
                    <img src=${details.sprites.other.home.front_default} id="pokemon-image">
                    <div class="flex flex-col items-center text-2xl">
                        <p id="name">${details.name}</p>
                        <p id="id" class="text-gray-500">#${details.id}</p>
                    </div>
                </div> 
            </div>`
            container.append(myCard);
        }
        generatePagenation();
    }
    catch(error){
        console.log("ERROR---> in generateCards");
        console.log(error);
        return {}
    }
}

function generatePagenation(){
    const pagenation=document.getElementById('pagenation');
    pagenation.innerHTML='';
    const start=Math.max(1,current_page-2);
    const end=Math.min(current_page+2,total_page);

    const prev_button=document.createElement('button');
    prev_button.textContent='<< previous';
    prev_button.onclick=()=>generateCards(current_page-1);
    prev_button.className='border rounded-sm p-0.5 bg-gray-300 hover:bg-white';
    if(current_page===1){
        prev_button.classList.add("hidden");
    }
    pagenation.append(prev_button);

    for(let j=start;j<=end;j++){
        const b=document.createElement('button');
        b.textContent=j;
        b.onclick=()=>generateCards(j);
        b.className="border rounded-sm px-2 bg-gray-300 hover:bg-white";
        pagenation.append(b);
    }

    const next_button=document.createElement('button');
    next_button.textContent='next >>';
    next_button.onclick=()=>generateCards(current_page+1);
    next_button.className="border rounded-sm p-0.5 bg-gray-300 hover:bg-white";
    if(current_page===52){
        next_button.classList.add("hidden");
    }
    pagenation.append(next_button);
}


function showSuggestions(){

    const value = input.value.toLowerCase();
    const box = document.getElementById("suggestions");

    box.innerHTML = "";

    if(value.length === 0){
        box.classList.add("hidden");
        return;
    }

    const matches = pokemonList
        .filter(p => p.name.startsWith(value))
        .slice(0,5);

    matches.forEach(pokemon => {

        const item = document.createElement("div");

        item.textContent = pokemon.name;
        item.className =
        "p-2 cursor-pointer hover:bg-gray-200 w-100";

        item.onclick = () => {
            input.value = pokemon.name;
            box.classList.add("hidden");
            fetch_card();
        };

        box.append(item);
    });

    box.classList.remove("hidden");
}

document.addEventListener("click",(e)=>{
    if(!e.target.closest("#pokemon-name")){
        document
          .getElementById("suggestions")
          .classList.add("hidden");
    }
});

function searchPokemon(name,page){
    window.location.href =
        `character.html?name=${name}&page=${page}`;
}
 
function updateURL(page){
    const url =
        `${window.location.pathname}?page=${page}`;

    window.history.pushState({}, "", url);
}