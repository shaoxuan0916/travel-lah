import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Autocomplete } from '@react-google-maps/api'

const Header = ( { setCoordinates } ) => {

    const [autoComplete, setAutoComplete] = useState(null)

    const onLoad = (autoC) => {
            setAutoComplete(autoC)
    }

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng })
    }

    return (
        <div className='static flex justify-between items-center h-[70px] p-4 md:px-12 shadow-xl'>

            <h1 className='text-2xl font-bold'>Travel-LAH</h1>


            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className='flex items-center '>
                    <BiSearch className='text-[#18465a] mr-2 text-xl' />
                    <input className='focus:outline-none w-[150px] py-1' placeholder='Explore new places...' />
                </div>
            </Autocomplete>






        </div>
    )
}

export default Header