import { useState } from "react";
import "../css/Home.css";

export function Home() {
    const [city, setCity] = useState("");
    const [attraction, setAttraction] = useState("");
    const [inputError, setInputError] = useState("");

    function handleSubmit(e) {
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
            </div>
        </div>
    );
}
