import { useRoutes } from 'react-router-dom';
import './App.css';
import { Layout } from "./components/Layout/Layout";
import './styles/variables.scss';
import { routes } from './Utils/routes';

export const App = (): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null => {
      const navBarRoutes = useRoutes(routes)
      return navBarRoutes
}

