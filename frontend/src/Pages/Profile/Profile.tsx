import { Stack, StackItem } from "@fluentui/react"
import { Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { ProfileSection } from "../../components/ProfileSection/ProfileSection"
import { HEADERS, PERSON_KEY } from "../../Utils/constants"
import { getImageURLfromByteArray, onUploadProfilePhoto } from "../../Utils/methods"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"
import { Input } from "../Home/Home"
import { innerDiv, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"
import { imageStyle, informationStackStyle, labelStyle, photoStackStyle, sectionTitle } from "./Profile.styles"

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
                        <img width={260} height={300} alt={'Not found'} src={getImageURLfromByteArray(person?.image)} className={imageStyle}></img>
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
                <Stack gap="20" >
                    <StackItem className={sectionTitle}>
                        General Information
                    </StackItem>
                    <ProfileSection name="Name:" contentValue={person?.name} />
                    <ProfileSection name="Address:" contentValue={person?.address} />
                    <ProfileSection name="Phone:" contentValue={person?.phone} />
                    <ProfileSection name="Email:" contentValue={person?.role.email} />
                    <ProfileSection name="Username:" contentValue={person?.role.username} />
                    <ProfileSection name="Type:" contentValue={person?.role.type} />
                </Stack>
            </StackItem>
        </Stack >
    </div >
}