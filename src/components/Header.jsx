import { useLocation } from 'preact-iso';
import { Link } from 'preact-router';


export function Header() {
	const { url } = useLocation();

	return (
		<header class={"flex flex-row justify-between items-center bg-zinc-900"}>
			<Link
				// @ts-ignore
				href={"/"} class={"text-2xl font-semibold mx-4 mt-2 mb-4"}>FIFA World Cup Database
			</Link>
			{/* <nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>
			</nav> */}
		</header>
	);
}
