import React, { useState } from 'react';
import Cleave from 'cleave.js/react';

import 'animate.css';
import './CreditCard.css';
import { AMEX_LOGO, DINERS_LOGO, DISCOVER_LOGO, JCB_LOGO, MASTERCARD_LOGO, VISA_LOGO } from '../../Utils/constants';

const creditCardImages: string[] = [
    VISA_LOGO,
    MASTERCARD_LOGO,
    DISCOVER_LOGO,
    AMEX_LOGO,
    DINERS_LOGO,
    JCB_LOGO]

const expireMonths: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]

const expireYears: string[] = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]

export const CreditCard = (): JSX.Element => {
    const [cardNumber, setCardNumber] = useState('#### #### #### ####');
    const [cardType, setCardType] = useState('')
    const [cardHolder, setCardHolder] = useState('Your Full Name');
    const [expireMonth, setExpireMonth] = useState('MM');
    const [expireYear, setExpireYear] = useState('YYYY');
    const [cardTypeUrl, setCardTypeUrl] = useState(VISA_LOGO);

    const getCardNumber = (e: { target: { rawValue: React.SetStateAction<string>; }; }): void => {
        setCardNumber(e.target.rawValue);
    }

    const getCardType = (type: React.SetStateAction<string>): void => {
        setCardType(type);

        if (type === "visa") {
            setCardTypeUrl(creditCardImages[0]);
        } else if (type === "mastercard") {
            setCardTypeUrl(creditCardImages[1]);
        } else if (type === "discover") {
            setCardTypeUrl(creditCardImages[2]);
        } else if (type === "amex") {
            setCardTypeUrl(creditCardImages[3]);
        } else if (type === "diners") {
            setCardTypeUrl(creditCardImages[4])
        } else if (type === "jcb") {
            setCardTypeUrl(creditCardImages[5]);
        }
    }

    const getCardName = (e: { target: { value: React.SetStateAction<string>; }; }): void => {
        setCardHolder(e.target.value);
    }

    const getExpMonth = (e: { target: { value: React.SetStateAction<string>; }; }): void => {
        setExpireMonth(e.target.value);
    }

    const getExpYear = (e: { target: { value: React.SetStateAction<string>; }; }): void => {
        setExpireYear(e.target.value);
    }

    return (
        <div className="container">
            <form id="form">
                <div id="card">
                    <div className="header">
                        <div className="sticker"></div>
                        <div>
                            <img className="logo" src={cardTypeUrl} alt="Card logo" />
                        </div>
                    </div>
                    <div className="body">
                        <h2 id="creditCardNumber">{cardNumber}</h2>
                    </div>
                    <div className="footer">
                        <div>
                            <h5>Card Holder</h5>
                            <h3>{cardHolder}</h3>
                        </div>
                        <div>
                            <h5>Expires</h5>
                            <h3>{expireMonth} / {expireYear}</h3>
                        </div>
                    </div>
                </div>
                <div className="input-container mt">
                    <h4>Enter card number</h4>
                    <Cleave
                        options={{
                            creditCard: true,
                            onCreditCardTypeChanged: getCardType,
                            delimiter: "-"
                        }}
                        onChange={getCardNumber}
                        placeholder="Please enter your credit card number"
                    />
                </div>
                <div className="input-container">
                    <h4>Card Holder</h4>
                    <input onChange={getCardName} type="text" placeholder="Please enter your full name" required />
                </div>
                <div className="input-grp">
                    <div className="input-container">
                        <h4>Expiration Year</h4>
                        <select value={expireYear} onChange={getExpYear}>
                            {expireYears.map((year: string) => {
                                return <option value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-container">
                        <h4>Month</h4>
                        <select value={expireMonth} onChange={getExpMonth}>
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
                <button>{`Submit ${cardType} payment`}</button>
            </form>
        </div>
    );
}