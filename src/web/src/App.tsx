import {Link, Outlet} from "react-router-dom";

export default function App() {
    return (
        <div className={"p-16"}>
            <nav className={"flex gap-12 mb-16"}>
                <Link to={"/"}>Home</Link>
                <Link to={"/auth"}>Auth</Link>
            </nav>
            <Outlet />
        </div>
    )
}