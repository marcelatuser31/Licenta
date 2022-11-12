import { Stack, StackItem } from "@fluentui/react"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { HEADERS, PERSON_KEY } from "../../Utils/constants"
import { getImageURLfromByteArray, onUploadProfilePhoto } from "../../Utils/methods"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"
import { Input } from "../Home/Home"
import { innerDiv, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"
import { informationStackStyle, labelStyle, photoStackStyle, sectionTitle, textFieldStyles, valueStyle } from "./Profile.styles"

export const Profile = (): JSX.Element => {
    const [person, setPerson] = useState<IPerson>(JSON.parse(localStorage.getItem(PERSON_KEY) as string));

    useEffect(() => {
        setPerson(JSON.parse(localStorage.getItem(PERSON_KEY) as string))
    }, [])

    const onUploadPhoto = async (event: any): Promise<void> => {
        const id: number = JSON.parse(localStorage.getItem(PERSON_KEY) as string)?.id.toString();
        onUploadProfilePhoto(event, id.toString())
        const response: any = await axios.post(PersonRoutes.ReadById, id, { headers: HEADERS })
        setPerson(response.data)
    }

    const getSection = (name: string, textFieldValue: string): JSX.Element => {
        return <Section name={name}
            contentValue={<TextField value={textFieldValue} className={textFieldStyles} style={{ height: 100 }}></TextField>}
            isHorizontal={true}
            labelStyle={labelStyle}
            valueStyle={valueStyle}
            gap={20}
        />
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
                </Stack>
            </StackItem>
        </Stack >
    </div >
}