import React, { useEffect, useState } from 'react'

function CountdownTimer({ expiryDate }) {
    const secondsLeft = (expiryDate - Date.now()) /1000;
    const startTime = Date.now();

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    function updateTimer() {
        const secondsElapsed = (Date.now() - startTime) / 1000;
        const updateTime = secondsLeft - secondsElapsed;
        
        setSeconds(Math.floor(updateTime) % 60);
        setMinutes(Math.floor(updateTime / 60) % 60);
        setHours(Math.floor(updateTime / (60 * 60)) % 24);
    }

    useEffect(() => {
        const interval = setInterval(() => updateTimer(), 100);
        return () => clearInterval(interval);
    }, []);

    if(secondsLeft < 0 || !expiryDate) {
        return <div></div>
    }

    return (
        <div className='de_countdown'>
            {seconds < 0 ? (
                <span> Expired</span>
            ) : (
                <span>
                    {hours}H {minutes}M {seconds} S
                </span>
            )}
        </div>
    );
}

export default CountdownTimer