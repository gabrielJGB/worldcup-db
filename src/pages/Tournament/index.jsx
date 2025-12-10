import Loading from '@/components/Loading';
import AwardWinners from '@/components/tournament/AwardWinners';
import GroupStandings from '@/components/tournament/GroupStandings';
import KnockoutStages from '@/components/tournament/KnockoutStages';
import Overview from '@/components/tournament/Overview';
import Participants from '@/components/tournament/Participants';
import Squad from '@/components/tournament/Squad';
import Standings from '@/components/tournament/Standings';
import { fetcher } from '@/utils/fetcher';
import { useState } from 'preact/hooks';

import useSWR from 'swr';

const TorunamentPage = ({ year }) => {

	const [selectedTeam,setSelectedTeam] = useState(false)

	// const { data: tournaments, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.appapi/qualified_teams?tournament_name=${year}`, fetcher,
	// 	{
	// 		revalidateOnFocus: false,

	// 	}
	// );

	// if (isLoading)
	// 	return (
	// 		<div class={"w-full mt-5 md:col-start-2"}>
	// 			<Loading />
	// 		</div>)

	// if (error)
	// 	return (<div class={"text-center w-full mt-7"}>Error {":("}</div>)


	return (
		<div class={"grid grid-cols-12 gap-2 py-4 md:px-12"}>

			<Overview year={year} />
			<Standings year={year} />
			<AwardWinners year={year} />
			<Participants year={year} setSelectedTeam={setSelectedTeam} selectedTeam={selectedTeam}/>
			<GroupStandings year={year} />

			<div class={"col-span-4 col-start-9 row-start-1  row-span-12 flex flex-col gap-2"}>

				<KnockoutStages year={year} />
				<Squad year={year} selectedTeam={selectedTeam} />
			
			</div>

		</div>
	)
}

export default TorunamentPage