import { LinearProgress } from '@mui/material'
import React, { useState, useEffect, createRef } from 'react'

import PlaceDetails from './PlaceDetails'

const List = ({ places, childClick, isLoading, type, setType, rating, setRating }) => {


    const [elRefs, setElRefs] = useState([])


    useEffect(() => {

        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())

        setElRefs(refs)

    }, [places])

    return (

        <div className=''>


            {/* List title */}

            <h3 className='text-2xl text-[#18465a] font-bold pb-4'>Restaurants, Hotels & Attractions around you</h3>

            {
                isLoading

                    ?

                    
                    <div>
                        <LinearProgress  size='5rem' />
                    </div>

                    :

                    <>
                        <div className='flex gap-8'>
                            <form className='flex flex-col w-[150px]'>
                                <label>Type</label>
                                <select className='border-2 border-[#1b1c27] rounded-md my-2 px-2' value={type} onChange={(e) => { setType(e.target.value) }}>
                                    <option value='restautants'>Restaurants</option>
                                    <option value='hotels'>Hotels</option>
                                    <option value='attractions'>Attractions</option>
                                </select>
                            </form>

                            <form className='flex flex-col w-[150px]'>
                                <label>Rating</label>
                                <select className='border-2 border-[#1b1c27] rounded-md my-2 px-2' value={rating} onChange={(e) => { setRating(e.target.value) }}>
                                    <option value='0'>All Reviews</option>
                                    <option value='3'>Above 3.0</option>
                                    <option value='4'>Above 4.0</option>
                                    <option value='4.5'>Above 4.5</option>
                                </select>
                            </form>
                        </div>


                        <div className='grid mt-8 lg:max-h-[65vh] lg:overflow-y-scroll'>

                            {places?.map((place, i) => (
                                <div key={i} ref={elRefs[i]}>
                                    <PlaceDetails
                                        place={place}
                                        selected={Number(childClick) === i}
                                        refProp={elRefs[i]}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
            }



        </div>
    )
}

export default List