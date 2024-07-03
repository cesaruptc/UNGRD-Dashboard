import React, { createContext, useState } from 'react';

export const YearContext = createContext();

export const YearProvider = ({ children }) => {
    const [year, setYear] = useState(2019);

    return (
        <YearContext.Provider value={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    );
};