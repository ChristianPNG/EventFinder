import "../css/Profile.css";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";

export function Profile() {
    const [Events, setEvents] = useState([]);

    useEffect(() => {
        //block of code ran only once immediately upon entering the site. Fills
        //feed with suggestions received from an api call.
        async function fetchData() {
            try {
                const res = await api.get(
                    `/getEvents?id=${sessionStorage.getItem("id")}`
                );
                setEvents(res.data);
                console.log(res.data);
                console.log(res.data.at(0).id);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="banner">
                <h1
                    onClick={() => (window.location.href = "/")}
                    className="banner-text"
                >
                    Event Finder
                </h1>
            </div>
            <div className="profile-page-container">
                <h2>My Saved Events</h2>
                <div>
                    {Events.map((obj) => (
                        <div key={obj.id}>
                            <div className="eventLists">
                                <img src={obj.image} />
                                <div className="date">
                                    <p className="month">{obj.month}</p>
                                    <p className="day">{obj.day}</p>
                                </div>
                                <div className="info">
                                    {/*&& in case of null value, if null value present instead say TBD*/}
                                    <p>{obj.name}</p>
                                    {obj.hour && (
                                        <p className="time">
                                            {obj.hour}:{obj.minutes}{" "}
                                        </p>
                                    )}
                                    {!obj.hour && <p className="time">TBD</p>}
                                    <p>
                                        {obj.city}, {obj.state} - {obj.venue}
                                    </p>
                                    <a target={"_blank"} href={obj.url}>
                                        View Tickets
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
}
