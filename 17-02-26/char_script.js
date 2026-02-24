const urlParams = new URLSearchParams(window.location.search);
window.onload = generateDetails;

const page = urlParams.get("page") || 1;
document.getElementById('header').innerHTML=`
    <a href="index.html?page=${page}"><img src="./assets/left-arrow.png" class="h-8 md:h-12 lg:h-15"></a>
    <a href="index.html?page=${page}" class="text-2xl md:text-3xl lg:text-4xl pt-1">HOME</a>`

async function generateDetails(){
    const name = urlParams.get('name');
    const image = document.getElementById('main-image');
    const details = document.getElementById('main-details');
    const data = await fetch_details_ByName(name);

    image.src=data.sprites.other.home.front_default;

    const types=data.types.map(t=>`<span class="p-1 bg-orange-300 rounded">${t.type.name}</span>`).join(" ");

    const abilities=data.abilities.map(a=>`<span class="rounded p-1 bg-amber-300">${a.ability.name}</span>`).join(" ");

    const stats=data.stats.map(stat=>`
        <div class="mb-2">
            <p>${stat.stat.name} : ${stat.base_stat}</p>
            <div class="w-full bg-gray-300 rounded">
                <div class="bg-blue-500 h-3 rounded" style="width:${(stat.base_stat/200)*100}%"></div>
            </div>
        </div>
    `).join("");

    const moves=data.moves.slice(0,6).map(m=>m.move.name).join(", ");

    details.innerHTML = `
        <h2 class="text-4xl font-bold flex justify-between pb-2">
            <p>${data.name.toUpperCase()}</p>
            <p>#${data.id}</p>
        </h2>

        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>

        <div class="mt-3">
            <strong>Types:</strong> ${types}
        </div>

        <p class="mt-3"><strong>Abilities:</strong> ${abilities}</p>

        <div class="mt-5">
            <h3 class="text-2xl font-semibold">Base Stats</h3>
            ${stats}
        </div>

        <p class="mt-5"><strong>Moves:</strong> ${moves}</p>
    `;
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