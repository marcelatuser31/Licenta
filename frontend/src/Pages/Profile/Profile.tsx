import { Stack, StackItem } from "@fluentui/react"
import { Button, TextField } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import { IFavoriteItem } from "../../components/CustomCard/CustomCard.types"
import { CustomList } from "../../components/List/CustomList"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { FAVORITE_ITEMS_LIST_KEY, HEADERS, PERSON_KEY } from "../../Utils/constants"
import { DEFAULT_PROFILE_PHOTO } from "../../Utils/images"
import { getImageURLfromByteArray, onUploadPhoto } from "../../Utils/methods"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"
import { Input } from "../Cakes/Cakes"
import { innerDiv, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"
import { saveButtonStyle, informationStackStyle, labelStyle, photoStackStyle, sectionTitleStyle, textFieldStyle, valueStyle } from "./Profile.styles"

export const Profile = (): JSX.Element => {
    const [person, setPerson] = useState<IPerson>(JSON.parse(localStorage.getItem(PERSON_KEY) as string));
    const [items, setItems] = useState<IFavoriteItem[]>(JSON.parse(localStorage.getItem(FAVORITE_ITEMS_LIST_KEY) as string))

    useEffect(() => {
        setPerson(JSON.parse(localStorage.getItem(PERSON_KEY) as string))
    }, [])

    const rows: any = items.map((item: IFavoriteItem) => {
        return {
            id: item.id,
            price: item.price,
            name: item.name,
        }
    })

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', resizable: true },
        { field: 'name', headerName: 'Name', width: 150, },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
    ];

    const onUploadProfilePhoto = async (event: any): Promise<void> => {
        const id: number = JSON.parse(localStorage.getItem(PERSON_KEY) as string)?.id.toString();
        await onUploadPhoto(event, id.toString(), PersonRoutes.AddImage)
        const response: any = await axios.post(PersonRoutes.GetById, id, { headers: HEADERS })
        localStorage.setItem(PERSON_KEY, JSON.stringify(response.data))
        setPerson(response.data)
    }

    const getTextField = (name: string, textFieldValue: string): JSX.Element => {
        return <TextField name={name}
            defaultValue={textFieldValue}
            className={textFieldStyle}
            style={{ height: 100, maxWidth: 250 }}
            onChange={onChange}
            id={name}></TextField>
    }

    const getSection = (name: string, textFieldValue: string): JSX.Element => {
        return <Section name={name}
            contentValue={getTextField(name, textFieldValue)}
            isHorizontal={true}
            labelStyle={labelStyle}
            valueStyle={valueStyle}
            gap={20}
        />
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case "Name:":
                setPerson({ ...person, name: value })
                break
            case "Address:":
                setPerson({ ...person, address: value })
                break
            case "Phone:":
                setPerson({ ...person, phone: value })
                break
            case "Username:":
                setPerson({ ...person, role: { ...person.role, username: value } })
                break;
            case "Password:":
                setPerson({ ...person, role: { ...person.role, password: value } })
                break
            case "Email:":
                setPerson({ ...person, role: { ...person.role, email: value } })
                break
        }
    }

    const onEditProfile = (event: any): void => {
        const getData = async (): Promise<void> => {
            const response = await axios.post(PersonRoutes.Update, person)
            localStorage.setItem(PERSON_KEY, JSON.stringify(response.data))
        }
        getData()
    }

    const onDeleteItems = (items: any[]): void => {
        localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify(items))
    }

    return <div>
        <Navbar />
        <Stack horizontal={true} gap='120'>
            <StackItem className={photoStackStyle}>
                <Stack gap="20">
                    <StackItem>
                        <img width={280} height={300} alt={'Not found'} src={getImageURLfromByteArray(person?.image) || DEFAULT_PROFILE_PHOTO}></img>
                    </StackItem>
                    <StackItem>
                        <div className={outerDiv}>
                            <div className={innerDiv}>
                                <Button variant="contained" component="label">
                                    Upload Photo
                                    <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={onUploadProfilePhoto} />
                                </Button>
                            </div>
                        </div>
                    </StackItem>
                </Stack>
            </StackItem>
            <StackItem className={informationStackStyle}>
                <Stack gap="20" >
                    <StackItem className={sectionTitleStyle}>
                        General Information
                    </StackItem>
                    {getSection("Name:", person.name)}
                    {getSection("Address:", person.address)}
                    {getSection("Phone:", person.phone)}
                    {getSection("Email:", person.role.email)}
                    {getSection("Username:", person.role.username)}
                    {getSection("Password:", person.role.password)}
                    <StackItem align="center">
                        <Button
                            onClick={onEditProfile} type="submit" fullWidth variant="contained" sx={saveButtonStyle}
                        >
                            Save
                        </Button>
                    </StackItem>
                </Stack>
            </StackItem>
            {items.length !== 0
                && <StackItem style={{ position: 'relative', top: 32, maxWidth: 1000, }}>
                    <Stack>
                        <StackItem align='center' className={sectionTitleStyle}>
                            Favorite List
                        </StackItem>
                    </Stack>
                    <CustomList items={rows} columns={columns} onDeleteItems={onDeleteItems} width={800}></CustomList>
                </StackItem>
            }
        </Stack >
    </div >
}