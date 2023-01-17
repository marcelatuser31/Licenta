import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Pages, RoleType, SweetAlertIcon } from '../../Utils/enums';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import { alpha, Badge, InputBase, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cakeIconStyle, containerStyle, expandedCakeIconStyle, expandedLogoStyle, expandedMenuBoxStyle, imageStyle, logoStyle, menuBoxStyle, myCartButtonStyle, pageButtonStyle, searchComponentStyle, searchIconStyle, searchStyle, settingsBoxStyle } from './Navbar.styles';
import { ARE_YOU_SURE, HEADERS, ORDER_LIST_KEY, PERSON_KEY, QUESTION_INFO_MESSAGE } from '../../Utils/constants';
import axios from 'axios';
import { RoleRoutes } from '../../Utils/Routes/backEndRoutes';
import { IPerson } from '../../Utils/Models/IPerson';
import { getImageURLfromByteArray, getMessage } from '../../Utils/methods';
import { IShoppingList } from '../../Pages/ShoppingCart/ShoppingCart.types';
import SearchIcon from '@mui/icons-material/Search';
import { INavbarProps } from './Navbar.types';
import { DEFAULT_PROFILE_PHOTO } from '../../Utils/images';

const pages = [Pages.Cakes, Pages.Drinks];
const settings = [Pages.Profile];

export const Navbar = (props: INavbarProps): JSX.Element => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate: NavigateFunction = useNavigate();
    const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    const onLogout = async (): Promise<void> => {
        getMessage(SweetAlertIcon.Question, QUESTION_INFO_MESSAGE, ARE_YOU_SURE, onLogoutConfirm)
    }

    const onLogoutConfirm = async (): Promise<void> => {
        const response = await axios.post(RoleRoutes.Logout, person.id, { headers: HEADERS });
        navigate(Pages.LogIn)
        localStorage.removeItem(PERSON_KEY)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Search = styled('div')(({ theme }) => ({
        ...searchStyle(theme)
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        ...searchIconStyle(theme)
    }));

    const SearchComponent = styled(InputBase)(({ theme }) => ({
        ...searchComponentStyle(theme)
    }));

    return (
        <AppBar position="sticky" >
            <Container maxWidth="xl" style={containerStyle}>
                <Toolbar disableGutters >
                    <CakeIcon sx={expandedCakeIconStyle} onClick={() => navigate(Pages.Home)} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={expandedLogoStyle}
                        onClick={() => navigate(Pages.Home)}
                    >
                        SWEET
                    </Typography>

                    <Box sx={expandedMenuBoxStyle}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => navigate(page)}>{page.substring(1)} </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => navigate(Pages.Manage)}>Manage</MenuItem>
                        </Menu>
                    </Box>
                    <CakeIcon sx={cakeIconStyle} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={logoStyle}
                        onClick={() => navigate(Pages.Home)}
                    >
                        SWEET
                    </Typography>
                    <Box sx={menuBoxStyle}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(page)}
                                sx={pageButtonStyle}
                            >
                                {page.substring(1)}
                            </Button>
                        ))}
                        {person.role.type == RoleType.Admin
                            && <Button
                                onClick={() => navigate(Pages.Manage)}
                                sx={pageButtonStyle}
                            >
                                Manage
                            </Button>}
                    </Box>
                    {(props.displaySearch)
                        && <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <SearchComponent
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={props.onSearch}
                                defaultValue={props.searchedItem}
                                autoFocus
                            />
                        </Search>}
                    <div>
                        <Box sx={settingsBoxStyle}>
                            {person.role.type == RoleType.Client
                                && <Badge color="error" badgeContent={shoppingList?.cakes?.length + shoppingList?.drinks.length} className={myCartButtonStyle} onClick={() => navigate(Pages.ShoppingCart)}>
                                    <ShoppingCartIcon />
                                </Badge>}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <img width={48} height={48} src={getImageURLfromByteArray(person.image) || DEFAULT_PROFILE_PHOTO} className={imageStyle}></img>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => navigate(setting)}>
                                        <Typography textAlign="center">{setting.substring(1)}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={onLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}