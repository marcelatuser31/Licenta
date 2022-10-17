
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { Pages } from '../../Utils/enums';
import { buttonStyle, filterButtonStyle, menuStyle } from './Header.styles';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react';
import axios from 'axios';
import { CakeRoutes } from '../../Utils/Routes/backEndRoutes';

export const Header = (): JSX.Element => {
    const [menuOpen, setMenuOpen] = useState<boolean>(true);
    const navigate: NavigateFunction = useNavigate();
    const [cakeTypes, setCakeTypes] = useState<string[]>([]);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    const [selectedType, setSelectedType] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]
    )

    useEffect(() => {
        const getData = async (): Promise<any> => {
            const response = await axios.get(CakeRoutes.GetTypes);
            setCakeTypes(response.data)
        }
        getData();
        const getCakesByType = async (): Promise<any> => {
            const response = await axios.post(CakeRoutes.GetCakesByType, selectedType, { headers: { 'Content-Type': 'application/json' } });
            console.log(response.data)
        }
        getCakesByType()

    }, [selectedType])

    const menuToggleHandler = () => {
        setMenuOpen(!menuOpen);
    }

    const redirect = (path: string): void => {
        navigate(path);
    };

    const onClick = (event: any, item?: IContextualMenuItem): void => {
        if (item == undefined)
            return;

        setSelectedType(cakeTypes.indexOf(item.key))
    }

    const menuProps: IContextualMenuProps = {
        items:
            cakeTypes.map((type: string) => {
                return {
                    key: type,
                    text: type,

                }
            }
            ),
        onItemClick: onClick
    };



    return (<header className={classes.header}>
        <div className={classes.header_content}>
            <h2 className={classes.header_content_logo} onClick={() => redirect(Pages.LogIn)}> Sweet </h2>
            <nav className={`${classes.header_content_nav} ${menuOpen ? classes.isMenu : ""}`}>
                <ul >
                    <li >
                        <Link className={menuStyle} to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link className={menuStyle} to="/LogIn" >LogIn</Link>
                    </li >
                    <li >
                        <DefaultButton className={`${menuStyle}`}
                            style={filterButtonStyle}
                            text="Filter"
                            splitButtonAriaLabel="See 2 options"
                            aria-roledescription="split button"
                            menuProps={menuProps}
                            disabled={false}
                            checked={false}
                        />
                    </li>
                </ul>
                <button className={buttonStyle}>LogOut</button>
            </nav>
            <div className={classes.header_content_toggle}>
                {!menuOpen ? <MenuIcon onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
            </div>
        </div>
    </header>
    )
};