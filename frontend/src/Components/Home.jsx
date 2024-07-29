import { useState, useEffect } from "react";
import "../css/Home.css";
import api from "../api/axiosConfigs";

export function Home() {
    const [city, setCity] = useState("");
    const [attraction, setAttraction] = useState("");
    const [inputError, setInputError] = useState("");
    const [map, setMap] = useState({});
    const [inputFlag, setInputFlag] = useState(false);
    const [loginView, setLoginView] = useState(false);

    useEffect(() => {
        //block of code ran only once immediately upon entering the site. Fills
        //feed with suggestions received from an api call.
        async function fetchData() {
            try {
                const res = await api.get("/suggestions");
                setMap(res.data);
            } catch (error) {
                setInputFlag(true);
                setTimeout(() => {
                    setInputFlag(false);
                }, 2000);
                console.log(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(e) {
        /*
         * Handles search button submission functionality.
         * Depending on what search bar was filled, either city search or attraction search or both.
         * It redirects the frontend to another route carrying the passed information as URL query parameter.
         */
        e.preventDefault();
        if (city && attraction) {
            window.location.href = `/EventsList/${city}/${attraction}`;
        } else if (city) {
            window.location.href = `/EventsList/${city}`;
        } else if (attraction) {
            window.location.href = `/AttractionsList/${attraction}`;
        } else {
            setInputError("Please Fill out an input");
            setTimeout(() => {
                setInputError("");
            }, 2000);
        }
    }

    return (
        <div className="home">
            <div className="search-page">
                <div className="header">
                    <div className="banner">
                        <h1 className="banner-text">Event Finder</h1>
                    </div>
                    <h3
                        onClick={() => (window.location.href = "/Login")}
                        className="login-text"
                    >
                        Login
                    </h3>
                </div>
                <div className="search-bar-container">
                    <h2 className="search-bar-title">Search For an Event</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter City..."
                            name="CityName"
                            className="search-bar"
                            autoComplete="none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Artist or Event..."
                            name="EventName"
                            className="search-bar"
                            autoComplete="none"
                            value={attraction}
                            style={{
                                borderBottomLeftRadius: "0",
                                borderTopLeftRadius: "0",
                                borderLeft: "1px solid white",
                            }}
                            onChange={(e) => setAttraction(e.target.value)}
                        />
                        <button type="submit" className="submit-btn">
                            X
                        </button>
                    </form>
                    {<p style={{ color: "red" }}>{inputError}</p>}
                </div>
                <div>
                    {!inputFlag && (
                        <div className="home-display">
                            {Object.keys(map).map((key) => (
                                <div key={key} className="item">
                                    <a href={map[key][1]} target="_blank">
                                        <img src={map[key][2]} />
                                    </a>
                                    <div className="overlay-text">
                                        {map[key][0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {inputFlag && <p>error!</p>}
                </div>
            </div>
        </div>
    );
}
