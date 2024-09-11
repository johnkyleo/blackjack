import { useState, useEffect, useCallback } from "react";
import { combinations } from "./assets/CardDeck";
import Button from "./components/Button";
import Hand from "./components/Hand";
import Information from "./components/Information";
import { IoMdInformationCircleOutline } from "react-icons/io";


function App() {
  const [gameDeck, setGameDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState({ type: "", message: "" });
  const [newGame, setNewGame] = useState(false);
  const [score, setScore] = useState({ player: 0, dealer: 0 });
  const [showComponent, setshowComponent] = useState(false);

 
  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randomIndex];
    const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
    setGameDeck(newDeck);
    return card;
  };
 
  const dealCardToPlayer = () => {
    const newHand = [...playerHand, getRandomCardFromDeck()];
    setPlayerHand(newHand);
    const playerValue = calculateHandValue(newHand);

    if (playerValue > 21) {
      handleGameOver({ type: "dealer", message: "Player busts! Dealer wins!" });
    } else if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    }
  };
 
  const playerStand = () => {
    setGameOver(true);
    const newHand = [...dealerHand, getRandomCardFromDeck()];
    setDealerHand(newHand);

    const dealerValue = calculateHandValue(newHand);

    if (dealerValue > 21) {
      handleGameOver({ type: "player", message: "Dealer busts! Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    }
  };
 
  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setResult({ type: "", message: "" });
    setNewGame(false);
    setGameDeck(combinations);
  };

  const calculateHandValue = (hand) => {
    let value = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (card.rank === "J" || card.rank === "Q" || card.rank === "K") {
        value += 10;
      } else if (card.rank === "A") {
        aceCount += 1;
        value += 11;
      } else {
        value += parseInt(card.rank);
      }
    });

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount -= 1;
    }

    return value;
  };

  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck()]);
    }

    if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
    } else if (dealerValue === 21) {
      handleGameOver({ type: "dealer", message: "Dealer wins!" });
      setScore({ ...score, dealer: score.dealer + 1 });
    }

    if (gameOver && dealerHand.length <= 5) {
      switch (true) {
        case playerValue === 21:
          setResult({ type: "player", message: "Player wins!" });
          setScore({ ...score, player: score.player + 1 });
          break;
        case playerValue > 21:
          setResult({ type: "dealer", message: "Player busts! Dealer wins!" });
          setScore({ ...score, dealer: score.dealer + 1 });
          break;
        case dealerValue < playerValue:
          playerStand();
          break;
        case dealerValue === playerValue && dealerHand.length <= 5:
          setResult({ type: "", message: "Draw!" });
          setNewGame(true);
          break;
        case dealerValue > playerValue && dealerValue <= 21:
          setResult({ type: "dealer", message: "Dealer wins!" });
          setScore({ ...score, dealer: score.dealer + 1 });
          setNewGame(true);
          break;
        default:
          break;
      }
    }
  }, [playerHand, dealerHand, gameOver]);

  const handleGameOver = (result) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);


  const toggleMenu = useCallback(() => {
    setshowComponent((current) => !current);
},[setshowComponent])

  return (
    <div className=" bg-slate-900 mx-auto p-4 h-screen w-screen">
      <div className="absolute top-0 right-0 p-2">
      <IoMdInformationCircleOutline onClick={toggleMenu} size={40} className="text-white"/>
      </div>
      <Information visible={showComponent}/>
      <h1 className="text-4xl text-center font-semibold mb-4 text-white">Black Jack</h1>

      {gameOver && (
        <div className={`text-white ${ result.type === "player" ? "bg-green-600" : "bg-red-700"} font-bold rounded-md text-center mt-4 py-4`}>
          <h2 className="text-2xl">{result.message}</h2>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-4">
        {!newGame ? (
          <div>
            <Button onClick={dealCardToPlayer}>
              Hit
            </Button>
            <Button onClick={playerStand}>
              Stand
            </Button>
          </div>
        ) : (
          <Button onClick={resetGame}>Next</Button>
        )}
      </div>

      <div className="flex justify-around">
        <Hand
          cards={playerHand}
          title="Player's Hand"
          handValue={playerValue}
          score={score.player}
        />
        <Hand
          cards={dealerHand}
          title="Dealer's Hand"
          handValue={dealerValue}
          score={score.dealer}
        />
      </div>
    </div>
  );
}

export default App;
