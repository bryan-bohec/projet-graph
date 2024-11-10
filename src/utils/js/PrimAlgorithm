export function primAlgorithm(matrice,sommetDeDepart) {
    const nbSommets = matrice.length;
    const sommetsChoisis = Array(nbSommets).fill(false);
    sommetsChoisis[sommetDeDepart] = true; // Commencer par le premier sommet ou on peut changer pour en choisir un autre par exemple lors de l'affichage sur la map avec le clic

    let listeAretes = [];

    for (let i = 0; i < nbSommets - 1; i++) {
        let poidsMin = Infinity;
        let sommetDepart = -1;
        let sommetArrivee = -1;

        for (let u = 0; u < nbSommets; u++) {
            if (sommetsChoisis[u]) {
                for (let v = 0; v < nbSommets; v++) {
                    if (!sommetsChoisis[v] && matrice[u][v] && matrice[u][v] < poidsMin) {
                        poidsMin = matrice[u][v];
                        sommetDepart = u;
                        sommetArrivee = v;
                    }
                }
            }
        }

        if (sommetDepart !== -1 && sommetArrivee !== -1) {
            listeAretes.push({ start: sommetDepart, end: sommetArrivee, weight: poidsMin });
            sommetsChoisis[sommetArrivee] = true;
        }
    }

    return listeAretes;
}

