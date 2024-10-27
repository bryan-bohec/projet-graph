interface Sommet {
    id: number;
    nom: string;
    numLigne: string;
    estTerminus: boolean;
    branche: number;
  }
  
  export async function readVertices(filePath: string): Promise<Map<number, Sommet>> {
    const response = await fetch(filePath);
    const text = await response.text();
    const lines = text.split('\n');
    
    const sommets = new Map<number, Sommet>();
  
    lines.forEach(line => {
      if (line.startsWith('V')) {
        const parts = line.substring(1).trim().split(' ');
        const id = parseInt(parts[0], 10);
        const nom = parts.slice(1, -3).join(' ');
        const numLigne = parts[parts.length - 3].replace(';', '');
        const estTerminus = parts[parts.length - 2].replace(';', '').toLowerCase() === 'true';
        const branche = parseInt(parts[parts.length - 1], 10);
  
        sommets.set(id, { id, nom, numLigne, estTerminus, branche });
      }
    });
  
    return sommets;
  }
