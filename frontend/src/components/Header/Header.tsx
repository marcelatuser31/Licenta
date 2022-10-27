import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { Pages } from '../../Utils/enums';
import { filterButtonStyle, logOutButtonStyle, menuStyle, myCartButtonStyle } from './Header.styles';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { IContextualMenuItem, IContextualMenuProps, ISize } from '@fluentui/react';
import { IHeaderProps } from './Header.types';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Button, ButtonProps, styled } from '@mui/material';
import { purple } from '@mui/material/colors';
import { ICakeOrder } from '../../Pages/Cake/Cake.types';

export const Header = (props: IHeaderProps): JSX.Element => {
    const [menuOpen, setMenuOpen] = useState<boolean>(true);
    const [cakeListLength, setCakeListLength] = useState<number>(0);

    const [size, setSize] = useState<ISize>({
        width: 0,
        height: 0,
    });

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const handleResize = (): void => {
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

    const menuToggleHandler = (): void => {
        setMenuOpen(!menuOpen);
    }

    const redirect = (path: string): void => {
        navigate(path);
    };

    const onClick = (event: any, item?: IContextualMenuItem): void => {
        if (item == undefined)
            return;

        props.setSelectedType(item.key)
    }

    const menuProps: IContextualMenuProps = {
        items:
            props.cakeTypes.map((type: string) => {
                return {
                    key: type,
                    text: type,
                }
            }
            ),
        onItemClick: onClick
    };

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: 'white',
    }));

    const newCakeList: ICakeOrder[] = JSON.parse(localStorage.getItem('order') as string)
    useEffect(() => {
        const length: number = newCakeList.length
        setCakeListLength(length)
    }, [newCakeList])

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
                <ColorButton className={logOutButtonStyle} style={{ padding: "0.5rem 1rem" }} variant="contained">LogOut</ColorButton>
                <Badge color="primary" badgeContent={cakeListLength} className={myCartButtonStyle} onClick={() => redirect(Pages.ShoppingCart)}><ShoppingCartOutlinedIcon /></Badge>
            </nav>
            <div className={classes.header_content_toggle}>
                {!menuOpen ? <MenuIcon onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
            </div>
        </div>
    </header>
    )
};