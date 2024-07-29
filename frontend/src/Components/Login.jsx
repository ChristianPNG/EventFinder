import "../css/Login.css";

export function Login() {
    return (
        <div>
            <div className="login-container">
                <form className="form-container">
                    <h2 className="sign-in-title">Sign In</h2>
                    <div className="sign-up-text">
                        Not registered? <a>Sign up</a>
                    </div>
                    <p>Username</p>
                    <input className="username-bar" />
                    <p>Password</p>
                    <input className="password-bar" />
                    <button className="sign-in-button">Sign In</button>
                </form>
            </div>
        </div>
    );
}
