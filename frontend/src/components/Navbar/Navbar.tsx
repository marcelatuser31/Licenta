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
import { Pages } from '../../Utils/enums';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cakeIconStyle, expandedCakeIconStyle, expandedLogoStyle, expandedMenuBoxStyle, imageStyle, logoStyle, menuBoxStyle, myCartButtonStyle, settingsBoxStyle } from './Navbar.styles';
import { IItemOrder } from '../../Pages/Cake/Cake.types';
import { HEADERS, ORDER_LIST_KEY, PERSON_KEY } from '../../Utils/constants';
import axios from 'axios';
import { RoleRoutes } from '../../Utils/Routes/backEndRoutes';
import { IPerson } from '../../Utils/Models/IPerson';
import { getImageURLfromByteArray } from '../../Utils/methods';

const pages = [Pages.Home, Pages.LogIn];
const settings = [Pages.Profile];

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate: NavigateFunction = useNavigate();
    const newCakeList: IItemOrder[] = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    const onLogout = async (event: any): Promise<void> => {
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

    return (
        <AppBar position="static" >
            <Container maxWidth="xl" style={{ marginLeft: 0, maxWidth: 2000 }}>
                <Toolbar disableGutters >
                    <CakeIcon sx={expandedCakeIconStyle} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={expandedLogoStyle}
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
                                    <Typography textAlign="center">{page.substring(1)}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <CakeIcon sx={cakeIconStyle} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={logoStyle}
                    >
                        SWEET
                    </Typography>
                    <Box sx={menuBoxStyle}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.substring(1)}
                            </Button>
                        ))}
                    </Box>
                    <div>
                        <Box sx={settingsBoxStyle}>
                            <Badge color="error" badgeContent={newCakeList.length} className={myCartButtonStyle} onClick={() => navigate(Pages.ShoppingCart)}>
                                <ShoppingCartIcon />
                            </Badge>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <img width={48} height={48} alt={'Not found'} src={getImageURLfromByteArray(person.image)} className={imageStyle}></img>
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