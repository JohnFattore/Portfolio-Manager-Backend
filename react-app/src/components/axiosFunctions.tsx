import axios from 'axios';
import { IAsset, ISelection } from '../interfaces';
import { getSunday } from './helperFunctions';

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
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("token/"), {
    username: username,
    password: password
  });
  sessionStorage.setItem("token", response.data.access);
  sessionStorage.setItem("refresh", response.data.refresh);
  return response
}

// register would conflict with the useForm hook
export const postUser = async (username: string, password: string, email: string) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_PORTFOLIO_URL.concat("users/"), {
    username: username,
    password: password,
    email: email,
  })
  return response
}

/********* Wallstreet **************************************************************/

// 0 would be last sunday, 1 next sunday etc. could even do -1
export const getOptions = async (week: number, benchmark = "") => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_WALLSTREET_URL.concat("options/"), {
    params: {
      sunday: getSunday(week),
      benchmark: benchmark
    },
  });
  return response
}

export const getSelections = async (week: number) => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_WALLSTREET_URL.concat("selections/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string)
    },
    params: {
      sunday: getSunday(week)
    },
  });
  return response
}

export const postSelection = async (selection: ISelection) => {
  const response = await axios.post(import.meta.env.VITE_APP_DJANGO_WALLSTREET_URL.concat("selections/"), {
    option: selection.option,
    // 1 is a placeholder, this is actually set on the back end using the User object returned by the request
    user: 1
  }, {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string),
    }
  });
  return response
}

export const deleteSelection = async (id: number) => {
  const response = await axios.delete(import.meta.env.VITE_APP_DJANGO_WALLSTREET_URL.concat("selection/", id, "/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string),
    }
  });
  return response
}

export const getResults = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_WALLSTREET_URL.concat("results/"), {
    headers: {
      'Authorization': ' Bearer '.concat(sessionStorage.getItem('token') as string)
    },
  });
  return response
}

/********************************* Index Compare *************************************/
// old
export const getOutliers = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_INDEX_COMPARE_URL.concat("outliers/"));
  return response
}

export const patchOutliers = async (notes: string, id: number) => {
  const response = await axios.patch(import.meta.env.VITE_APP_DJANGO_INDEX_COMPARE_URL.concat("outliers_update/", id, "/"), {
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

export const getIndexMembers = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_DJANGO_INDEX_COMPARE_URL.concat("index_members/"));
  return response
}

export const patchIndexMembers = async (notes: string, id: number) => {
  const response = await axios.patch(import.meta.env.VITE_APP_DJANGO_INDEX_COMPARE_URL.concat("index_members_update/", id, "/"), {
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