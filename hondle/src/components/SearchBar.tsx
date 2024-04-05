import React from 'react';
import Form from 'react-bootstrap/Form';


const SearchBar = ({ onChange, placeholder = "Search", value = "" }:{
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
})  => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div>
        <Form.Control
            className="form-control mb-3 mx-auto bg-dark text-white custom-search-bar"
            style={{ width: "30%" }}
            type="text"
            value={value} 
            placeholder={placeholder}
            onChange={handleChange}
        />
    </div>
  );
};

export default SearchBar;
