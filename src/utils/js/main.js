import { lireGraphe, lireSommets } from "./lectureGraph.js";
import { bellmanFord, reconstruireChemin } from "./BellmanGraph.js";
import readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function lireEntree(prompt, sommets) {
    while (true) {
        const stationDepart = await question(prompt);
        if (!stationDepart) {
            console.log("Aucune entrée fournie.");
            continue;
        }

        const stationsArrivées = []

        for(const [k,v] of sommets){
            if (v.nom === stationDepart){
                stationsArrivées.push(sommets.get(k))
            }
        }

        if(stationsArrivées.length === 0){
            console.log("La station n'est pas valide.");
            continue;
        }
        if(stationsArrivées.length === 1){
            return stationsArrivées[0];
        }

        const numLignes = []
        stationsArrivées.every(station => numLignes.push(station.numLigne));

        const demandeLigne = `Plusieurs stations "${stationDepart}" existent choisir la ligne [${numLignes}] voulue :`;
        const ligne = await question(demandeLigne)

        const stationReponse = stationsArrivées.find(station => station.numLigne === ligne)
        if(!stationReponse){
            console.log("La ligne n'est pas valide.");
            continue;
        }

        return stationReponse;
    }
}

async function main() {
    const sommets = await lireSommets("../../../sujet/entree.txt");
    const matrice = await lireGraphe("../../../sujet/entree.txt");

    let stationChoisie = await lireEntree("Entrez le nom de la station de départ: ", sommets);
    let stationArrivee = await lireEntree("Entrez le nom de la station d'arrivée: ", sommets);
    console.log(stationChoisie.id)
    const {predecesseurs, distances} = bellmanFord(matrice, stationChoisie.id);
    const chemin = reconstruireChemin(predecesseurs, stationChoisie.id, stationArrivee.id);
    
    console.log(chemin);

    console.log("Vous êtes à " + stationChoisie.nom);
    let ligne = stationChoisie.numLigne;
    console.log("Prenez la ligne " + ligne);
    
    chemin.forEach((station) => {
        console.log(sommets.get(station).nom);
        if(sommets.get(station).numLigne != ligne) {
            console.log("A "+sommets.get(station).nom+", changez et prenez la ligne "+sommets.get(station).numLigne);
            ligne = sommets.get(station).numLigne;
        }
    });

    console.log(distances[stationArrivee.id])

    rl.close();
}

// Execute main program
main().catch(console.error); 