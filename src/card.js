import {useState } from 'react';
import './card.scss';
import './AddButton';
import AddButton from './AddButton';

export default function Card({
    title = 'Unknown',
    imageSrc = '',
    rating = 0,
    state = false,
    className = 'card',
    handleOnClick,
}) {
    const [isValue, setIsValue] = useState(state);

    return (
        <div className={className}>
            {isValue ? (
            <>
            <img className='card__image' src={imageSrc} alt={title} />
                <div className='card__content'>
                    <h1 className='card__title'>{title}</h1>
                </div>
            </>) : <AddButton handleOnClick={handleOnClick}/>}
        </div>
    );
}

