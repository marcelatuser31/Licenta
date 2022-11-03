import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, styled } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { customCardStyle } from "../../components/Card/Card.styles"
import { CustomCard } from "../../components/Card/CustomCard"
import { Navbar } from "../../components/Navbar/Navbar"
import { SelectedMenu } from "../../components/SelectedMenu/SelectedMenu"
import { HEADERS, IMAGE_HEADERS } from "../../Utils/constants"
import { getImageURLfromByteArray, onUploadPhoto } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { cakesContainerStyles, choiceGroupStyle } from "./Home.styles"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { selectedMenuStyle } from '../../Pages/Home/Home.styles';

export const Input = styled('input')({ display: 'none' })
const getCard = (cake: ICake): JSX.Element => {
    return <div className={customCardStyle} key={cake.id}>
        <CustomCard
            cakeId={cake.id}
            title={cake.name}
            expirationDate={cake.expirationDate}
            ingredients={cake.ingredients}
            image={getImageURLfromByteArray(cake.image)}
            price={cake.price}
            weight={cake.weight}
        />
    </div>
}

export const Home = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [cakeTypes, setCakeTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All');
    const navigate: NavigateFunction = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);




    const option = [
        'Ascending',
        'Descending',
    ];

    const options: IChoiceGroupOption[] =
        cakeTypes.map((type: string) => {
            return {
                key: type,
                text: type
            }
        })

    const onChoiceGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        if (option === undefined)
            return
        setSelectedType(option.text)
    }

    useEffect(() => {
        const getData = async (): Promise<any> => {
            const response = await axios.get(CakeRoutes.GetTypes);
            const types: string[] = response.data
            types.push('All');
            setCakeTypes(types)
        }
        getData();
        const getCakesByType = async (): Promise<any> => {
            if (selectedType === 'All') {
                const response = await axios.get(CakeRoutes.GetAll)
                setCakes(response.data)
            } else {
                const response = await axios.post(CakeRoutes.GetCakesByType, cakeTypes.indexOf(selectedType), { headers: HEADERS })
                setCakes(response.data)
            }
        }
        getCakesByType()

    }, [selectedType])

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if (selectedIndex === 1) {
            const ascendingCakesList: ICake[] = cakes.sort((a: ICake, b: ICake) => (a.price > b.price) ? 1 : -1)
            setCakes(ascendingCakesList)
        } else if (selectedIndex === 0) {
            const descendingCakesList: ICake[] = cakes.sort((a: ICake, b: ICake) => (a.price < b.price) ? 1 : -1)
            setCakes(descendingCakesList)
        }
        console.log(cakes)
    };

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)
        }
        getData()
    }, [])

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem>
                <Stack>
                    <StackItem>
                        <ChoiceGroup
                            onChange={onChoiceGroupChange}
                            className={choiceGroupStyle}
                            defaultSelectedKey="B"
                            options={options}
                        />
                    </StackItem>
                    <StackItem>
                        <div className={selectedMenuStyle}>
                            <List
                                component="nav"
                                aria-label="Device settings"
                                sx={{ bgcolor: 'background.paper' }}
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
                                        primary="Sort by price"
                                        secondary={option[selectedIndex]}
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
                                {option.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </StackItem>
                </Stack>
            </StackItem>
            <StackItem className={cakesContainerStyles}>
                {
                    cakes.length > 0 ?
                        cakes.map((cake: ICake) => getCard(cake))
                        : undefined
                }
            </StackItem>
        </Stack>

    </>
}