import './App.css';
import Card from './card'

const cards = [
  {title: '1', description: 'Lorem ipsum', rating: 2, links: 'click'},
  {title: '2', description: 'Lorem ipsum', rating: 4, links: 'click'},
  {title: '3', description: 'Lorem ipsum', rating: 5, links: 'click'},
  {title: '4', description: 'Lorem ipsum', rating: 6, links: 'click'},
  {title: '5', description: 'Lorem ipsum', rating: 7, links: 'click'},
  {title: '6', description: 'Lorem ipsum', rating: 8, links: 'click'},
  {title: '7', description: 'Lorem ipsum', rating: 9, links: 'click'},
  {title: '8', description: 'Lorem ipsum', rating: 0, links: 'click'},
  {title: '9', description: 'Lorem ipsum', rating: 1, links: 'click'},
]

function App() {

  const cards_item = cards.map((card) => 
    <Card card={card} /> 
  );
  return (
    <div className="App">
      <header className="App-header">
        {cards_item}
      </header>
    </div>
  );
}

export default App;
