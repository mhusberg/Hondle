import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Hero } from '../App';


const HeroSearchBar = ({ onSelect, value, placeholder = "Search", heroes }:{
    onSelect: (selectedItem: string) => void;
    value?: string,
    placeholder?: string;
    heroes: Hero[];
})  => {
    const [guess, setGuess] = useState('');
    const [showDropdown, setShowDropdown] = useState(true);
    
    const filteredHeroList = heroes
                            .filter(heroes => heroes.Name
                            .toLowerCase()
                            .startsWith(guess.toLowerCase()));

    const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGuess(value);
    };

    const handleItemClick = (hero: string) => {
        setGuess(hero);
        setShowDropdown(false);
        onSelect(hero);
      };

  return (
    <div>
        <Form.Control
            className="form-control mb-3 bg-dark text-white custom-search-bar"
            type="text"
            value={guess} 
            placeholder={placeholder}
            onFocus={() => setShowDropdown(true)}
            onChange={handleGuessChange}
        />
        <Dropdown show={filteredHeroList.length > 0 && filteredHeroList.length != heroes.length && showDropdown}
            className="mb-3">
            <Dropdown.Menu className="bg-dark">
                {filteredHeroList.map((hero, index) => (
                    <Dropdown.Item className="text-white" key={index} eventKey={hero.Name} onClick={() => handleItemClick(hero.Name)}>
                        <img src={hero.ImagePath} alt={hero.Name} className="hero-img-search"/>
                        {hero.Name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

export default HeroSearchBar;
