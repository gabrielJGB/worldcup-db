import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import Home from '@/pages/Home/index.jsx';
import './style.css';
import { Header } from '@/components/Header';
import { NotFound } from '@/pages/_404';

import TorunamentPage from '@/pages/Tournament';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main class={"bg-[url('/bg.png')] h-full min-h-screen"}>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/tournament/:year" component={TorunamentPage} />
					<Route default component={NotFound} />

					{/* <Route path="/section/:section" component={Section} /> */}
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
