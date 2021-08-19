import './search_box'
import './popup.scss'
import SearchBox from './search_box'

export default function Popup(props) {
  return (
    <div className="popup">
      <SearchBox />
      <span className="close" onClick={props.handleClose}>
        x
      </span>
    </div>
  )
}
