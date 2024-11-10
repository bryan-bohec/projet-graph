import { readFile } from 'fs/promises';

export async function lireSommets(filePath) {
    const sommets = new Map();
  
    try {
        const text = await readFile(filePath, 'utf8');
        const lines = text.split('\n');
        
        lines.forEach(line => {
            if (line.startsWith('V')) {
                const parts = line.substring(1).trim().split(' ');
                const id = parseInt(parts[0], 10);
                const nom = parts.slice(1, -3).join(' ');
                const numLigne = parts[parts.length - 3].replace(';', '');
                const estTerminus = parts[parts.length - 2].replace(';', '').toLowerCase() === 'true';
                const branche = parseInt(parts[parts.length - 1], 10);
        
                sommets.set(id, { id, nom, numLigne, estTerminus, branche });
                sommets.set(nom, { id, nom, numLigne, estTerminus, branche });
            }
        });
        
        return sommets;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

export async function lireGraphe(filePath) {
    try {
        const text = await readFile(filePath, 'utf8');
        const lines = text.split('\n');
        
        // Trouver la taille nécessaire de la matrice
        let tailleMat = 0;
        lines.forEach(line => {
            if (line.startsWith('E')) {
                const [source, destination] = line.substring(1).trim().split(' ').map(n => parseInt(n, 10));
                tailleMat = Math.max(tailleMat, source + 1, destination + 1);
            }
        });

        // Initialiser la matrice avec des infinis
        const matrice = Array(tailleMat).fill(null).map(() => 
            Array(tailleMat).fill(Infinity)
        );

        // Remplir la diagonale avec des zéros
        for (let i = 0; i < tailleMat; i++) {
            matrice[i][i] = 0;
        }

        // Remplir la matrice avec les poids
        lines.forEach(line => {
            if (line.startsWith('E')) {
                const parts = line.substring(1).trim().split(' ');
                const source = parseInt(parts[0], 10);
                const destination = parseInt(parts[1], 10);
                const poids = parseInt(parts[2], 10);

                // Graphe non orienté, donc on remplit symétriquement
                matrice[source][destination] = poids;
                matrice[destination][source] = poids;
            }
        });

        return matrice;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
} 