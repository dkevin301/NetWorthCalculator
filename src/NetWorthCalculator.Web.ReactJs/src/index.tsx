import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InitializeStores, { StoresContext } from "./Stores/StoreInitializer";
import reportWebVitals from './reportWebVitals';

const stores = new InitializeStores();

ReactDOM.render(
	<React.StrictMode>
		<StoresContext.Provider value={{ ...stores }}>
			<App />
		</StoresContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
