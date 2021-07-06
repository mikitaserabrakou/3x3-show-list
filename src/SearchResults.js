export default function SearchResults({
    title = 'Unknown',
    imageSrc = '',
    year='',
}) {
    return(
        <div className='results'>
            <img src={imageSrc}></img>
            <p className='results__title'>{title}</p>
            <p className='results__year'>{year.split('-')[0]}</p>
        </div>
    )
}