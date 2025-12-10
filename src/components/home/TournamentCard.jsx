import { Link } from 'preact-router'
import flags from '@/data/flags.json'
import logos from '@/data/logos.json'
import { useState } from 'preact/hooks'
 
const TournamentCard = ({ tournament, id }) => {

    const host = tournament.host_country
    const winner = tournament.winner
    const year = tournament.tournament_id.split("-")[1]
    const countTeams = tournament.count_teams
    const startDate = tournament.start_date.split("-")
    const endDate = tournament.end_date.split("-")

    const [flag] = useState(flags.find(flag => flag.team_name.toUpperCase() == tournament.winner.toUpperCase()))
    


    return (
        <Link
            // @ts-ignore
            href={`/tournament/${year}`}
            style={`background-image: url('/${year}.png');`}
            class={`outline outline-zinc-800 p-2 cursor-pointer bg-contain bg-no-repeat bg-zinc-900 hover:bg-zinc-800 transition-all shadow-md shadow-gray-950 hover:bg-blend-normal  bg-blend-multiply flex flex-col justify-start items-center gap-1 `}
        >

            <div class={"flex flex-row text-shadow-black text-shadow-lg justify-center gap-2 text-lg font-semibold text-white"}>
                <div>{host.toUpperCase()}</div>
                <div>{year}</div>
            </div>

            <div class={"flex flex-row justify-evenly w-full items-center text-shadow-black text-shadow-sm"}>

                {/* <div>
                    <img src={`/${year}.png`} class={"drop-shadow-xs drop-shadow-black"} width={60} />
                </div> */}

                <div class={"flex flex-col items-center justify-center gap-1"}>
                    <div class={"flex flex-row items-center gap-1 text-xs text-center "}>
                        <div>🏆</div>
                        <img src={flag.flags.svg} alt="" width={20} height={8} />
                        <div>{winner}</div>
                    </div>

                    <div class={"text-xs text-center text-gray-300"}>
                        {countTeams} teams
                    </div>

                    <div class={"flex flex-row items-center justify-center gap-1"}>
                        <div class={"text-xs text-center text-gray-300"}>
                            {`${startDate[2]}/${startDate[1]}`}
                        </div>
                        <span>-</span>
                        <div class={"text-xs text-center text-gray-300"}>
                            {`${endDate[2]}/${endDate[1]}`}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TournamentCard
