export const parcoursGraph = (matriceAdjacence, noeud, noeudsVisites) => {
    noeudsVisites[noeud] = 1;

    for (let i = 0; i < matriceAdjacence[noeud].length; i++) {
        if (matriceAdjacence[noeud][i] !== Infinity && noeudsVisites[i] === 0) {
            parcoursGraph(matriceAdjacence, i, noeudsVisites);
        }
    }
}

export const getNoeudsVisites = (matriceAdjacence) => {
    let noeudsVisites = new Array(matriceAdjacence.length).fill(0);
    let noeudDepart = 0;
    parcoursGraph(matriceAdjacence, noeudDepart, noeudsVisites);
    return noeudsVisites;
} 