import { StoreMap } from "../../components/StoreMap/StoreMap"
import { Navbar } from "../../components/Navbar/Navbar"

export const Home = (): JSX.Element => {
    return <div>
        <Navbar></Navbar>
        <StoreMap />
    </div>
}