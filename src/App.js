import { useState } from "react/cjs/react.development";
import "./App.css";

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: "Картка 3" },
    { id: 2, order: 1, text: "Картка 1" },
    { id: 3, order: 2, text: "Картка 2" },
    { id: 4, order: 4, text: "Картка 4" },
    { id: 5, order: 5 },
    { id: 6, order: 6 },
    { id: 7, order: 7 },
    { id: 8, order: 8 },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  const clickHandler = (e) =>{
    console.log(cardList)
  }

  const dragStartHandler = (e, card) => {

    setCurrentCard(card);
  };

  const dragEndHandler = (e) => {
    e.target.style.background = "white";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    e.target.style.background = "white";

  };

  return (
    <div className="App">
      {cardList.sort(sortCards).map((card) => (
        <div
          key={card.id}
          className={"card"}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
      <button onClick={clickHandler}>Push</button>
    </div>
  );
}

export default App;
