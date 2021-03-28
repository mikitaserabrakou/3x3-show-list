import react from 'react';
import './search_box.scss';

export default function SearchBox() {
    return(
        <input type="text" className="search_box" placeholder="Movie/show/anime name, e.g. Attack on Titan" />
    )
}