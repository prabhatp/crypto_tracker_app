import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    selectbutton: {
        border: "1px solid gold",
        width: '22%',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: props => props.selected ? 'gold' : '',
        color: props => props.selected ? "#fff" : '',
        fontWeight: props => props.selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: '#000'
        },
    }
}))

const SelectButton = (props) => {
    const { children, onClick } = props;
    const classes = useStyles(props);
    return (
        <span
            onClick={onClick} 
            className={classes.selectbutton}
        >
            {children}
        </span>
    )
}

export default SelectButton