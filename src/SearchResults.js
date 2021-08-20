import AddButton from './AddButton'
import './SearchResults.scss'

export default function SearchResults({
  title = 'Unknown',
  imageSrc = '',
  year = '',
  onAddShow = null
}) {
  const handleClick = () => {
    onAddShow({ title, imageSrc })
  }

  return (
    <>
      <img src={imageSrc}></img>
      <div className="results__info">
        <p className="results__title">{title}</p>
        <p className="results__year">{year.split('-')[0]}</p>
      </div>
      <AddButton handleClick={handleClick} />
    </>
  )
}
