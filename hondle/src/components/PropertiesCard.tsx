import React from 'react';


const PropertiesCard = ({ content, colorClass }:{
    content: string;
    colorClass: string;

}) => {
    
    const toFirstLetterUpperCase = (word: string) => {
        const upperWord = word[0].toUpperCase() + word.slice(1);
        return upperWord;
    }

    const addComma = content.split(" ").join(", ");
    const words = addComma.split(" ")

    return (
        <div className={`properties-card ${colorClass}`}>
            <div className="properties-card-content">
                {words.map((word, index) => (
                    <div key={index}>{toFirstLetterUpperCase(word)}</div>
                ))}
            </div>
        </div>
    );
};

export default PropertiesCard;
