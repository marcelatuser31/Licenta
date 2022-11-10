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
                <Stack gap="10" >
                    <StackItem className={sectionTitle}>
                        General Information
                    </StackItem>
                    <Section name="Name:" contentValue={<TextField value={person?.name} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                    <Section name="Address:" contentValue={<TextField value={person?.address} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                    <Section name="Phone:" contentValue={<TextField value={person?.phone} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                    <Section name="Email:" contentValue={<TextField value={person?.role.email} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                    <Section name="Username:" contentValue={<TextField value={person?.role.username} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                    <Section name="Password:" contentValue={<TextField value={person?.role.password} className={textFieldStyles} style={{ height: 100 }}></TextField>} isHorizontal={true} labelStyle={labelStyle} valueStyle={valueStyle} gap={20} />
                </Stack>
            </StackItem>
        </Stack >
    </div >
}