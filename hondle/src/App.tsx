import React, { useState } from 'react';
import './App.css';
import heroesData from './heroes.json'

type Hero = {
  Name: string,
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
//const heroess = ['Accursed', 'Aluna', 'Arachna', 'Artillery', 'Balphagore', 'Behemoth', 'Blacksmith', 'Bombardier', 'Bramble', 'Bubbles', 'Cthulhuphant', 'Demented Shaman', 'Devourer', 'Doctor Repulsor', 'Draconis', 'Empath', 'Engineer', 'Fayde', 'Flux', 'Forsaken Archer', 'Gauntlet', 'Geomancer', 'Glacius', 'Gravekeeper', 'Gunblade', 'Hellbringer', 'Keeper of the Forest', 'Kinesis', 'Kraken', 'Lodestone', 'Lord Salforis', 'Magmus', 'Martyr', 'Master of Arms', 'Midas', 'Moon Queen', 'Monarch', 'Moraxus', 'Myrmidon', 'Nighthound', 'Nitro', 'Nomad', 'Oogie', 'Parallax', 'Pandamonium', 'Pebbles', 'Pharaoh', 'Plague Rider', 'Pollywog Priest', 'Predator', 'Puppet Master', 'Pyromancer', 'Rally', 'Ravenor', 'Revenant', 'Rhapsody', 'Sand Wraith', 'Scout', 'Silhouette', 'Sir Benzington', 'Soulstealer', 'Swiftblade', 'Tarot', 'Tempest', 'The Gladiator', 'The Madman', 'Thunderbringer', 'Tremble', 'Tundra', 'Valkyrie', 'Vindicator', 'Voodoo Jester', 'War Beast', 'Wildsoul', 'Witch Slayer', 'Zephyr'];

const generateRandomHero = (): Hero => {
  const randomIndex = Math.floor(Math.random() * heroes.length);
  return heroes[randomIndex];
};
const App = () => {
  const [targetHero, setTargetHero] = useState(generateRandomHero());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessHistory, setGuessHistory] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>(heroes);

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setGuess(searchTerm);

    // Filter heroes based on the search term
    const filtered = heroes.filter(hero =>
      hero.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHeroes(filtered);
  };

  const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guessedHero = guess.trim();
    const isCorrect = guessedHero.toUpperCase() === targetHero.Name.toUpperCase();
    const updatedGuessHistory = [...guessHistory, { 
      Name: guessedHero,
      Attribute: targetHero.Attribute,
      Role: targetHero.Role,
      Side: targetHero.Side,
      RangeType: targetHero.RangeType,
      Complexity: targetHero.Complexity,
      ImagePath: targetHero.ImagePath
    }];
    setGuessHistory(updatedGuessHistory);
    if (isCorrect) {
      setFeedback('Congratulations! You guessed the hero correctly!');
    } else {
      setFeedback('Sorry, that\'s not the correct hero.');
    }
  };
  const handleNewGame = () => {
    setTargetHero(generateRandomHero());
    setGuess('');
    setFeedback('');
    setGuessHistory([]);
  };
  return (
    <div className="bg">
      <div className="App">
          <h1>Heroes of Newerth Wordle</h1>
          <form onSubmit={handleGuessSubmit}>
            <input type="text" value={guess} onChange={handleGuessChange} placeholder="Search hero..." />
          <div className="dropdown">
            {filteredHeroes.map((hero, index) => (
              <div key={index} onClick={() => setGuess(hero.Name)}>{hero.Name}</div>
            ))}
          </div>
          <button type="submit">Guess</button>
          </form>
      <div className="card">
          {feedback && <p>{feedback}</p>}
          <div>
            <div>
              <div>Picture</div>
              <div>RangeType</div>
            </div>
            {guessHistory.map((hero, index) => (
              <div key={index}>
                <img src={hero.ImagePath} alt={hero.Name}/>
                <div>{hero.RangeType}</div>
              </div>
            ))}
          </div>
          <div>
            <h2>Target Hero:</h2>
            <p>Name: {targetHero.Name}</p>
            <p>Range: {targetHero.RangeType}</p>
          </div>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      </div>
    </div>
  );
};
export default App;
