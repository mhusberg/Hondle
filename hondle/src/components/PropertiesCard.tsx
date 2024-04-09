import React from 'react';


const PropertiesCard = ({ content, colorClass }:{
    content: string;
    colorClass: "success" | "partial" | "fail";

}) => {
    
    const addComma = content.replace(" ", ", ");
    const words = addComma.split(" ");

    return (
        <div className={`properties-card ${colorClass}`}>
            <div className="properties-card-content">
                {words.map((word, index) => (
                    <div key={index}>{word}</div>
                ))}
            </div>
        </div>
    );
};

export default PropertiesCard;
