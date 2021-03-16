import React, { useState } from 'react';
import './card.scss'

export default function Card({
    title = 'Unknown',
    imageSrc = 'https://via.placeholder.com/172x252',
    rating = 0,
}) {
    return (
        <div className='card'>
            <img className='card__image' src={imageSrc} alt={title} />
                <div className='card__content'>
                    <h1 className='card__title'>{title}</h1>
                </div>
        </div>
    );
}

