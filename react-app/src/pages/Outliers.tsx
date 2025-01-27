import DjangoTable from '../components/DjangoTable';
import { IIndexMember } from '../interfaces';
import { useEffect, useReducer } from 'react';
import { getIndexMembers } from '../components/axiosFunctions';
import { Accordion, Row, Col } from 'react-bootstrap';
import OutlierUpdateForm from '../components/OutlierUpdateForm';
import LoginForm from '../components/LoginForm';

function outlierReducer(outliers, action) {
    switch (action.type) {
        case 'add': {
            return [...outliers, action.outlier];
        }
        case 'delete': {
            // return outliers.filter(e => e !== action.outlier)
            return outliers.filter(e => e !== action.outlier)
        }
        case 'update': {
            // return outliers.filter(e => e !== action.outlier)
            outliers = outliers.filter(e => e.ticker !== action.outlier.ticker)
            return [...outliers, action.outlier]
        }
        case 'refresh': {
            return [...outliers]
        }
    }
}

export default function Outliers() {
    const [outliers, dispatch] = useReducer(outlierReducer, []);

    let data: IIndexMember[] = []
    useEffect(() => {
        if (outliers.length == 0) {
            getIndexMembers()
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].outlier == true) {
                            data.push({
                                ticker: response.data[i].stock.ticker,
                                name: response.data[i].stock.name,
                                marketCap: response.data[i].stock.marketCap,
                                volume: response.data[i].stock.volume,
                                volumeUSD: response.data[i].stock.volumeUSD,
                                freeFloat: response.data[i].stock.freeFloat,
                                freeFloatMarketCap: response.data[i].stock.freeFloatMarketCap,
                                countryIncorp: response.data[i].stock.countryIncorp,
                                countryHQ: response.data[i].stock.countryHQ,
                                securityType: response.data[i].stock.securityType,
                                yearIPO: response.data[i].stock.yearIPO,
                                percent: response.data[i].percent,
                                index: response.data[i].index,
                                outlier: response.data[i].outlier,
                                notes: response.data[i].notes,
                                id: response.data[i].id
                            })
                        }
                    }
                    for (let i = 0; i < data.length; i++) {
                        dispatch({ type: "add", outlier: data[i] })
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }, []);

    const fields = {
        ticker: { name: "Ticker", type: "text" },
        name: { name: "Name", type: "text" },
        marketCap: { name: "Market Cap", type: "money" },
        volume: { name: "Volume Daily Shares", type: "amount" },
        volumeUSD: { name: "Volume Daily USD", type: "money" },
        freeFloat: { name: "Free Float Percent", type: "amount" },
        freeFloatMarketCap: { name: "Free Float Market Cap", type: "money" },
        countryIncorp: { name: "Country of Incorporation", type: "text" },
        countryHQ: { name: "HQ Location", type: "text" },
        securityType: { name: "Security Type", type: "text" },
        yearIPO: { name: "IPO Year", type: "text" },
        notes: { name: "Notes", type: "text" },
    }

    return (
        <>
            <h4>Why are these stocks not in the Russell 1000?</h4>
            <p>I started with all the tickers on the NASDAQ and NYSE. The Russell 1000 aims to track the 1000 largest publically traded US companies, so many tickers were immediatly excluded from the universe.
                Security types such as ETFs, and MLPs were omitted, while common stock, and REITs were included. Domiciles are decided for all companies and only US based companies are included.
                Domicile is largely determined by HQ location, but country of incorporation also comes into consideration.
                I know I am missing some "foreign" companies considered US companies because of revenue / assets in the US. Such as Spotify (SPOT).
                My bigger concern is that I am still including too many tickers.
                Perhaps I am including some US based companies considered foriegn because of revenue, but for many of these companies this is not the case.
                The "outliers" are tickers that are part the my calculated index, but is not actually part of the Rusell 1000.
                In other words, The Russell 1000 excludes companies such as Chewy (CHWY), Reddit (RDDT), and Symbotic (SYM) and I am not sure why.
                I believe some, such as Snapchat (SNAP) are not included because of voting rights assessable to the public being below 5%, but I am not 100% sure.
                Some companies have more than 1 share class / restricted shares, making it not straightforward.
                Perhaps "controlled" companies are not included in indexes? This would explain Chewy's exclusion.</p>
            <h5>Index Eligibility Critea</h5>
            <ul>
                <li>Listed on NASDAQ/NYSE</li>
                <li>Only common stock and REITS included</li>
                <li>US domiciled companies only, largely based on HQ location</li>
                <li>Daily USD volume greater than $125,000</li>
                <li>Free float percentage greater than 12.5%</li>
                <li>Public voting rights greater than 5%</li>
            </ul>
            <p>Think you know why a stock is excluded? Leave a note! Must be logged in.</p>
            <Row>
                <Col>
                    <OutlierUpdateForm setMessage={console.log} dispatch={dispatch} outliers={outliers} />
                </Col>
                <Col>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Login</Accordion.Header>
                            <Accordion.Body>
                                <LoginForm />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            <a href="https://docs.google.com/spreadsheets/d/1HbJ2-r7hCXT9IhWA9dbwBZe5utZOl502Txs1tecfYIc/edit?usp=sharing">List as a Google Sheet </a>
            <DjangoTable setMessage={console.log} models={outliers} dispatch={dispatch} fields={fields} />
        </>
    )
}