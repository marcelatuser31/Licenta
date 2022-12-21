import { CreditCard } from "../../components/CreditCard/CreditCard"
import { Navbar } from "../../components/Navbar/Navbar"

export const Home = (): JSX.Element => {
    return <div>
        <Navbar></Navbar>
        <CreditCard />
    </div>
}