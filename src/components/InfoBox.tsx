import TimeUntilNextDay from "./TimeUntilNextGame";

const InfoBox = ({ guesses, message, finished }:{
    guesses?: number;
    message?: string;
    finished?: boolean;

}) => {
    return (
        <div className="info-box">
            Number of guesses: <p style={{ color: "#f3e033" }}>{guesses}</p>
            {message}
            {finished && (
                <>
                    <div style={{ color: "#24d475" }}>Congratulations! You've won!</div>
                    <TimeUntilNextDay />
                </>
            )}
        </div>
    );
}

export default InfoBox;
