

const InfoBox = ({ guesses, message, finished }:{
    guesses?: number;
    message?: string;
    finished?: boolean;

}) => {
    return (
        <div className="info-box">
            Number of guesses: {guesses}
            {message}
            {finished && (
                <>
                    <div>Congratulations! You've won!</div>
                    <div>Timer TBA</div>
                </>
            )}
        </div>
    );
}

export default InfoBox;
