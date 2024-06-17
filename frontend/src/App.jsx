import ReactDOM from "react-dom/client";
import "./App.css";
import { Home } from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
