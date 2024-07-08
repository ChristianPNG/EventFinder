import { useParams } from "react-router-dom";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";
import "../css/EventList.css";

export function EventsList() {
    const { city, attraction } = useParams();
    const [map, setMap] = useState({});
    const [count, setCount] = useState(0); //count needs to be a state as a let var will reset back to default

    function buildURL(currCount) {
        console.log(currCount);
        let url = "";
        if (city != "") {
            url += `/eventSearch?CityName=${city}`;
            url += `&page=${currCount}`;
            if (attraction) {
                url += `&keyword=${attraction}`;
            }
        } else {
            url += `/attractionSearch?page=${currCount}&keyword=${attraction}`;
        }
        return url;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get(buildURL(count));
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
            setCount(count + 1);
            const res = await api.get(buildURL(count + 1));
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
            const res = await api.get(buildURL(count - 1));
            setMap(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <ul>
                {Object.keys(map).map((name) => (
                    <div key={name} className="eventLists">
                        <img height="100px" width="170px" src={map[name][1]} />
                        <div style={{ height: "100px" }}>
                            <p>{name}</p>
                            <a href={map[name][0]}>{map[name][0]}</a>
                        </div>
                    </div>
                ))}
            </ul>
            <button onClick={(e) => fetchPrevData(e)}>Prev</button>
            <button onClick={(e) => fetchNextData(e)}>Next</button>
        </div>
    );
}
