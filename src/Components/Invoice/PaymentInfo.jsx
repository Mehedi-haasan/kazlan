import React from 'react'

const PaymentInfo = ({info}) => {
    return (
        <div className='grid grid-cols-2 my-5'>

            <div>
                <div className=''>
                    <h1 className='font-semibold text-xl'>NOTE</h1>
                    <h1 className=''>{info?.note}</h1>
                </div>
            </div>
            <div className='text-end'>
                <h1 className='font-bold text-xl uppercase'>Payment Information</h1>
                <h1 className='font-semibold text-md'>{info?.name}</h1>
                <h1 className='font-semibold text-md'>{info?.state}</h1>
                <h1 className='font-semibold text-md'>{info?.address}</h1>
            </div>
        </div>
    )
}

export default PaymentInfo
