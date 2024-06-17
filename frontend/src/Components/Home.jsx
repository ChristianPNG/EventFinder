import { useState } from "react";
import "../css/Home.css";
import api from "../api/axiosConfigs";

export function Home() {
    const [city, setCity] = useState("");
    async function handleCityGET(e) {
        e.preventDefault();
        try {
            const data = await api.get(`/submitCity?CityName=${city}`);
            console.log(data);
        } catch (error) {
            console.log(error);
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
                    <form onSubmit={handleCityGET}>
                        <input
                            type="text"
                            placeholder="Enter City..."
                            name="CityName"
                            className="search-bar"
                            autoComplete="none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button type="submit" className="submit-btn">
                            X
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
