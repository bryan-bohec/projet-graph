import React, { useEffect, useRef, useState } from "react";
import { ImageOverlay, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CRS } from "leaflet";
import { lireGraphe, lireGrapheArray, lireSommets, Sommet } from "../utils/lectureGraph";

const colorMapping: { [key: string]: string } = {
    "1": "red",
    "2": "blue",
    "3": "green",
    "4": "purple",
    "5": "yellow",
    "6": "orange",
    "7": "brown",
    "8": "pink",
    "9": "black",
    "10": "grey",
    "11": "cyan",
    "12": "magenta",
    "13": "lightblue",
    "14": "lightgreen",
    // Add more mappings as needed
};

const Carte = () => {
    const [sommets, setSommets] = useState<Sommet[]>([]);
    const [matrice, setMatrice] = useState<number[][]>([]);
    const [ligne1, setLigne1] = useState<Sommet[]>([]);
    

    const mapRef = useRef(null);

    var bounds = [
        [0, 0],
        [987, 952],
    ];

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            map.fitBounds(bounds);
        }
    }, [mapRef.current]);

    let test = false;

    useEffect(() => {
        if (!test) {
            const getSommets = async () => {
                const sommetsReponse = await lireGrapheArray("../../sujet/entree.txt");
                setSommets(sommetsReponse);
            };
            getSommets();

            const getMatrice = async () => {
                const matriceReponse = await lireGraphe("../../sujet/entree.txt");
                setMatrice(matriceReponse);
            };
            getMatrice();
        }

        test = true;
    }, []);


    if (matrice.length > 100 && sommets.length > 100) {

    return (
        <MapContainer center={[0, 0]} zoom={-5} ref={mapRef} crs={CRS.Simple} style={{ height: "987px", width: "952px" }}>
            <ImageOverlay url="../../sujet/metrof_r.png" bounds={bounds} />
            {sommets.map((sommet, index) => (
                <Marker key={index} position={[1000 - 35 - sommet.y, sommet.x - 3]}>
                    <Popup>
                        <div>
                            <p>{sommet.nom}</p>
                            <p>{sommet.numLigne}</p>
                            <p>{sommet.estTerminus ? "Terminus" : "Pas terminus"}</p>
                            <p>{sommet.branche}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}


        </MapContainer>
    );
  }
};

export default Carte;
