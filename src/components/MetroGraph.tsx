import React, { useState, useEffect } from 'react';
import { lireGraphe } from '../utils/lectureGraph';
import MatriceAdjacenceView from './MatriceAdjacenceView';
import { getNoeudsVisites } from '../utils/parcoursGraph';
import { bellmanFord, reconstruireChemin } from '../utils/BellmanGraph';
import Carte from './Carte';
import PointsCanvas from './PointsCanvas';

const MetroGraph: React.FC = () => {
  const [matrice, setMatrice] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noeudsVisites, setNoeudsVisites] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await lireGraphe('../../sujet/entree.txt');
        setMatrice(data);
        setLoading(false);

        setNoeudsVisites(getNoeudsVisites(data));

        const { distances, predecesseurs } = bellmanFord(data, 48);
        const chemin = reconstruireChemin(predecesseurs, 48, 365);
        // console.log(predecesseurs)
        // console.log(chemin)

      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div id='map'>
    </div>
    <Carte />
    {/* <PointsCanvas/> */}
    </>
      

  );
};

      {/* <h1>Graphe du Métro</h1>
      <MatriceAdjacenceView matrice={matrice} />
      <p>Noeuds visités : {noeudsVisites.map((noeud, index) => (
        <div>
          <span>{index}   </span>
          <span>visité : {noeud === 1 ? 'Oui' : 'Non'}</span>
        </div>
      ))}</p> */}

export default MetroGraph;
