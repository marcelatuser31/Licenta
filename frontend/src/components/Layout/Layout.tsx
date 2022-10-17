import React from 'react'
import { Header } from '../Header/Header';
import classes from './Layout.module.scss';

export const Layout = ({ children }: any): JSX.Element => {
    return (
        <>
            <Header />
            <div className={classes.container}>{children}</div>
        </>
    )
}