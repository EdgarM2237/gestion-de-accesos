import { Route, Routes } from "react-router-dom"
import { routes } from "./RouterConfig"

export const AppRoute = () => {

    return(
        <Routes>
            {
                routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.component} />
                ))
            }
        </Routes>
    )
}
