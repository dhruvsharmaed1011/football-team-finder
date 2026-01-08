const teamsData = [
    // Premier League
    { name: "Manchester United", league: "Premier League", standing: 6, players: ["Harry Maguire", "Bruno", "Casemiro","Mason Mount","Benjamin Šeško","Matheus Cunha","Amad","Lisandro Martínez","Matthijs de Ligt"] },
    { name: "Liverpool", league: "Premier League", standing: 4, players: ["Salah", "Van Dijk", "Alisson","Florian Wirtz","Alexander Isak","Ekitike","Szoboszlai","Federico Chiesa","Cody Gakpo"]},
    { name: "Man City", league: "Premier League", standing: 2, players: ["Haaland", "Doku", "Donnaruma","Rayan Cherki","Rodri","Phil Foden","Omar Marmoush","Savinho"] },

    // La Liga
    { name: "Barcelona", league: "La Liga", standing: 1, players: ["Lewandowski", "Pedri", "Lamine Yamal","Rashford","Raphinha","Joan García","Roony","Fermín López","Ferran Torres"] },
    { name: "Real Madrid", league: "La Liga", standing: 2, players: ["Bellingham", "Mbappe", "Vinicius","Arda Güler","Rodrygo","Gonzalo García","Álvaro Carreras","Dean Huijsen"] },
    { name: "Atlético de Madrid", league: "La Liga", standing: 4, players: ["Julián Alvarez", "Antoine Griezmann", "Alexander Sørloth","Giuliano Simeone","Thiago Almada","Koke","Oblak"] },

    // Serie A
    { name: "Inter Milan", league: "Serie A", standing: 1, players: ["Lautaro Martinez", "Dimarco", "Dumfries"] },
    { name: "AC Milan", league: "Serie A", standing: 2, players: ["Rafael Leao", "Pulisic", "Luka Modrić"] },
    { name: "Napoli", league: "Serie A", standing: 3, players: ["Kevin De Bruyne", "Rasmus Højlund", "Lukaku"] },

    // Bundesliga
    { name: "Bayern Munich", league: "Bundesliga", standing: 1, players: ["Manuel Neuer", "Kane", "Musiala"] },
    { name: "Borussia Dortmund", league: "Bundesliga", standing: 2, players: ["J.Bellingham", "Serhou Guirassy", "Karim Adeyemi"] },
    { name: "Bayer Leverkusen", league: "Bundesliga", standing: 3, players: ["Lucas Vázquez", "Flick", "Diaby"] },

    //
];


const teamsDiv = document.getElementById("teams");
const modal = document.getElementById("modal");


function displayTeams() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const leagueFilter = document.getElementById("leagueFilter").value;
    const fav = localStorage.getItem("favouriteTeam");

    teamsDiv.innerHTML = "";

    teamsData
        // Search filter (only if text exists)
        .filter(team =>
            searchText === "" || team.name.toLowerCase().includes(searchText)
        )
        // League filter
        .filter(team =>
            leagueFilter === "all" || team.league === leagueFilter
        )
        // Best → Worst
        .sort((a, b) => a.standing - b.standing)
        .forEach(team => {
            const card = document.createElement("div");
            card.className = "team-card";

            if (fav === team.name) {
                card.classList.add("favourite");
            }

            card.innerHTML = `
                <h3>${team.name}</h3>
                <p>${team.league}</p>
                <p>Standing: ${team.standing}</p>
            `;

            card.onclick = () => showDetails(team);
            teamsDiv.appendChild(card);
        });
}
function setFavourite(teamName) {
    const fav = document.getElementById("favouriteTeam");
    fav.textContent = teamName;

    localStorage.setItem("favouriteTeam", teamName);
}

function showDetails(team) {
    modal.style.display = "block";
    document.getElementById("teamName").innerText = team.name;
    document.getElementById("teamLeague").innerText = team.league;
    document.getElementById("teamStanding").innerText = team.standing;

    const playersList = document.getElementById("players");
    playersList.innerHTML = "";
    team.players.forEach(p => {
        const li = document.createElement("li");
        li.innerText = p;
        playersList.appendChild(li);
    });

    document.getElementById("favBtn").onclick = () => {
        localStorage.setItem("favouriteTeam", team.name);
        showFavouriteTeam();
        alert(team.name + " saved as favourite!");
    };
}

document.getElementById("close").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("leagueFilter").onchange = (e) => {
    displayTeams(e.target.value);
};

displayTeams();
function showFavouriteTeam() {
    const fav = localStorage.getItem("favouriteTeam");
    const favDisplay = document.getElementById("favouriteTeam");

    if (fav) {
        favDisplay.innerText = fav;
    } else {
        favDisplay.innerText = "No favourite selected";
    }


}

document.getElementById("searchInput")
    .addEventListener("input", () => {
        hasSearched = true;
        const filter = document.getElementById("leagueFilter").value;
        displayTeams(filter);
    });

document.getElementById("leagueFilter")
    .addEventListener("change", (e) => {
        hasSearched = true;
        displayTeams(e.target.value);
    });

showFavouriteTeam();
displayTeams();

document.getElementById("searchInput").addEventListener("input", displayTeams);
document.getElementById("leagueFilter").addEventListener("change", displayTeams);


