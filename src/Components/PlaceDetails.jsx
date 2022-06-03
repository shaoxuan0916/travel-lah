import React from 'react'

import { Rating, CircularProgress } from '@mui/material'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { SiTripadvisor } from 'react-icons/si'
import { MdOutlineWeb } from 'react-icons/md'

const PlaceDetails = ({ place, selected, refProp }) => {

    if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block:'start' });


    return (
        <div className='p-4 my-2 shadow-lg rounded-xl'>

            <img
                className='w-full h-[350px] sm:h-[500px] lg:h-[300px] object-cover rounded-md'
                src={place.photo ? place.photo.images.large.url : 'https://source.unsplash.com/sG-PR0BNwb4'}
                alt={place.name}
            />

            <h2 className='py-2 text-xl font-bold text-[#65403a]'>{place.name}</h2>

            <div className='flex justify-between py-2 border-b-2 border-slate-500/20'>
                <p>Price</p>
                <p className='pl-12 text-gray-500'>{place.price ? place.price_level : 'N/A'}</p>
            </div>

            <div className='flex justify-between py-2 border-b-2 border-slate-500/20'>
                <p>Rating</p>
                <div className=''>
                <Rating size='small' readOnly value={Number(place.rating)}/>
                <span className='text-gray-500 pl-2'>({place.num_reviews ? place.num_reviews : '0'})</span>
                </div>
            </div>

            <div className='flex justify-between py-2 border-b-2 border-slate-500/20'>
                <p>Ranking</p>
                <p className='pl-12 text-right text-gray-500'>{place.ranking ? place.ranking : 'N/A'}</p>
            </div>

            <div className='flex justify-between py-2 border-b-2 border-slate-500/20'>
                <p>Location</p>
                <p className='pl-12 text-right text-sm text-gray-500'>{place.address ? place.address : 'N/A'}</p>
            </div>

            <div className='flex justify-between py-2 border-b-2 border-slate-500/20'>
                <BsFillTelephoneFill size={12} className='text-gray-800' />
                <p className='pl-12 text-right text-sm text-gray-500'>{place.phone ? place.phone : 'N/A'}</p>
            </div>

            <div className='flex py-3 gap-4 border-b-2 border-slate-500/20'>
                <SiTripadvisor className='cursor-pointer hover:text-teal-500' size={20} onClick={() => { window.open(place.web_url, '_blank') }} />
                <MdOutlineWeb className='cursor-pointer hover:text-teal-500' size={20} onClick={() => { window.open(place.website, '_blank') }} />
            </div>

            <div className='flex flex-wrap py-2'>
                {place?.cuisine?.map((cuisine) => (
                    <p className='px-4 py-1 mx-1 my-2 bg-gray-200 rounded-2xl'>{cuisine.name}</p>
                ))}
            </div>




        </div>
    )
}

export default PlaceDetails