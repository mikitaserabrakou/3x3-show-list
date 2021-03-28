import react from 'react';
import './AddButton.scss';

export default function AddButton() {

    const handleMouseClick = () => {
        console.log('clicked');
    }

    return(
        <button className="add_button" onClick={handleMouseClick}></button>
    )
}