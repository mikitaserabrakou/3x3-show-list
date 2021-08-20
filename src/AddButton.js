import './AddButton.scss'

export default function AddButton(props) {
  return <button className="add_button" onClick={props.handleClick}></button>
}
