import { useState, useEffect } from "react";

export default function useDelayed() {
   //used to delay the error page a tiny bit to prevent screen flickering when navigating

    function Delayed({ children, waitBeforeShow = 200 }) {
        const [isShown, setIsShown] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsShown(true);
            }, waitBeforeShow);

            return () => clearTimeout(timer);
        }, [waitBeforeShow]);

        return isShown ? children : null;
    }
    
    return Delayed;
}
