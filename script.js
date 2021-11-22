let submit = document.getElementById("form")

async function getPokemons() {
    try {
        for (let i = 1; i <= 6; i++) {
            let num_rand = Math.floor(Math.random() * 898 + 1);   
            let respond = await fetch(`https://pokeapi.co/api/v2/pokemon/${num_rand}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let data = await respond.json();
            let img = data.sprites.front_default;
            let id = data.id;
            let name = data.name;
            let types = data.types.map(element => element.type.name );
            let abilities = data.abilities.map(element => element.ability.name)
            modelPokemon(img,id,name,types,abilities);
        }
    } catch (error) {
        console.log(error);
    }
}

submit.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let pokemon = document.getElementById("search").value
    document.getElementById("search").value = "";
    console.log(pokemon)
    try {
        let respond = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let data = await respond.json();
            let img = data.sprites.front_default;
            let id = data.id;
            let name = data.name;
            let types = data.types.map(element => element.type.name );
            let abilities = data.abilities.map(element => element.ability.name)
            clearModelPokemon()
            modelPokemon(img,id,name,types,abilities);
    } catch (error) {
        console.log(error);
    }
})

function clearModelPokemon(){
    document.getElementById("pokemon").innerHTML = ""; 
}

function modelPokemon(img,id,name,types,abilities){
    document.getElementById("pokemon").innerHTML += `
            <div class="container">
                <div class="description">
                    <p>
                        ${name} 
                        <br>
                        ${types}
                        <br>
                        ${abilities}
                    </p>
                </div>
                <div class="sprite">
                    <p id="id">
                        #${id}
                    </p>
                    <img src=${img}>                
                </div>
            </div       
            `; 
}