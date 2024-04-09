import TimeUntilNextDay from "./TimeUntilNextGame";

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
                    <TimeUntilNextDay />
                </>
            )}
        </div>
    );
}

export default InfoBox;
