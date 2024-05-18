import React from 'react';

export const CategoriesContext = React.createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = React.useState([]);

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};