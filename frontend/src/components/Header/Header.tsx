
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { Pages } from '../../Utils/enums';
import { buttonStyle, menuStyle } from './Header.styles';

export const Header = (): JSX.Element => {
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate: NavigateFunction = useNavigate()
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

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

    const menuToggleHandler = () => {
        setMenuOpen(!menuOpen);
    }

    const redirect = (path: string): void => {
        navigate(path);
    };

    return (<header className={classes.header}>
        <div className={classes.header_content}>
            <h2 className={classes.header_content_logo}> Sweet </h2>
            <nav className={`${classes.header_content_nav} ${menuOpen ? classes.isMenu : ""}`}>
                <ul >
                    <li >
                        <Link className={menuStyle} to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link className={menuStyle} to="/LogIn" >LogIn</Link>
                    </li >
                    <li >
                        <Link className={menuStyle} to="/Register" >Register</Link>
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