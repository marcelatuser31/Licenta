import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, styled, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { ICardProps, IFavoriteItem } from "./CustomCard.types"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { IconButtonProps } from '@mui/material/IconButton';
import React from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IIngredient } from "../../Utils/Models/IIngredient"
import { avatarStyle, cardHeaderStyle, cardStyle, ingredientsNameStyle } from "./CustomCard.styles"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { FAVORITE_ITEMS_LIST_KEY, PERSON_KEY } from "../../Utils/constants"
import { Stack } from "@fluentui/react"
import { IPerson } from "../../Utils/Models/IPerson"
import { RoleType } from "../../Utils/enums"

export const CustomCard = (props: ICardProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState(false);
    const navigate: NavigateFunction = useNavigate()
    const [isFavorite, setIsFavorite] = useState<Boolean>(props.isFavorite)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    React.useEffect(() => {
        setIsFavorite(props.isFavorite)
    }, [props.isFavorite])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const onCardClick = (event: any): void => {
        navigate(props.redirectTo, {
            state: {
                id: props.id,
                title: props.title,
                image: props.image,
                ingredients: props.ingredients,
                price: props.price,
                weight: props.weight,
                expirationDate: props.expirationDate
            }
        })
    }

    const onFavoriteIcon = (event: any): void => {
        const favoriteList: IFavoriteItem[] = JSON.parse(localStorage.getItem(FAVORITE_ITEMS_LIST_KEY) as string)

        if (!isFavorite) {
            const newItem: IFavoriteItem = {
                id: props.id,
                name: props.title,
                price: props.price
            }
            favoriteList.push(newItem)
            localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify(favoriteList))
        }
        else {
            const removeList: IFavoriteItem[] = favoriteList.filter(i => i.id !== props.id)
            localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify(removeList))
        }
        setIsFavorite(!isFavorite)
    }

    return <Fragment >
        <Card sx={cardStyle}>
            <Stack>
                <span title={props.title}>
                    <CardHeader onClick={onCardClick}
                        avatar={
                            <Avatar sx={avatarStyle} aria-label="recipe">
                                {props.title[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={props.title}
                        style={cardHeaderStyle}
                        subheader={props.price?.toString() + ((props.hideIngredients) ? ' RON' : ' RON/KG')}
                    />
                </span>
                <img width={300} height={300} alt={'Not found'} src={props.image} onClick={onCardClick}
                />
                <CardContent>
                </CardContent>
                <CardActions disableSpacing>
                    {person.role.type == RoleType.Client &&
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon color={isFavorite ? "error" : "inherit"} onClick={onFavoriteIcon} />
                        </IconButton>}
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {!props.hideIngredients
                        && <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>}
                </CardActions>
                {!props.hideIngredients
                    && <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div className={ingredientsNameStyle}>Ingredients</div>
                            {props.ingredients?.map((ingredient: IIngredient) =>
                                <Typography variant="body2" color="text.secondary">
                                    {ingredient.name}
                                </Typography>
                            )}
                        </CardContent>
                    </Collapse>}
            </Stack>
        </Card>
    </Fragment>
}    