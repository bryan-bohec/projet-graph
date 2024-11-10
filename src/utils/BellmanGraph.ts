import { MatriceAdjacence } from "./lectureGraph";


export function bellmanFord(
    matrice: MatriceAdjacence, 
    depart: number
): { distances: number[], predecesseurs: (number | null)[] } {
    const nbSommets = matrice.length;
    const distances = new Array(nbSommets).fill(Infinity);
    const predecesseurs = new Array(nbSommets).fill(null);
    
    //Initialisation
    distances[depart] = 0;

    //Déroulement
    for (let i = 0; i < nbSommets - 1; i++) {
        for (let source = 0; source < nbSommets; source++) {
            for (let destination = 0; destination < nbSommets; destination++) {
                if (matrice[source][destination] !== Infinity) {
                    const nouvelleDist = distances[source] + matrice[source][destination];
                    if (nouvelleDist < distances[destination]) {
                        distances[destination] = nouvelleDist;
                        predecesseurs[destination] = source;
                    }
                }
            }
        }
    }

    return { distances, predecesseurs };
}

export function reconstruireChemin(predecesseurs: (number | null)[], depart: number, arrivee: number): number[] {
    const chemin: number[] = [];
    let courant : number | null = arrivee;

    while (courant !== null && courant !== depart) {
        chemin.unshift(courant);
        courant = predecesseurs[courant];
    }

    if (courant === depart) {
        chemin.unshift(depart);
        return chemin;
    }

    return []; // Retourne un tableau vide si aucun chemin n'est trouvé
}