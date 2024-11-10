import { lireGraphe, lireSommets } from "./lectureGraph.js";
import { bellmanFord, reconstruireChemin } from "./BellmanGraph.js";
import readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const question = (query) => new Promise((resolve) => rl.question(query, resolve));


async function lireEntree(prompt, sommets) {
    let stationChoisie;
    while (true) {
        const stationDepart = await question(prompt);
        if (!stationDepart) {
            console.log("Aucune entrée fournie.");
            continue;
        }
        stationChoisie = sommets.get(stationDepart);
        if (!stationChoisie) {
            console.log("La station de départ n'est pas valide.");
            continue;
        }
        break;
    }
    return stationChoisie;
}

async function main() {
    const sommets = await lireSommets("../../../sujet/entree.txt");
    const matrice = await lireGraphe("../../../sujet/entree.txt");

    let stationChoisie = await lireEntree("Entrez le nom de la station de départ: ", sommets);
    let stationArrivee = await lireEntree("Entrez le nom de la station d'arrivée: ", sommets);
    console.log(stationChoisie.id)
    const {predecesseurs, distances} = bellmanFord(matrice, stationChoisie.id);
    const chemin = reconstruireChemin(predecesseurs, stationChoisie.id, stationArrivee.id);
    


    console.log("Vous êtes à " + stationChoisie.nom);
    let ligne = stationChoisie.numLigne;
    console.log("Prenez la ligne " + ligne);
    
    chemin.forEach((station) => {
        if(sommets.get(station).numLigne != ligne) {
            console.log(sommets.get(station).numLigne);
            ligne = sommets.get(station).numLigne;
        }
    });

    rl.close();
}

// Execute main program
main().catch(console.error); 