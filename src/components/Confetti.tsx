import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';


const DisplayConfetti = ({ numOfPieces = 2000, run }:{
    numOfPieces?: number;
    run: boolean;
}) => {
    const [width, height] = useWindowSize();

    return (
        <div>
            {run && (
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