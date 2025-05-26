import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

// Disable logs in production
if (import.meta.env.MODE === 'production') {
	console.log = console.error = console.warn = () => {};
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
);

