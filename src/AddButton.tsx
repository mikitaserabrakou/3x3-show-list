import './AddButton.scss'

type TProps = {
  handleClick?: () => void
}

export default function AddButton({ handleClick }: TProps): JSX.Element {
  return <button className="add_button" onClick={handleClick}></button>
}
