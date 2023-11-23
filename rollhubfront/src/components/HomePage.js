import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import styled from "styled-components";
import {SpotService} from "../services/spot.service";
import LoaderDouble from "./LoaderDouble";
import {Icon} from "leaflet/src/layer";
import logo from "../images/RollHubMini-transparent.svg"
import {useSelector} from "react-redux";

const HomePage = () => {
    const [spots, setSpots] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [test, setTest]= useState([])
    const [openToAdd, setOpenToAdd] = useState(false)
    const [NewSpot, setNewSpot] = useState()
    const currUser = useSelector(state => state.theme.currUser)

    const rollHubMarkers = new Icon({
        iconUrl: logo,
        iconSize:[20,20]
    })

    const loadAllSpots = () => {
        let data;
        SpotService.getAllSpots()
            .then(res => {
                data = res.data
                setSpots(data)
                setIsLoading(false)
                setTest(data.map(d => {
                    return {
                        geocode: [d.latitude, d.longitude],
                        popUp: d.name
                    }
                }))
            })
            .catch(err => {setError(err.message)} )
    }

    const handleMapClick = (e) => {
        if(openToAdd){
            const newMarker = {
                geocode: [e.latlng.lat, e.latlng.lng],
            };

            setNewSpot(newMarker)
        }
    };
    const ClickHandler = ({ handleMapClick }) => {
        const map = useMapEvents({
            click: (e) => {
                handleMapClick(e);
            },
        });
    }

    const handleOpenToAdd = () => {
        setOpenToAdd(true);
    }

    const addNewsSpot = (data) => {
        setIsLoading(true)
        SpotService.addSpot(data)
            .then(res =>{
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }
    function secureInput(input) {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setNewSpot({
            geocode:[...NewSpot.geocode],
        })
        setTest([...test, NewSpot])
        let spot = {
            name: secureInput(e.target.spotName.value),
            latitude: NewSpot.geocode[0],
            longitude: NewSpot.geocode[1],
            author: currUser.id
        }
        addNewsSpot(spot)

        setOpenToAdd(false)
    }


    useEffect(() => {
        loadAllSpots()
    }, [isLoading]);

    return (
        <>
            {
                isLoading ?
                    <LoaderDouble/>
                    :
                    <Home>
                        <h2>Bienvenue sur Rollhub</h2>
                        <p>Retrouver ici les meilleurs spots pour rouler !</p>
                        <AddSpotButton onClick={() => {setOpenToAdd(!openToAdd)}}> Ajouter un Spot !</AddSpotButton>
                        {
                            openToAdd &&
                            <AddSpotFormContainer>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <label htmlFor="spotName">Nom du spot</label>
                                    <input name="spotName" type="text" placeholder="Nom du spot"/>
                                </form>
                            </AddSpotFormContainer>
                        }
                        <Container>
                            <MapContainer center={[45.757628,4.832225]} zoom={11} className="map-rollhub">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <ClickHandler handleMapClick={handleMapClick} />
                                {
                                    test.map(marker => {
                                        return <Marker position={marker.geocode} icon={rollHubMarkers} >
                                            <Popup>
                                                <p> {marker.popUp} </p>
                                            </Popup>
                                        </Marker>
                                    })
                                }
                                {
                                    NewSpot &&
                                    <Marker position={NewSpot.geocode} icon={rollHubMarkers}>

                                    </Marker>
                                }
                            </MapContainer>
                        </Container>
                    </Home>
            }
        </>
    )
}
const Home = styled.div`
  .map-rollhub{
    height: 60vh;
    width: 60vw;
    margin: auto;
    box-shadow: 1px 3px 12px 3px rgba(0,0,0,0.3);
  }
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const AddSpotButton =  styled.button`
  max-width: 10rem;
  align-self: center;
  border: none;
  padding: 1rem;
  background-color: #282c34;
  color: white;
`

const AddSpotFormContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  form{
    display: flex;
    flex-direction: column;
  }
  input{
    padding: 0.4rem;
  }
`

const Container = styled.section`
    padding: 2rem;
`
export default HomePage