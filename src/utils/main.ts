import { Sommet, lireGraphe, lireSommets } from "./lectureGraph";
type MatriceAdjacence = number[][]

export function add(a: number, b: number): number {
    return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts

const sommets: Map<number | string, Sommet> = await lireSommets("../sujet/entree.txt");
const matrice: MatriceAdjacence = await lireGraphe("../sujet/entree.txt");

let stationChoisie;
while (true) {
    const stationDepart = prompt("Entrez le nom  de la station de départ.");
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
