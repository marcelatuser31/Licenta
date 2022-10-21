import { useLocation } from "react-router-dom"

export const Cake = (): JSX.Element => {
    const location = useLocation()
    console.log(location.state.cakeId)
    console.log(location.state.name)
    return <div>

    </div>

}