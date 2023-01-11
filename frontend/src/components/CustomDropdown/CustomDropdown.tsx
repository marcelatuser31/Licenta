import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { selectedMenuStyle } from '../../Pages/Cakes/Cakes.styles';
import { ICustomDropdownProps } from './CustomDropdown.types';

export const CustomDropdown = (props: ICustomDropdownProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        props.setDefaultValue(props.options[index]);
        if (props.onSelectItem)
            props.onSelectItem()
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={selectedMenuStyle}>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper', width: '130%', paddingBottom: 0, paddingTop: 0 }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}

                >
                    <ListItemText
                        primary={props.name}
                        secondary={props.defaultValue}

                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {props.options.map((option: string, index: number) => (
                    <MenuItem
                        key={option}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
