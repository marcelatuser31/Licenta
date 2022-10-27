import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, styled, Typography } from "@mui/material"
import { Fragment } from "react"
import { ICardProps } from "./Card.types"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { IconButtonProps } from '@mui/material/IconButton';
import React from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from "@mui/material/colors"
import { IIngredient } from "../../Utils/Models/IIngredient"
import { ingredientsNameStyle } from "./Card.styles"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Pages } from "../../Utils/enums"

export const CustomCard = (props: ICardProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState(false);
    const navigate: NavigateFunction = useNavigate()
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

    const onClick = (event: any): void => {
        navigate(Pages.Cake, {
            state: {
                cakeId: props.cakeId,
                title: props.title,
                image: props.image,
                ingredients: props.ingredients,
                price: props.price,
                weight: props.weight,
                expirationDate: props.expirationDate
            }
        })
    }

    return <Fragment >
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader onClick={onClick}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props.title[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
                subheader={props.expirationDate?.toString()}
            />

            <img width={300} height={300} alt={'Not found'} src={props.image} onClick={onClick}
            />
            <CardContent>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div className={ingredientsNameStyle}>Ingredients</div>
                    {props.ingredients?.map((ingredient: IIngredient) =>
                        <Typography variant="body2" color="text.secondary">
                            {ingredient.name}
                        </Typography>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    </Fragment>
}
