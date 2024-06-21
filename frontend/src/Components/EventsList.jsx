import { useParams } from "react-router-dom";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";
import "../css/EventList.css";

export function EventsList() {
    const { city, attraction } = useParams();
    const [map, setMap] = useState({});
    const [count, setCount] = useState(0); //count needs to be a state as a let var will reset back to default
    async function fetchNextData(e) {
        e.preventDefault();
        try {
            const res = await api.get(
                `/submitCity?CityName=${city}&page=${
                    count + 1
                }&keyword=${attraction}`
            );
            setMap(res.data);
            setCount(count + 1);
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
            const res = await api.get(
                `/submitCity?CityName=${city}&page=${
                    count - 1
                }&keyword=${attraction}`
            );
            setMap(res.data);
            setCount(count - 1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get(
                    `/submitCity?CityName=${city}&page=0&keyword=${attraction}`
                );
                setMap(res.data);
                console.log("effect ran");
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
