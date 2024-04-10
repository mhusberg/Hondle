import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Hero } from '../App';


const HeroSearchBar = ({ onSelect, setValue, value, placeholder = "Search hero...", heroes }:{
    onSelect: (selectedItem: string) => void;
    setValue: (value: string) => void;
    value: string;
    placeholder?: string;
    heroes: Hero[];
})  => {
    const [showDropdown, setShowDropdown] = useState(true);
    
    const filteredHeroList = heroes
                            .filter(heroes => heroes.Name
                            .toLowerCase()
                            .startsWith(value.toLowerCase()));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

    const handleItemClick = (hero: string) => {
        setValue(hero);
        setShowDropdown(false);
        onSelect(hero);
      };

  return (
    <div>
        <Form.Control
            className="form-control bg-dark text-white custom-search-bar"
            type="text"
            value={value} 
            placeholder={placeholder}
            onFocus={() => setShowDropdown(true)}
            onChange={handleChange}
            style={{ borderColor: "#343a40" }}
        />
        <Dropdown show={filteredHeroList.length > 0 && filteredHeroList.length !== heroes.length && showDropdown}>
            <Dropdown.Menu className="bg-dark" style={{width: "100%"}}>
                {filteredHeroList.map((hero, index) => (
                    <div key={index} className="custom-dropdown-item">
                        <Dropdown.Item className="custom-dropdown-item text-white" key={index} eventKey={hero.Name} onClick={() => handleItemClick(hero.Name)}>
                            <img src={hero.ImagePath} alt={hero.Name} className="hero-img-search"/>
                            {hero.Name}
                        </Dropdown.Item>
                    </div>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

export default HeroSearchBar;
