import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Search from "../pages/Search";
import SearchResult from "../pages/Search/SearchResult";
import ProfileEdit from "../pages/Profile/Edit";
import Chat from '../pages/Profile/Chat'
import { AuthRoute } from '../components/AuthRoute'
import { KeepAlive } from '../components/KeepAlive'
const routes = [
    { path: "/", element: <KeepAlive> <Home /></KeepAlive> },
    { path: "/login", element: <Login /> },
    {
        path: "/search", element: <Search />,
        children: [
            { path: "result", element: <SearchResult /> },

        ]
    },
    { path: "/profile/edit", element: <AuthRoute> <ProfileEdit /></AuthRoute> },
    { path: "/chat", element: <AuthRoute> <Chat /></AuthRoute> },
]


const AppRoute = () => {
    let element = useRoutes(routes);
    return element;
}
export default AppRoute;
