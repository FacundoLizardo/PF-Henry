import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { CartProvider } from "./context/CartContext.jsx";

axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Suspense>
		<BrowserRouter>
			<CartProvider>
				<App />
			</CartProvider>
		</BrowserRouter>
	</Suspense>
);
