import {
  Routes,
  Route
} from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio"
import Watchlist from "./pages/WatchList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Education from "./pages/Education";
import Entertainment from "./pages/Entertainment";
import ErrorPage from "./components/ErrorPage";
import Outliers from "./pages/Outliers";
import Restaurants from "./pages/Restaurants";
import RestaurantReview from "./pages/RestaurantReview";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from './main';
import { refreshLogin } from "./components/axiosFunctions";
import { logout, clearErrors } from "./reducers/userReducer";
import { useEffect } from "react";

// react router for all our routes
export default function App() {

  const { access, refresh } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Clear errors when the app initializes
    dispatch(clearErrors());
  }, [dispatch]);

  // i cant think of a good use yet
  // Request Interceptor
  axios.interceptors.request.use(
    (config) => {
      if (access) {
        // this breaks the finnhub authorization....
        //config.headers.Authorization = `Bearer ${access}`; // Attach the token to the request headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); // Handle request errors
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      return response; // Return the response if successful
    },
    async (error) => {
      const originalRequest = error.config; // Capture the original request
      if (error.response?.status === 401 && refresh != '' && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite retries
        try {
          // Dispatch refreshLogin and wait for it to complete
          const result = await dispatch(refreshLogin()).unwrap();
  
          // Update the Authorization header with the new token
          originalRequest.headers['Authorization'] = `Bearer ${result.access}`;
          
          // Retry the original request with the updated token
          return axios(originalRequest);
        } catch (refreshError) {
          console.log('Token refresh failed:', refreshError);
          dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // Handle response errors
    }
  );

  return (
    <>
      <TopNavigation />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/portfolio" element={<Portfolio />} errorElement={<ErrorPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/education" element={<Education />} />
        <Route path="/outliers" element={<Outliers />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/review" element={<RestaurantReview />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <p>This website is purely for entertainment. All investments carry risk. Consult a professional.</p>
      <p>Passive Investing is Awesome!!</p>
    </>
  );
}