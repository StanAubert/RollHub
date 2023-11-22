import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import styled from "styled-components";
import {SpotService} from "../services/spot.service";
import LoaderDouble from "./LoaderDouble";
import {Icon} from "leaflet/src/layer";
import logo from "../images/RollHubMini-transparent.svg"

const HomePage = () => {
    const [spots, setSpots] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const markers = spots.map(s => {
        return {
            geocode: [s.latitude, s.longitude],
            popUp: s.name
        }
    })
    const [test, setTest]= useState(markers)

    const rollHubMarkers = new Icon({
        iconUrl: logo,
        iconSize:[20,20]
    })

    const loadAllSpots = () => {
        SpotService.getAllSpots()
            .then(res => {
                setSpots(res.data)
                setIsLoading(false)
            })
            .catch(err => {setError(err.message)} )
    }

    const handleMapClick = (e) => {
        const newMarker = {
            geocode: [e.latlng.lat, e.latlng.lng],
        };

        setTest([...test, newMarker])
    };
    const ClickHandler = ({ handleMapClick }) => {
        const map = useMapEvents({
            click: (e) => {
                handleMapClick(e);
            },
        });
    }


    useEffect(() => {
        loadAllSpots()
        console.log(test)
    }, [test]);

    return (
        <>
            {
                isLoading ?
                    <LoaderDouble/>
                    :
                    <Home>
                        <h2>Bienvenue sur Rollhub</h2>
                        <p>Retrouver ici les meilleurs spots pour rouler !</p>
                        <MapContainer center={[45.757628,4.832225]} zoom={13} className="map-rollhub">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                            />
                            <ClickHandler handleMapClick={handleMapClick} />
                            {
                                markers.map(marker => {
                                    return <Marker position={marker.geocode} icon={rollHubMarkers} >
                                        <Popup>
                                            <p> {marker.popUp} </p>
                                        </Popup>
                                    </Marker>
                                })
                            }
                        </MapContainer>
                    </Home>
            }
        </>
    )
}
const Home = styled.div`
  .map-rollhub{
    height: 60vh;
    width: 75vw;
    margin: auto;
    box-shadow: 1px 3px 12px 3px rgba(0,0,0,0.3);
  }
`
export default HomePage