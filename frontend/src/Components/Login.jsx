import "../css/Login.css";
import api from "../api/axiosConfigs";
import { useState } from "react";

export function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    async function retrieveAccount(e) {
        e.preventDefault(); //prevents page refresh
        try {
            const res = await api.post("/FindUser", {
                id: 1, //fixed id to get through, won't be neccessary in the backend
                username: Username,
                password: Password,
            });
            if (res.data.username == null) {
                console.log("no matching user");
            } else {
                sessionStorage.setItem("id", `${res.data.id}`);
                sessionStorage.setItem("username", `${res.data.username}`);
                sessionStorage.setItem("password", `${res.data.password}`);
                const eventIdSet = [];
                for (const event of res.data.savedEvents) {
                    eventIdSet.push(event.id);
                }
                sessionStorage.setItem("events", JSON.stringify(eventIdSet));
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
        setPassword("");
    }

    return (
        <div>
            <div className="login-container">
                <form
                    className="form-container"
                    onSubmit={(e) => retrieveAccount(e)}
                >
                    <h2 className="sign-in-title">Sign In</h2>
                    <div className="sign-up-text">
                        Not registered? <a>Sign up</a>
                    </div>
                    <p className="text">Username</p>
                    <input
                        className="username-bar"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="text">Password</p>
                    <input
                        type="password"
                        className="password-bar"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
