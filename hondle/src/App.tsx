import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroesData from './heroes.json'
import HeroSearchBar from './components/HeroSearchBar';
import PropertiesRow from './components/PropertiesRow';
import PropertiesHeader from './components/PropertiesHeader';
import InfoBox from './components/InfoBox';
import Button from 'react-bootstrap/Button';
import { getHeroOfTheDay } from './helpers/TimerHashFunction';


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
  Gender: hero.Gender as Hero['Gender'],
  Attribute: hero.Attribute as Hero['Attribute'], // Asserting the correct type for Attribute
  Role: hero.Role as Hero['Role'], // Asserting the correct type for Role
  Side: hero.Side as Hero['Side'], // Asserting the correct type for Side
  RangeType: hero.RangeType as Hero['RangeType'], // Asserting the correct type for RangeType
  Complexity: hero.Complexity as Hero['Complexity'], // Asserting the correct type for Complexity
}));


// Sample list of heroes from Heroes of Newerth
// const heroess = ['Accursed', 'Aluna', 'Arachna', 'Artillery', 'Balphagore', 'Behemoth', 'Blacksmith', 'Bombardier', 'Bramble', 'Bubbles', 'Cthulhuphant', 'Demented Shaman', 'Devourer', 'Doctor Repulsor', 'Draconis', 'Empath', 'Engineer', 'Fayde', 'Flux', 'Forsaken Archer', 'Gauntlet', 'Geomancer', 'Glacius', 'Gravekeeper', 'Gunblade', 'Hellbringer', 'Keeper of the Forest', 'Kinesis', 'Kraken', 'Lodestone', 'Lord Salforis', 'Magmus', 'Martyr', 'Master of Arms', 'Midas', 'Moon Queen', 'Monarch', 'Moraxus', 'Myrmidon', 'Nighthound', 'Nitro', 'Nomad', 'Oogie', 'Parallax', 'Pandamonium', 'Pebbles', 'Pharaoh', 'Plague Rider', 'Pollywog Priest', 'Predator', 'Puppet Master', 'Pyromancer', 'Rally', 'Ravenor', 'Revenant', 'Rhapsody', 'Sand Wraith', 'Scout', 'Silhouette', 'Sir Benzington', 'Soulstealer', 'Swiftblade', 'Tarot', 'Tempest', 'The Gladiator', 'The Madman', 'Thunderbringer', 'Tremble', 'Tundra', 'Valkyrie', 'Vindicator', 'Voodoo Jester', 'War Beast', 'Wildsoul', 'Witch Slayer', 'Zephyr'];

const App = () => {
  const [guess, setGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState<Hero[]>([]);
  const [remainingHeroes, setGuessedHistoryList] = useState<Hero[]>(heroes);
  const [inputValue, setInputValue] = useState("");
  const [wonGame, setWonGame] = useState<boolean>(false);
  const targetHero = useRef({} as Hero);
   useEffect(() => {
    targetHero.current = getHeroOfTheDay(new Date(), heroes)
  },[])

  const handleGuessChange = (value: string) => {
    const searchTerm = value.trim();
    setGuess(searchTerm);
  };

  const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guessedHero = guess.trim();
    const guessedHeroObject = heroes.find(hero => hero.Name.toLowerCase() === guessedHero.toLowerCase());
  
    if (!guessedHeroObject) {
      return;
    }

    const isHeroInGuessHistory = guessHistory.some(hero => hero.Name === guessedHeroObject.Name);
    if (isHeroInGuessHistory) {
      return;
    }

    const isCorrect = guessedHeroObject.Name.toUpperCase() === targetHero.current.Name.toUpperCase();
    const updatedGuessHistory = [...guessHistory, guessedHeroObject];
    setGuessHistory(updatedGuessHistory);
  
    if (isCorrect) {
      setWonGame(true);
    } else {
      setGuessedHistoryList(remainingHeroes.filter(item => item.Name !== guess));
    }
  };

const handleInputReset = () => {
  setInputValue("");
};

  return (
    <div className="bg">
      <div className="App">
          <img className="hon-logo" src="./images/HoN_logo.png"></img>
          <form onSubmit={handleGuessSubmit}>
            <div className="hero-searchbar">
              <HeroSearchBar onSelect={handleGuessChange} value={inputValue} setValue={setInputValue} heroes={remainingHeroes}></HeroSearchBar>
            </div>
            <Button disabled={wonGame} className="btn my-3" variant="success" type="submit" onClick={handleInputReset}>Guess</Button>
          </form>
          <InfoBox guesses={guessHistory.length} finished={wonGame}></InfoBox>
        <PropertiesHeader></PropertiesHeader>
        {guessHistory.map((hero, index) => (
          <PropertiesRow key={index} hero={hero} targetHero={targetHero.current}></PropertiesRow>
        ))}
      </div>
    </div>
  );
};
export default App;
