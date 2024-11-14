import { lireGraphe, lireSommets } from "./lectureGraph.js";
import { bellmanFord, reconstruireChemin } from "./BellmanGraph.js";
import { primAlgorithm } from "./PrimAlgorithm.js";
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

        const demandeLigne = `Plusieurs stations "${stationDepart}" existent, veuillez choisir la ligne [${numLignes}] voulue :`;
        const ligne = await question(demandeLigne)

        const stationReponse = stationsArrivées.find(station => station.numLigne === ligne)
        if(!stationReponse){
            console.log("La ligne n'est pas valide.");
            continue;
        }

        return stationReponse;
    }
}

function getTemps(duree) {
    const hrs = ~~(duree / 3600);
    const mins = ~~((duree % 3600) / 60);
    const secs = ~~duree % 60;
  
    let temps = "";
  
    if (hrs > 0) {
        temps += "" + hrs + "h " + (mins < 10 ? "0" : "");
    }
  
    temps += "" + mins + "min " + (secs < 10 ? "0" : "");
    temps += "" + secs + "s";
  
    return temps;
  }

function getDirection(depart,arrivee,sommets,matrice) {

    const stationsLigne = []

    for(const [k,v] of sommets){
        if (v.numLigne === depart.numLigne){
            stationsLigne.push(sommets.get(k))
        }
    }
    const chemins = getCheminsMemeLigne([depart],depart,stationsLigne,matrice);
    const cheminsTraites = [];

    chemins.forEach(chemin => {
        const terminus = chemin.filter(station => (station.estTerminus && station !== depart))
        if(terminus.length > 1){
            const chemin1 = chemin.slice(0,chemin.indexOf(terminus[0])+1)
            const chemin2 = chemin.slice(chemin.indexOf(terminus[0])+1)
            cheminsTraites.push(chemin1);
            cheminsTraites.push(chemin2);
        }
        else {
            cheminsTraites.push(chemin);
        }
    })

    const bonChemins = cheminsTraites.filter(chemin => chemin.includes(arrivee))

    const terminus = bonChemins.map(chemin => chemin.find(station => (station.estTerminus && station !== depart)))

    const direction = terminus.map(terminus => terminus.nom)
    const res = [...new Set(direction)];
    return res.join(' / ');
}

function getCheminsMemeLigne(chemin,depart,stations,matrice){
    return stations.map(destination => {
        if (matrice[depart.id][destination.id] !== Infinity && !(chemin.includes(destination))) {
            const newChemin = chemin.slice();
            newChemin.push(destination);
            if(destination.estTerminus){
                return newChemin;
            }
            return getCheminsMemeLigne(newChemin,destination,stations,matrice).flat();
        }
    }).filter(res => res !== undefined)
}

async function main() {
    const sommets = await lireSommets("../../../sujet/entree.txt");
    const matrice = await lireGraphe("../../../sujet/entree.txt");
    const acm = primAlgorithm(matrice,0);
    //console.dir(acm, {'maxArrayLength': null})

    let stationChoisie = await lireEntree(`Entrez le nom de la station de départ: `, sommets);
    let stationArrivee = await lireEntree(`Entrez le nom de la station d'arrivée: `, sommets);
    //console.log(stationChoisie.id)
    const {predecesseurs, distances} = bellmanFord(matrice, stationChoisie.id);
    const chemin = reconstruireChemin(predecesseurs, stationChoisie.id, stationArrivee.id);

    console.log(`Vous êtes à ${stationChoisie.nom}.`);
    let premierChangement = true;
    let departLigne = stationChoisie;

    for(let i = 1; i < chemin.length; i++){
        console.log(sommets.get(chemin[i]));
        if(sommets.get(chemin[i]).numLigne != sommets.get(chemin[i-1]).numLigne) {
            const direction = " direction " + getDirection(departLigne, sommets.get(chemin[i-1]),sommets,matrice);
            if(premierChangement){
                console.log(`Prenez la ligne ${sommets.get(chemin[i-1]).numLigne}${direction}.`);
                premierChangement = false;
            }
            else{
                console.log(`A ${departLigne.nom}, changez et prenez la ligne ${departLigne.numLigne}${direction}.`);
            }
            departLigne = sommets.get(chemin[i]);
        }
        else if(!chemin[i+1]){
            console.log("test")
            const direction = " direction " + getDirection(departLigne, sommets.get(chemin[i]),sommets,matrice);
            if(premierChangement){
                console.log(`Prenez la ligne ${sommets.get(chemin[i]).numLigne}${direction}.`);
                premierChangement = false;
            }
            else{
                console.log(`A ${departLigne.nom}, changez et prenez la ligne ${departLigne.numLigne}${direction}.`);
            }
        }
    }

    console.log(`Vous devriez arriver à ${stationArrivee.nom} dans environ ${getTemps(distances[stationArrivee.id])}.`);

    const detailsReponse = await question(`Souhaitez-vous avoir plus de détails sur ce trajet ? (oui/non)`);
    if (detailsReponse===`oui`) {
        console.log(`Trajet entier :`);
        chemin.forEach(element => {
            console.log(`Station ${sommets.get(element).nom} sur la ligne ${sommets.get(element).numLigne} - Temps estimé de ${getTemps(distances[sommets.get(element).id])}`);
        });
    }

    rl.close();
}

// Execute main program
main().catch(console.error); 