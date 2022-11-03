import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import { IIngredient } from "../../Utils/Models/IIngredient"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { addToCartStyle, choiceGroupStyle, imageStyle, labelStyle, textFieldStyle, title, valueStyle } from "./Cake.styles"
import { useState } from "react"
import { ICakeOrder } from "./Cake.types"
import { ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants"
import { IPerson } from "../../Utils/Models/IPerson"
import { RoleType } from "../../Utils/enums"
import { Input } from "../Home/Home"
import { onUploadPhoto } from "../../Utils/methods"
import { Section } from "../../components/Section/Section"
import { SelectedMenu } from "../../components/SelectedMenu/SelectedMenu"

const options: IChoiceGroupOption[] = [
    { key: 'A', text: '0.5kg', styles: { root: { marginLeft: 0 } } },
    { key: 'B', text: '1kg', styles: { root: { marginLeft: 20 } } },
    { key: 'C', text: '1.5kg', styles: { root: { marginLeft: 20 } } },
    { key: 'D', text: '2kg', styles: { root: { marginLeft: 20 } } },
];

export const Cake = (): JSX.Element => {
    const [cakeMessage, setCakeMessage] = useState<string>('');
    const [selectedWeight, setSelectedWeight] = useState<number>(1);
    const location = useLocation()
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    const onCheckBoxGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        setSelectedWeight(Number(option?.text.substring(0, option.text.length - 2)))
    }

    const onClick = (event: any): void => {
        const newCake: ICakeOrder = {
            cakeId: location.state.cakeId,
            name: location.state.title,
            price: location.state.price * selectedWeight,
            cakeMessage: cakeMessage,
            weight: selectedWeight
        }
        const cakeList: ICakeOrder[] = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
        cakeList.push(newCake)
        localStorage.setItem('order', JSON.stringify(cakeList))
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        setCakeMessage(value);
    }

    const getIngredientsContent = (): JSX.Element => {
        return <Stack horizontal={true} gap='10'>
            {location.state.ingredients?.map((ingredient: IIngredient) =>
                <Typography>
                    {ingredient.name}
                </Typography>)}
        </Stack>
    }

    const getWeightContent = (): JSX.Element => {
        return <ChoiceGroup onChange={onCheckBoxGroupChange}
            styles={choiceGroupStyle}
            defaultSelectedKey="B"
            options={options}
        />
    }

    const getMessageContent = (): JSX.Element => {
        return <TextField className={`${valueStyle} ${textFieldStyle}`}
            onChange={onChange}
            style={{ borderColor: "red", width: "25vw" }}
            margin="normal"
            required
            fullWidth
            id="CakeMessage"
            name="CakeMessage"
            autoFocus
        />
    }

    const getUploadContent = (): JSX.Element => {
        return <Button variant="contained" component="label">
            Upload
            <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={(event: any) => onUploadPhoto(event, location.state.cakeId)} />
        </Button>
    }

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80' >
            <StackItem>
                <img width={600} height={600} alt={'Not found'} src={location.state.image} className={imageStyle} />
            </StackItem>
            <StackItem>
                <Stack gap='30'>
                    <StackItem className={title}>
                        {location.state.title}
                    </StackItem>
                    <Section name={"Price:"} contentValue={(location.state.price * selectedWeight).toString() + ' RON'} />
                    <Section name={"Weight:"} contentValue={getWeightContent()} />
                    <Section name={"Ingredients:"} contentValue={getIngredientsContent()} />
                    <Section name={"Cake Message:"} contentValue={getMessageContent()}></Section>
                    {person.role.type == RoleType.Admin
                        ? <Section name={"Upload Photo:"} contentValue={getUploadContent()}></Section>
                        : undefined}

                </Stack>

            </StackItem>
            <StackItem align="center">
                <Button variant="contained" className={addToCartStyle} endIcon={<ShoppingCartCheckoutIcon />} onClick={onClick} >Add to cart</Button>
            </StackItem>
        </Stack >
    </>
}