import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroesData from './heroes.json'
import HeroSearchBar from './components/HeroSearchBar';
import PropertiesRow from './components/PropertiesRow';
import PropertiesHeader from './components/PropertiesHeader';
import InfoBox from './components/InfoBox';
import Button from 'react-bootstrap/Button';


export type Hero = {
  Name: string,
  Gender: string,
  Attribute: string,
  Role: string,
  Side: string,
  RangeType: string,
  Complexity: string,
  ImagePath: string
}

const heroes: Hero[] = heroesData.map((hero) => ({
  ...hero,
  Attribute: hero.Attribute as Hero['Attribute'], // Asserting the correct type for Attribute
  Role: hero.Role as Hero['Role'], // Asserting the correct type for Role
  Side: hero.Side as Hero['Side'], // Asserting the correct type for Side
  RangeType: hero.RangeType as Hero['RangeType'], // Asserting the correct type for RangeType
  Complexity: hero.Complexity as Hero['Complexity'], // Asserting the correct type for Complexity
}));


// Sample list of heroes from Heroes of Newerth
// const heroess = ['Accursed', 'Aluna', 'Arachna', 'Artillery', 'Balphagore', 'Behemoth', 'Blacksmith', 'Bombardier', 'Bramble', 'Bubbles', 'Cthulhuphant', 'Demented Shaman', 'Devourer', 'Doctor Repulsor', 'Draconis', 'Empath', 'Engineer', 'Fayde', 'Flux', 'Forsaken Archer', 'Gauntlet', 'Geomancer', 'Glacius', 'Gravekeeper', 'Gunblade', 'Hellbringer', 'Keeper of the Forest', 'Kinesis', 'Kraken', 'Lodestone', 'Lord Salforis', 'Magmus', 'Martyr', 'Master of Arms', 'Midas', 'Moon Queen', 'Monarch', 'Moraxus', 'Myrmidon', 'Nighthound', 'Nitro', 'Nomad', 'Oogie', 'Parallax', 'Pandamonium', 'Pebbles', 'Pharaoh', 'Plague Rider', 'Pollywog Priest', 'Predator', 'Puppet Master', 'Pyromancer', 'Rally', 'Ravenor', 'Revenant', 'Rhapsody', 'Sand Wraith', 'Scout', 'Silhouette', 'Sir Benzington', 'Soulstealer', 'Swiftblade', 'Tarot', 'Tempest', 'The Gladiator', 'The Madman', 'Thunderbringer', 'Tremble', 'Tundra', 'Valkyrie', 'Vindicator', 'Voodoo Jester', 'War Beast', 'Wildsoul', 'Witch Slayer', 'Zephyr'];

const generateRandomHero = (): Hero => {
  const randomIndex = Math.floor(Math.random() * heroes.length);
  return heroes[randomIndex];
};
const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#212529';
  })
  const [targetHero, setTargetHero] = useState(generateRandomHero());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessHistory, setGuessHistory] = useState<Hero[]>([]);
  const [remainingHeroes, setGuessedHistoryList] = useState<Hero[]>(heroes);
  const [inputValue, setInputValue] = useState("");
  const [numOfGuesses, setNumOfGuesses] = useState<number>(0);
  const [wonGame, setWonGame] = useState<boolean>(false);

  const handleGuessChange = (value: string) => {
    const searchTerm = value.trim();
    setGuess(searchTerm);
  };

  const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guessedHero = guess.trim();
    const guessedHeroObject = heroes.find(hero => hero.Name.toLowerCase() === guessedHero.toLowerCase());
  
    if (!guessedHeroObject) {
      setFeedback('Sorry, that hero was not found.');
      return;
    }

    const isHeroInGuessHistory = guessHistory.some(hero => hero.Name === guessedHeroObject.Name);
    if (isHeroInGuessHistory) {
      setFeedback("Already guessed this hero.")
      return;
    }

    incrementGuesses();
  
    const isCorrect = guessedHeroObject.Name.toUpperCase() === targetHero.Name.toUpperCase();
    const updatedGuessHistory = [...guessHistory, guessedHeroObject];
    setGuessHistory(updatedGuessHistory);
  
    if (isCorrect) {
      setFeedback('Congratulations! You guessed the hero correctly!');
      setWonGame(true);
    } else {
      setFeedback('Sorry, that\'s not the correct hero.');
      setGuessedHistoryList(remainingHeroes.filter(item => item.Name !== guess));
    }
  };

  const handleNewGame = () => {
    setTargetHero(generateRandomHero());
    setGuess('');
    setFeedback('');
    setGuessHistory([]);
    setGuessedHistoryList(heroes);
    handleInputReset();
  };

const handleInputReset = () => {
  setInputValue("");
};

const incrementGuesses = () => {
  setNumOfGuesses(prevCount => prevCount + 1);
};

  return (
    <div className="bg">
      <div className="App">
          <img className="hon-logo" src="./images/HoN_logo.png"></img>
          <form onSubmit={handleGuessSubmit}>
            <div className="hero-searchbar">
              <HeroSearchBar onSelect={handleGuessChange} value={inputValue} setValue={setInputValue} heroes={remainingHeroes}></HeroSearchBar>
            </div>
            <Button className="btn my-3" variant="success" type="submit" onClick={handleInputReset}>Guess</Button>
          </form>
          <InfoBox guesses={numOfGuesses} finished={wonGame}></InfoBox>
      {/* <div className="card">
          {feedback && <p>{feedback}</p>}
          <div className="hero-history">
            <div className="hero-history-line">
              <div className='hero-history-box'>HERO</div>
              <div className='hero-history-box'>RANGE TYPE</div>
              <div className='hero-history-box'>ATTRIBUTE</div>
              <div className='hero-history-box'>COMPLEXITY</div>
            </div>
            {guessHistory.map((hero, index) => (
              <div key={index} className="hero-history-line">
                <img src={hero.ImagePath} alt={hero.Name} className='hero-history-box'/>
                <div className='hero-history-box'>{hero.RangeType.toUpperCase()}</div>
                <div className='hero-history-box'>{hero.Attribute.toUpperCase()}</div>
                <div className='hero-history-box'>{hero.Complexity.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div>
            <h2>Target Hero:</h2>
            <p>Name: {targetHero.Name}</p>
            <p>Range: {targetHero.RangeType}</p>
          </div>
          <button onClick={handleNewGame}>New Game</button>
        </div> */}
        <PropertiesHeader></PropertiesHeader>
        {guessHistory.map((hero, index) => (
          <PropertiesRow key={index} hero={hero} targetHero={targetHero}></PropertiesRow>
        ))}
      </div>
    </div>
  );
};
export default App;
