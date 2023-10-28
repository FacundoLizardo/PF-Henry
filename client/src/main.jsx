import { Suspense } from "react";
import {Auth0Provider} from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense>
    <BrowserRouter>
    <Auth0Provider
        domain="educastreamplatform.us.auth0.com"
        clientId="vWqhPKdLkGqWb8hSNiUHHLCsd9NO3MTr"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
          <App/>
    </Auth0Provider>
    </BrowserRouter>
  </Suspense>
);
