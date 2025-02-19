import React from 'react'

const UserInfo = ({ info }) => {

    function getFormattedDate() {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    return (
        <div className='grid grid-cols-2 my-5'>
            <div>
                <h1 className='font-bold text-xl uppercase'>Billed To:</h1>
                <h1 className='font-semibold text-md'>{info?.name}</h1>
                <h1>Mobile: {info?.phone}</h1>
                <h1>Address : {info?.address}</h1>
            </div>
            <div>
                <div className='text-end'>
                    <h1 className='text-lg font-semibold uppercase'>Invoice no: {info?.tran_id}</h1>
                    <h1 className='font-semibold'>{getFormattedDate()}</h1>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
