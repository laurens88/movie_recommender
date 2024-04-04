import {React, useEffect} from "react";

function HomePage() {
    useEffect(() => {
        document.title = 'Movie Recommender';
    }, []);
    return (
        <div>
        <h1>Home</h1>
        </div>
    );
    }

export default HomePage;