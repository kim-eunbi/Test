import logo from './logo.svg';
import './App.css';
import React from 'react';
import Title from './components/Title';
import jsonLocalStorage from './components/JsonLocalStorage';
import fetchCat from './components/FetchCat';
import Form from './components/Form';
import MainCard from './components/MainCard';

const CatItem = ({ img }) => {
  return (
    <li>
      <img src={img} style={{ width: '150px' }} />
    </li>
  );
}

function Favorites({ favorites }) {

  // 배열을 순회하는 api- map
  return (
    <ul className="favorites">
      {favorites.map(cat => <CatItem img={cat} key={cat} />)}
    </ul>
  );
}



const App = () => {
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(
    () => {
      return jsonLocalStorage.getItem('counter')
    }
  )

  const [mainCat, setMainCat] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  })

  // 하트를 눌렀음 표시하는 함수
  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }


  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, [counter]);


  // 생성을 눌렀을때 카운터가 올라가고 메인사진이 바뀌고 로컬스토리지에 기록됨
  // 인풋에 입력했을때 입력한 텍스트와 API로 받아오는 이미지가 뜬다
  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);


    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    })

  }


  const counterTitle = counter === null ? '' : counter + '웩'

  return (
    <div>
      <Title>{counterTitle}고양이</Title>
      <Form updateMainCat={updateMainCat} />
      <CatItem />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
