import { useParams } from "react-router-dom";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";
import "../css/EventList.css";

export function EventsList() {
    const { city, attraction } = useParams();
    const [map, setMap] = useState({});
    const [count, setCount] = useState(0); //count needs to be a state as a let var will reset back to default
    const [eventsPage, setEventsPage] = useState(true);
    const [artistSearch, setArtistSearch] = useState(false);
    const [inputFlag, setInputFlag] = useState(false);

    function buildURL(currCount, artistPage, id) {
        //build the url we will use to do the API call on
        console.log(currCount);
        let url = "";
        if (city) {
            url += `/eventSearch?CityName=${city}`;
            url += `&page=${currCount}`;
            if (attraction) {
                url += `&keyword=${attraction}`;
            }
        } else if (artistPage) {
            url += `/attraction?`;
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
        async function fetchData() {
            try {
                const res = await api.get(buildURL(count, artistSearch));
                setMap(res.data);
            } catch (error) {
                console.log(error);
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
            const res = await api.get(buildURL(count + 1), artistSearch, "");
            setMap(res.data);
        } catch (error) {
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
            console.log(error);
        }
    }
    return (
        <div>
            {eventsPage && (
                <ul>
                    {Object.keys(map).map((name) => (
                        <div key={name} className="eventLists">
                            <img
                                height="100px"
                                width="170px"
                                src={map[name][1]}
                            />
                            <div style={{ height: "100px" }}>
                                <p>{name}</p>
                                <a href={map[name][0]}>{map[name][0]}</a>
                            </div>
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
    );
}
