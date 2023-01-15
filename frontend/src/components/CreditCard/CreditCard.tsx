import React, { useEffect, useState } from 'react';
import Cleave from 'cleave.js/react';
import 'animate.css';
import './CreditCard.css';
import { HEADERS, PERSON_KEY } from '../../Utils/constants';
import { ICreditCardProps } from './CreditCard.types';
import { IPerson } from '../../Utils/Models/IPerson';
import axios from 'axios';
import { CreditCardRoutes } from '../../Utils/Routes/backEndRoutes';
import { ICreditCard } from '../../Utils/Models/ICreditCard';
import { AMEX_LOGO, DINERS_LOGO, DISCOVER_LOGO, JCB_LOGO, MASTERCARD_LOGO, VISA_LOGO } from '../../Utils/images';

const creditCardImages: string[] = [VISA_LOGO, MASTERCARD_LOGO, DISCOVER_LOGO, AMEX_LOGO, DINERS_LOGO, JCB_LOGO]
const expireMonths: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const expireYears: string[] = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]

export const CreditCard = (props: ICreditCardProps): JSX.Element => {
    const [defaultCreditCard, setDefaultCreditCard] = useState<ICreditCard>()

    const [cardImage, setCardImage] = useState<string>(VISA_LOGO);
    const [creditCardType, setCreditCardType] = useState<string>("")

    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    useEffect(() => {
        const setDefaultCard = async (): Promise<void> => {
            const response = await axios.post(CreditCardRoutes.getCreditCard, person, HEADERS)
            setDefaultCreditCard(response.data)
        }
        setDefaultCard()
    }, [])

    useEffect(() => {
        const setDefaultCreditCardData = (): void => {
            if (!defaultCreditCard)
                return

            props.setCreditCardData(defaultCreditCard)
        }
        setDefaultCreditCardData()
    }, [defaultCreditCard])

    const setCardNumber = (e: { target: { rawValue: string; }; }): void => {
        if (!props.creditCardData)
            return
        props.setCreditCardData({ ...props.creditCardData, cardNumber: e.target.rawValue });
    }

    const setCardType = (type: React.SetStateAction<string>): void => {
        setCreditCardType(type);

        switch (type) {
            case "visa":
                setCardImage(creditCardImages[0])
                break
            case "mastercard":
                setCardImage(creditCardImages[1])
                break
            case "discover":
                setCardImage(creditCardImages[2])
                break
            case "amex":
                setCardImage(creditCardImages[3])
                break
            case "diners":
                setCardImage(creditCardImages[4])
                break
            case "jcb":
                setCardImage(creditCardImages[5])
                break
        }
    }

    const setCardName = (e: { target: { value: string; }; }): void => {
        if (!props.creditCardData)
            return
        props.setCreditCardData({ ...props.creditCardData, cardHolder: e.target.value })
    }

    const setExpMonth = (e: { target: { value: string; }; }): void => {
        if (!props.creditCardData)
            return
        props.setCreditCardData({ ...props.creditCardData, expireMonth: e.target.value })
    }

    const setExpYear = (e: { target: { value: string }; }): void => {
        if (!props.creditCardData)
            return
        props.setCreditCardData({ ...props.creditCardData, cardHolder: e.target.value });
    }

    return (
        <div className="container">
            <form id="form">
                <div id="card">
                    <div className="header">
                        <div className="sticker"></div>
                        <div>
                            <img className="logo" src={cardImage} alt="Card logo" />
                        </div>
                    </div>
                    <div className="body">
                        <h2 id="creditCardNumber">{props.creditCardData?.cardNumber}</h2>
                    </div>
                    <div className="footer">
                        <div>
                            <h5>Card Holder</h5>
                            <h3>{props.creditCardData?.cardHolder}</h3>
                        </div>
                        <div>
                            <h5>Expires</h5>
                            <h3>{props.creditCardData?.expireMonth} / {props.creditCardData?.expireYear}</h3>
                        </div>
                    </div>
                </div>
                <div className="input-container mt">
                    <h4>Enter card number</h4>
                    <Cleave
                        options={{
                            creditCard: true,
                            onCreditCardTypeChanged: setCardType,
                            delimiter: "-"
                        }}
                        onChange={setCardNumber}
                        placeholder={defaultCreditCard?.cardNumber}
                    />
                </div>
                <div className="input-container">
                    <h4>Card Holder</h4>
                    <input onChange={setCardName} type="text" placeholder={defaultCreditCard?.cardHolder} required />
                </div>
                <div className="input-grp">
                    <div className="input-container">
                        <h4>Expiration Year</h4>
                        <select value={props.creditCardData?.expireYear} defaultValue={defaultCreditCard?.expireYear} onChange={setExpYear}>
                            {expireYears.map((year: string) => {
                                return <option value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-container">
                        <h4>Month</h4>
                        <select value={props.creditCardData?.expireMonth} defaultValue={defaultCreditCard?.expireMonth} onChange={setExpMonth}>
                            {expireMonths.map((month: string) => {
                                return <option value={month}>{month}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-container">
                        <h4>CVV</h4>
                        <input type="password" placeholder="CVV" required />
                    </div>
                </div>
            </form>
        </div>
    );
}