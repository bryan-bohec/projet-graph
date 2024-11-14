import React from 'react';

// Données d'exemple provenant de pospoints.txt
const positions = [
  "907;682;Château@de@Vincennes",
  "892;669;Bérault",
  "876;652;Saint-Mandé,@Tourelle",
  // ... ajoutez d'autres positions si nécessaire
];

// Dimensions de l'espace
const WIDTH = 1000; // Largeur de l'espace
const HEIGHT = 800; // Hauteur de l'espace

const PointsCanvas = () => {
  return (
    <div style={{ position: 'relative', width: WIDTH, height: HEIGHT, border: '1px solid black' }}>
      <h1 style={{ position: 'absolute', top: 10, left: 10 }}>Points sur l'Espace</h1>
      {positions.map((pos, index) => {
        const [x, y, name] = pos.split(';'); // Séparer les coordonnées et le nom
        const left = (parseInt(x)) + 'px'; // Ajuster la position X
        const top = (parseInt(y)) + 'px'; // Ajuster la position Y

        return (
          <div key={index} style={{ position: 'absolute', left: left, top: top, textAlign: 'center' }}>
            <div
              style={{
                width: '10px', // Dot width
                height: '10px', // Dot height
                backgroundColor: 'red',
                borderRadius: '50%', // Make it a circle
                margin: '0 auto', // Center the dot
              }}
            />
            <div style={{ color: 'black', fontSize: '8' }}>
              {name.replace(/@/g, ' ')} <br />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PointsCanvas; 