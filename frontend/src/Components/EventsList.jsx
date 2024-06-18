import { useParams } from "react-router-dom";
import api from "../api/axiosConfigs";
import { useEffect, useState } from "react";

export function EventsList() {
    const { city } = useParams();
    const [map, setMap] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get(`/submitCity?CityName=${city}`);
                setMap(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ul>
            {Object.keys(map).map((name) => (
                <li key={name}>
                    <p>{name}</p>
                    <a href={map[name][0]}>{map[name][0]}</a>
                </li>
            ))}
        </ul>
    );
}
