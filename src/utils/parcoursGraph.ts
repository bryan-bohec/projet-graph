type MatriceAdjacence = number[][]

export const parcoursGraph = (matriceAdjacence: MatriceAdjacence, noeud: number, noeudsVisites: number[]
) => {
    noeudsVisites[noeud] = 1;

    for (let i = 0; i < matriceAdjacence[noeud].length; i++) {
        if (matriceAdjacence[noeud][i] !== Infinity && noeudsVisites[i] === 0) {
            parcoursGraph(matriceAdjacence, i, noeudsVisites);
        }
    }

}

export const getNoeudsVisites = (matriceAdjacence: MatriceAdjacence) => {
    let noeudsVisites: number[] = new Array(matriceAdjacence.length).fill(0);
    let noeudDepart = 0;
    parcoursGraph(matriceAdjacence, noeudDepart, noeudsVisites);
    return noeudsVisites;
}

