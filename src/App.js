import './App.scss';
import Card from './card';
import SearchBox from './search_box';

const cards = [
  { title: 'Breaking Bad', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg', rating: 2, state: true, className:'card--filled'},
  { title: 'Game of Thrones', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg', rating: 4, state: true, className:'card--filled'},
  { title: 'Horimiya', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/710358.jpg', rating: 5, state: true, className:'card--filled'},
  { title: 'Modao Zushi', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/255/638453.jpg', rating: 6, state: true, className:'card--filled'},
  { title: 'The Promised Neverland', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/177/444843.jpg', rating: 7, state: true, className:'card--filled'},
  { title: 'Shameless (US)', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/712350.jpg', rating: 8, state: true, className:'card--filled'},
  { title: 'That Time I Got Reincarnated as a Slime', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/165/413607.jpg', rating: 9, state: true, className:'card--filled'},
  { title: 'Re: Zero kara hajimeru isekai seikatsu', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/49/122624.jpg', rating: 0, state: true, className:'card--filled'},
]

function App() {

  const cards_item = cards.map((card, index) =>
    <Card {...card} key={index} />
  );
  cards_item.push(<Card key={8}/>)

  return (
    <div className="container">
      <SearchBox />
      <div className="item_grid">
        {cards_item}
      </div>
    </div>
  );
}

export default App;
