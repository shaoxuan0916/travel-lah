import React, { useEffect, useState } from 'react'
import { getPlacesData } from './api'

import Header from './Components/Header'
import List from './Components/List'
import Map from './Components/Map'

const App = () => {

  const [places, setPlaces] = useState([])
  const [childClick, setChildClick] = useState(null)

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [filteredPlaces, setFilteredPlaces] = useState([])

  // get location initially
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  // useEffect when rating filter is changed
  useEffect(() => {

    const filteredPlaces = places.filter((place) => place.rating >= rating)

    setFilteredPlaces(filteredPlaces)

  }, [rating])


  // useEffect when type, map are changed
  useEffect(() => {

    if(bounds.sw && bounds.ne) {

    setIsLoading(true)

    getPlacesData(type, bounds.ne, bounds.sw)
      .then((data) => {
        // console.log(data)
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }

  }, [type, bounds])

  console.log(places)
  console.log(filteredPlaces)

  return (
    <div>

      <Header setCoordinates={setCoordinates}/>

      <div className='pt-12 sm:px-8 px-4 max-w-[1440px] mx-auto grid lg:grid-cols-3 gap-8'>

        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClick={childClick}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}

        />

        <div className='lg:col-span-2'>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClick={setChildClick}

          />
        </div>

      </div>




    </div>
  )
}

export default App