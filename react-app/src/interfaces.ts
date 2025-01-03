export interface IAllocation {
    ticker: string; 
    shares: number;
}

export interface IAsset {
    ticker: string,
    shares: number,
    costbasis: number,
    buy: string,
    SnP500Price: number,
    id: number,
}

export interface IQuote {
    price: number,
    percentChange: number
}

export interface IMessage {
    text: string,
    type: string
}

export interface IOption {
    ticker: string,
    name: string,
    sunday: string,
    startPrice: number,
    endPrice: number,
    percentChange: number,
    rank: number,
    benchmark: boolean,
    id: number
}

export interface ISelection {
    option: number,
    allocation: number,
    user: number,
    id: number
}

export interface IResult {
    portfolioPercentChange: number,
    SnP500: number,
    Russell2000: number,
    WorldEconomy: number,
    sunday: string,
    user: number,
    id: number
}

export interface IAlbum {
    name: string;
    artist: string;
    year: number;
}

// outdated
export interface IOutlier {
    ticker: string;
    name: string;
    marketCap: number;
    volume: number;
    volumeUSD: number;
    freeFloat: number;
    freeFloatMarketCap: number;
    countryIncorp: string;
    countryHQ: string;
    securityType: string;
    yearIPO: number;
    notes: string;
    id: number
}

export interface IIndexMember {
    ticker: string;
    name: string;
    marketCap: number;
    volume: number;
    volumeUSD: number;
    freeFloat: number;
    freeFloatMarketCap: number;
    countryIncorp: string;
    countryHQ: string;
    securityType: string;
    yearIPO: number;
    percent: number;
    index: string;
    outlier: boolean;
    notes: string;
    id: number
}

export interface IBrokerage {
    name: string;
    mmf: string;
    us: string;
    inter: string;
    id: number
}

export interface IRatio {
    name: string;
    formula: string;
    description: string;
}

/******************************************* Restaurant *************************************************/

export interface IRestaurant {
    name: string;
    address: string;
    phone_number: string;
    website: string;
    id: number;
}

export interface IReview {
    restaurant: number;
    user: number;
    rating: number;
    comment: string;
    id: number;
}

export interface IMenuItem {
    restaurant: string;
    name: string;
    description: string;
    price: number;
    id: number;
}

export interface IFavorite {
    menu_item: string;
    user: number;
    comment: string;
    id: number;
}