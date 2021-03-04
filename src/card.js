import React, { Component } from 'react';

export default function Card({
    title = 'Unknown',
    description = 'Unknown',
    imageSrc ='https://via.placeholder.com/200x340',
    links = 'Unknown',
    rating = 0,
}) {

    return (
        <div className='card'>
            <img src={imageSrc} />
            <h1>{title}</h1>
            <h2>{description}</h2>
            <h3>{links}</h3>
            <h4>{rating}</h4>
        </div>
    );
}

