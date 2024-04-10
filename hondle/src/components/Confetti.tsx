import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';


const DisplayConfetti = ({ numOfPieces = 2000, wonGame }:{
    numOfPieces?: number;
    wonGame: boolean;
}) => {
    const [width, height] = useWindowSize();

    return (
        <div>
            {wonGame && (
                <>
                    <Confetti 
                        width={width}
                        height={height}
                        numberOfPieces={numOfPieces}
                        recycle={false}
                        tweenDuration={10000}/>
                </>
            )}
        </div>
    );
};

export default DisplayConfetti;