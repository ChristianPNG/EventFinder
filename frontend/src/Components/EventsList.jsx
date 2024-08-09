import { useParams } from "react-router-dom";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";
import "../css/EventList.css";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const months = {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
};

const cancelled = {
    cancelled: "CANCELLED",
    onsale: null,
};

export function EventsList() {
    const { city, attraction } = useParams(); //grab city or attraction from url params
    const [map, setMap] = useState({}); //map handles any data from the api
    const [count, setCount] = useState(0); //count needs to be a state as a let var will reset back to default
    const [eventsPage, setEventsPage] = useState(true);
    const [artistSearch, setArtistSearch] = useState(false);
    const [inputFlag, setInputFlag] = useState(false); //triggers if input is incorrect
    const [eventsList, setEventsList] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true); //will be true on first render and will be false after the first use effect

    function buildURL(currCount, artistPage, id) {
        /*
         * Params: currCount - page number, artistPage - boolean, if we are only viewing events to a specific artist
         *      id - id of an artist (string, could be empty)
         * Description:There are 2 different pages that will be handled by the EventsList component.
         *      1. standard list of events
         *          - list of events, by a specific artist (artistPage) or city (city)
         *      2. list of different artists themselves which is done by `setEventsPage(false)`
         */
        let url = "";
        if (city) {
            url += `/eventSearch?CityName=${city}`;
            url += `&page=${currCount}`;
            if (attraction) {
                url += `&keyword=${attraction}`;
            }
        } else if (artistPage) {
            url += `/eventSearch?`;
            url += `page=${currCount}&attractionId=${id}`;
        } else {
            setEventsPage(false);
            url += `/attractionSearch?page=${currCount}&keyword=${attraction}`;
        }
        return url;
    }

    async function viewArtist(id) {
        try {
            const res = await api.get(buildURL(count, true, id));
            setArtistSearch(true);
            setEventsPage(true);
            setMap(res.data);
        } catch (error) {
            setInputFlag(true);
            setTimeout(() => {
                setInputFlag(false);
            }, 2000);
        }
    }

    useEffect(() => {
        //called on first page render
        async function fetchData() {
            try {
                const res = await api.get(buildURL(count, artistSearch, ""));
                setMap(res.data);
                let eventSet = new Set();
                if (sessionStorage.getItem("events") !== null) {
                    const events = JSON.parse(sessionStorage.getItem("events"));
                    eventSet = new Set(events);
                }
                setEventsList(eventSet);
            } catch (error) {
                setInputFlag(true);
                setTimeout(() => {
                    setInputFlag(false);
                }, 2000);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchNextData(e) {
        e.preventDefault();
        try {
            //buildURL() is passed with count + 1 despite count + 1 being done the line before it due to how
            //react hooks work. count won't be updated by setCount() until the end of the function so it's just
            //sent via a param for immediate use
            setCount(count + 1);
            console.log("fetch: " + artistSearch);
            const res = await api.get(buildURL(count + 1, artistSearch, ""));
            setMap(res.data);
        } catch (error) {
            console.log(eventsPage);
            setCount(count);
            setInputFlag(true);
            setTimeout(() => {
                setInputFlag(false);
            }, 2000);
            console.log(error);
        }
    }
    async function fetchPrevData(e) {
        e.preventDefault();
        try {
            if (count === 0) {
                return;
            }
            setCount(count - 1);
            const res = await api.get(buildURL(count - 1), artistSearch, "");
            setMap(res.data);
        } catch (error) {
            setCount(count);
            setInputFlag(true);
            setTimeout(() => {
                setInputFlag(false);
            }, 2000);
            console.log(error);
        }
    }

    async function saveEvent(e, key) {
        /*
         * Params: e - defualt event handler, key - the id of the event given by the api itself and used in the database
         *
         * Description: this functions runs on empty bookmark click, it will check if the user is logged in, if not return.
         *   It will then create an event object using information from the hashmap containing all visible events. This is done
         *   via the key that was passed in. It will also make a user object using logged in credentials, once that is done it
         *   calls the backend to create a relationship between the user and the event in the database.
         *   Lastly it updates the set and events session storage in the frontend.
         */
        if (sessionStorage.getItem("id") === null) {
            return;
        }
        e.preventDefault();
        console.log(map[key][0]);
        const event = {
            id: key,
            name: map[key][10],
            url: map[key][0],
            image: map[key][1],
            month: map[key][2],
            day: map[key][3],
            status: map[key][4],
            hour: map[key][5],
            minutes: map[key][6],
            venue: map[key][7],
            city: map[key][8],
            state: map[key][9],
        };
        const user = {
            id: sessionStorage.getItem("id"),
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
        };
        try {
            await api.post("/saveEvent", { user: user, event: event });
            //session storage must be saved as an array since it can't stringify sets but we still convert it to a set
            //as its faster to convert it once and retrieve information, then it is to traverse the array and traverse
            //each key id
            let eventSet = new Set();
            const events = JSON.parse(sessionStorage.getItem("events"));
            events.push(key);
            eventSet = new Set(events);
            setEventsList(eventSet);
            sessionStorage.setItem("events", JSON.stringify(events));
        } catch (error) {
            console.log(error);
        }
        return;
    }

    function isSavedEvent(key) {
        if (sessionStorage.getItem("id") === null) {
            return false;
        }
        if (eventsList.has(key)) {
            return true;
        }
        return false;
    }

    async function unsaveEvent(e, key) {
        e.preventDefault();
        if (sessionStorage.getItem("id") === null) {
            return;
        }
        const eventID = {
            id: key,
        };
        const user = {
            id: sessionStorage.getItem("id"),
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
        };
        try {
            await api.post("/unsaveEvent", { user: user, event: eventID });
            eventsList.delete(key);
            const eventSet = new Set(eventsList);
            setEventsList(eventSet);
            sessionStorage.setItem(
                "events",
                JSON.stringify(Array.from(eventSet))
            );
        } catch (error) {
            console.log(error);
        }
        return;
    }

    if (isLoading) {
        return <div></div>;
    }

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
            <div className="eventsPage">
                {eventsPage && (
                    <ul>
                        {Object.keys(map).map((id) => (
                            <div key={id}>
                                <div className="eventLists">
                                    <img src={map[id][1]} />
                                    <div className="date">
                                        <p className="month">
                                            {months[map[id][2]]}
                                        </p>
                                        <p className="day">{map[id][3]}</p>
                                    </div>
                                    <div className="info">
                                        {/*&& in case of null value, if null value present instead say TBD*/}
                                        <p>{map[id][10]}</p>
                                        {map[id][5] && (
                                            <p className="time">
                                                {map[id][5]}:{map[id][6]}{" "}
                                            </p>
                                        )}
                                        {!map[id][5] && (
                                            <p className="time">TBD</p>
                                        )}
                                        <p>
                                            {map[id][8]}, {map[id][9]} -{" "}
                                            {map[id][7]}
                                        </p>
                                        <a target={"_blank"} href={map[id][0]}>
                                            View Tickets
                                        </a>
                                        {/*[map[id][4]] = status code, mapped to the 'cancelled' hashmap will be
            either null or a value. If its null this block will not be shown due
            to how <null> && () works by eliminating the next block if the first half is null*/}
                                        {cancelled[map[id][4]] && (
                                            <p className="cancelled-display">
                                                {cancelled[map[id][4]]}
                                            </p>
                                        )}
                                        {isSavedEvent(id) ? (
                                            <p
                                                className="bookmark"
                                                onClick={(e) =>
                                                    unsaveEvent(e, id)
                                                }
                                            >
                                                <BsFillBookmarkFill />
                                            </p>
                                        ) : (
                                            <p
                                                className="bookmark"
                                                onClick={(e) =>
                                                    saveEvent(e, id)
                                                }
                                            >
                                                <BsBookmark />
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        ))}
                    </ul>
                )}
                {inputFlag && (
                    <div className="errorBlock" style={{ color: "red" }}>
                        No events found.
                    </div>
                )}
                {!eventsPage && (
                    <ul>
                        {Object.keys(map).map((name) => (
                            <div key={name}>
                                <img
                                    height="100px"
                                    width="170px"
                                    src={map[name][1]}
                                />
                                <div>
                                    <p>{name}</p>
                                    <button
                                        onClick={() => viewArtist(map[name][0])}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
                <button onClick={(e) => fetchPrevData(e)}>Prev</button>
                <button onClick={(e) => fetchNextData(e)}>Next</button>
            </div>
        </div>
    );
}
