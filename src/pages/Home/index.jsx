import React from 'react'
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { fetcher } from '@/utils/fetcher';
import TournamentCard from '@/components/home/TournamentCard';

const Home = () => {

	const { data, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/tournaments?tournament_name=fifa%20men`, fetcher,
		{
			revalidateOnFocus: false,
		}
	);


	
	
	if (isLoading)
		return (
			<div>
				<Loading />
			</div>)

	if (error)
		return (<div class={"text-center w-full mx-auto mt-7"}>Ha ocurrido un error</div>)
	
	
	// console.log(data);



	return (
		<div class={"w-full mx-auto pb-20"}>
			<div class={" grid md:grid-cols-5 grid-cols-1 gap-2 md:px-12 p-4"}>
				{
					data.map((tournament,i) => (
						<TournamentCard key={i} tournament={tournament} id={i}/>
					))
				}
			</div>
		</div>
	)
}

export default Home