import axios from 'axios';
import { IAsset } from '../interfaces';

export const getAssets = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("assets/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string)
    },
  });
  return response
}

export const getAsset = async (id: number) => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("asset/", id, "/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string)
    },
  });
  return response
}

export const postAsset = async (asset: IAsset) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("assets/"), {
    ticker: asset.ticker,
    shares: asset.shares,
    costbasis: asset.costbasis,
    buy: asset.buy,
      // 1 is a placeholder, value set in backend
    SnP500Price: 1,
    // 1 is a placeholder, this is actually set on the back end using the User object returned by the request
    user: 1
  }, {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string),
    }
  });
  return response
}

export const deleteAsset = async (id: number) => {
  const response = await axios.delete(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("asset/", id, "/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string)
    },
  });
  return response
}

export const getQuote = async (ticker: string) => {
  const response = await axios.get(import.meta.env.VITE_APP_FINNHUB_URL.concat("quote/"), {
    params: {
      symbol: ticker,
      token: import.meta.env.VITE_APP_FINNHUB_KEY
    }
  });
  return response
}

// only works for stocks
export const getCompanyProfile2 = async (ticker: string) => {
  const response = await axios.get(import.meta.env.VITE_APP_FINNHUB_URL.concat("stock/profile2/"), {
    params: {
      symbol: ticker,
      token: import.meta.env.VITE_APP_FINNHUB_KEY
    }
  });
  return response
}

// login is postToken, but also stores the token
export const login = async (username: string, password: string) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_USERS_URL.concat("token/"), {
    username: username,
    password: password
  });
  sessionStorage.setItem("token", response.data.access);
  sessionStorage.setItem("refresh", response.data.refresh);
  return response
}

// register would conflict with the useForm hook
export const postUser = async (username: string, password: string, email: string) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_USERS_URL.concat("users/"), {
    username: username,
    password: password,
    email: email,
  })
  return response
}

/********************************* Indexes *************************************/
export const getIndexMembers = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_INDEXES_URL.concat("index_members/"));
  return response
}

export const patchIndexMembers = async (notes: string, id: number) => {
  const response = await axios.patch(import.meta.env.VITE_APP_DJANGO_INDEXES_URL.concat("index_members_update/", id, "/"), {
    notes: notes,
    // 1 is a placeholder, this is actually set on the back end using the User object returned by the request
    user: 1
  }, {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string),
    }
  });
  return response
}

/********************************* Restaurants *************************************/
export const getRestaurants = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_RESTAURANTS_URL.concat("restaurant-list-create/"));
  return response
}

export const getReviews = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_RESTAURANTS_URL.concat("review-list/"));
  return response
}

export const postReview = async (restaurant: number, rating: number, comment: string) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_RESTAURANTS_URL.concat("review-create/"), {
    restaurant: restaurant,
    user: 1,
    rating: rating,
    comment: comment,
  }, {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string),
    }
  });
  return response
}