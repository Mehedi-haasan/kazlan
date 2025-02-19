import React from 'react';
import MiniButton from '../Input/MiniButton';

const ShowAttribute = ({values}) => {
    return (
        <div>
            {
                values.map((data) => {
                    return <div>
                        <h1 className='font-semibold py-1 text-start'>{data.name}</h1>
                        <div className='flex gap-2'>
                            {
                                data.value.map((va) => {
                                    return <MiniButton name={va} />
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default ShowAttribute;