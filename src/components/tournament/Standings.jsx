import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher';
import { getFlag } from '@/utils/helper';

import useSWR from 'swr';


const Standings = ({ year }) => {

    

    const { data: standings, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/tournament_standings?tournament_name=${year}`, fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    if (isLoading)
        return (
            <div class={"outline outline-zinc-800 col-span-2 p-2 bg-zinc-900 flex flex-col w-full justify-start gap-2"}>
                Loading...
            </div>)

    if (error)
        return (<div></div>)

    

    return (
        <div class={"outline outline-zinc-800 col-span-2 flex flex-col gap-1 p-2 bg-zinc-900"}>
            <SectionTitle title={"STANDINGS"} />
            <div class={"flex flex-col gap-2"}>
                {
                    standings.map((team) => (
                        <div class={"flex flex-row items-center gap-1"}>
                            <div class={"font-semibold"}>{team.position}° </div>
                            
                            {getFlag(team.team_code)}
                            <div class={"text-sm"}>{team.team_name}</div>
                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default Standings