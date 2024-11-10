import React from 'react';
import { MatriceAdjacence } from '../utils/lectureGraph';
import './style.css';

interface Props {
  matrice: MatriceAdjacence;
}

const MatriceAdjacenceView: React.FC<Props> = ({ matrice }) => {
  return (
    <div className="matrice-container">
      <h2>Matrice d'Adjacence</h2>
      <div className="matrice-grid">
        {/* En-tête des colonnes */}
        <div className="header-row">
          <div className="cell header"></div>
          {matrice.map((_, index) => (
            <div key={`col-${index}`} className="cell header">
              {index}
            </div>
          ))}
        </div>

        {/* Lignes de la matrice */}
        {matrice.map((row, i) => (
          <div key={`row-${i}`} className="row">
            <div className="cell header">{i}</div>
            {row.map((value, j) => (
              <div 
                key={`${i}-${j}`} 
                className={`cell ${value === Infinity ? 'infinity' : value === 0 ? 'zero' : 'value'}`}
              >
                {value === Infinity ? '∞' : value}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MatriceAdjacenceView; 