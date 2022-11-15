import { Stack, StackItem } from "@fluentui/react"
import { Button, TextField } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import { IFavoriteItems } from "../../components/Card/Card.types"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { FAVORITE_ITEMS_LIST_KEY, HEADERS, PERSON_KEY } from "../../Utils/constants"
import { getImageURLfromByteArray, onUploadProfilePhoto } from "../../Utils/methods"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"
import { Input } from "../Home/Home"
import { innerDiv, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"
import { favoriteListStyle, informationStackStyle, labelStyle, photoStackStyle, sectionTitle, textFieldStyles, valueStyle } from "./Profile.styles"

export const Profile = (): JSX.Element => {
    const [person, setPerson] = useState<IPerson>(JSON.parse(localStorage.getItem(PERSON_KEY) as string));
    const [items, setItems] = useState<IFavoriteItems[]>(JSON.parse(localStorage.getItem(FAVORITE_ITEMS_LIST_KEY) as string))

    useEffect(() => {
        setPerson(JSON.parse(localStorage.getItem(PERSON_KEY) as string))
    }, [])

    const rows: any = items.map((item: IFavoriteItems) => {
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

    const onUploadPhoto = async (event: any): Promise<void> => {
        const id: number = JSON.parse(localStorage.getItem(PERSON_KEY) as string)?.id.toString();
        onUploadProfilePhoto(event, id.toString())
        const response: any = await axios.post(PersonRoutes.ReadById, id, { headers: HEADERS })
        setPerson(response.data)
    }

    const getSection = (name: string, textFieldValue: string): JSX.Element => {
        return <Section name={name}
            contentValue={<TextField name={name} defaultValue={textFieldValue} className={textFieldStyles} style={{ height: 100, maxWidth: 250 }} onChange={onChange} id={name}></TextField>}
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
            console.log(response.data)
            localStorage.setItem(PERSON_KEY, JSON.stringify(response.data))
        }
        getData()
    }

    return <div>
        <Navbar />
        <Stack horizontal={true} gap='120'>
            <StackItem className={photoStackStyle}>
                <Stack gap="20">
                    <StackItem>
                        <img width={260} height={300} alt={'Not found'} src={getImageURLfromByteArray(person?.image)}></img>
                    </StackItem>
                    <StackItem>
                        <div className={outerDiv}>
                            <div className={innerDiv}>
                                <Button variant="contained" component="label">
                                    Upload Photo
                                    <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={onUploadPhoto} />
                                </Button>
                            </div>
                        </div>
                    </StackItem>
                </Stack>
            </StackItem>
            <StackItem className={informationStackStyle}>
                <Stack gap="5" >
                    <StackItem className={sectionTitle}>
                        General Information
                    </StackItem>
                    {getSection("Name:", person.name)}
                    {getSection("Address:", person.address)}
                    {getSection("Phone:", person.phone)}
                    {getSection("Email:", person.role.email)}
                    {getSection("Username:", person.role.username)}
                    {getSection("Password:", person.role.password)}
                    <StackItem>
                        <Button
                            onClick={onEditProfile} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                        >
                            Edit Profile
                        </Button>
                    </StackItem>
                </Stack>
            </StackItem>
            <StackItem style={{ position: 'relative', top: 32, maxWidth: 800, }}>
                <Stack>
                    <StackItem className={sectionTitle}>
                        Favorite List
                    </StackItem>
                </Stack>
                <DataGrid
                    //  components={{ Toolbar: CustomToolbar }}
                    style={{ width: 1000, height: 695, }}
                    componentsProps={{ toolbar: { left: 2 } }}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    experimentalFeatures={{ newEditingApi: true }}
                // onSelectionModelChange={onSelectionModelChange}
                />
            </StackItem>
        </Stack >
    </div >
}