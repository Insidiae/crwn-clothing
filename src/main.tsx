import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AppProviders } from "./components/AppProviders";

import "./main.css";

//? <div id="root"> is pre-generated in the index.html file.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>
);
