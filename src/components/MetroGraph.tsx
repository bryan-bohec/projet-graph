import React, { useState, useEffect } from 'react';
import { readVertices } from '../utils/metroGraph';

const MetroGraph: React.FC = () => {
  const [sommets, setSommets] = useState<Map<number, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readVertices('../../sujet/entree.txt');
        setSommets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load metro data');
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Metro Stations</h1>
      <ul>
        {Array.from(sommets.entries()).map(([id, sommet]) => (
          <li key={id}>
            ID: {sommet.id}, Name: {sommet.nom}, Line: {sommet.numLigne}, 
            Terminus: {sommet.estTerminus.toString()}, Branch: {sommet.branche}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetroGraph;
