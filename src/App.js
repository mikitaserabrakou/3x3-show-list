import './App.scss';
import Card from './card'

const cards = [
  { title: 'Breaking Bad', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg', rating: 2},
  { title: 'Game of Thrones', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg', rating: 4},
  { title: 'Horimiya', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/710358.jpg', rating: 5},
  { title: 'Modao Zushi', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/255/638453.jpg', rating: 6},
  { title: 'The Promised Neverland', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/177/444843.jpg', rating: 7},
  { title: 'Shameless (US)', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/712350.jpg', rating: 8},
  { title: 'That Time I Got Reincarnated as a Slime', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/165/413607.jpg', rating: 9},
  { title: 'Re: Zero kara hajimeru isekai seikatsu', imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/49/122624.jpg', rating: 0},
  { title: 'Shingeki no kyojin', imageSrc: 'https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_.jpg', rating: 1},
]

function App() {

  const cards_item = cards.map((card, index) =>
    <Card {...card} key={index} />
  );
  return (
    <div className="container">
      <input className="search" type="text" />
      <div className="item_grid">
        {cards_item}
      </div>
    </div>
  );
}

export default App;
