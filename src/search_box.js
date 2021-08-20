import { useState } from 'react'
import './search_box.scss'
import axios from 'axios'
import SearchResults from './SearchResults'

export default function SearchBox({ onAddShow }) {
  const [results, setResulst] = useState([])
  const [isLoaded, setIsLoadead] = useState(false)
  // const [error, setError] = useState(null)

  const fetchData = e => {
    setIsLoadead(false)
    axios
      .get(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
      .then(res => {
        if (res.data.length > 0) {
          setResulst(res.data)
          // console.log(res.data)
          setIsLoadead(true)
        } else setIsLoadead(false)
      })
      .catch(err => {
        setIsLoadead(false)
        console.log(err)
      })
  }
  return (
    <div className="search_box">
      <input
        type="text"
        className="search_bar"
        onChange={fetchData}
        placeholder="Movie/show/anime name, e.g. Attack on Titan"
      />
      {isLoaded ? (
        <ul className="results">
          {results.map((item, index) => (
            <li key={index}>
              <SearchResults
                title={item.show.name}
                imageSrc={item.show.image == null ? '' : item.show.image.medium}
                year={item.show.premiered == null ? '' : item.show.premiered}
                onAddShow={onAddShow}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
