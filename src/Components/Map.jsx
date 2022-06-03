import React from 'react'
import mapStyles from './mapStyles'

import GoogleMapReact from 'google-map-react'

import { useMediaQuery, Rating } from '@mui/material'
import { MdLocationOn } from 'react-icons/md'


const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClick }) => {

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <div className='w-full h-[85vh]'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setChildClick(child) }
            >

                {places?.map((place, index) => (
                    <div
                        key={index}
                        className=''
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                    >
                        {
                            !matches

                                ?

                                <MdLocationOn className='text-[#18465a] text-2xl' />

                                :

                                <div className='w-[120px] p-2 bg-slate-50 rounded-md absolute hover:z-10 hover:shadow-2xl hover:scale-[150%]'>
                                    <img
                                        className='w-full h-[100px] object-cover rounded-t-md cursor-pointer'
                                        src={place.photo ? place.photo.images.small.url : 'https://source.unsplash.com/sG-PR0BNwb4'}
                                        alt={place.name}
                                    />
                                    <h3 className='py-2 text-md'>{place.name}</h3>
                                    <Rating size='small' value={Number(place.rating)} readOnly/>
                                </div>


                        }

                    </div>
                ))}

            </GoogleMapReact>




        </div>
    )
}

export default Map