import AddButton from './AddButton'
import './SearchResults.scss'

type TProps = {
  title: string
  imageSrc: any
  year: string
  onAddShow: (title: string, imageSrc: string) => void
}

export default function SearchResults({ title, imageSrc, year, onAddShow }: TProps): JSX.Element {
  const handleClick = () => {
    onAddShow(title, imageSrc)
  }
  return (
    <>
      <img src={imageSrc}></img>
      <div className="results__info">
        <p className="results__title">{title}</p>
        <p className="results__year">{year.split('-')[0]}</p>
      </div>
      <div className="results__buttons">
        <button onClick={handleClick}>Add</button>
      </div>
      {/* <AddButton handleClick={handleClick} /> */}
    </>
  )
}
