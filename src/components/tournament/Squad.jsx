import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher';
import { getFlag } from '@/utils/helper';
import React from 'react'
import useSWR from 'swr';

const getBgColor = (pos) => {
    if (pos === "GK")
        return "orange"
    else if (pos == "DF")
        return "blue"
    else if (pos == "MF")
        return "green"
    else if (pos == "FW")
        return "red"
}

const Player = ({ player }) => {


    return (
        <div class={"flex items-center gap-3 px-2 py-[2px] text-sm"}>
            <div class={"w-[25px] text-center font-semibold rounded bg-black"}>{player.shirt_number!=0? player.shirt_number :"-"}</div>
            <div
                style={{ backgroundColor: getBgColor(player.position_code) }}
                class={"w-[25px] rounded font-semibold text-center"}>{player.position_code}</div>
            <div>{player.given_name != "not applicable" && player.given_name} {player.family_name}</div>

        </div>
    )
}

const Squad = ({ selectedTeam, year }) => {


    if (!selectedTeam)
        return (
            <div class={"outline outline-zinc-800 col-span-3 p-2 bg-zinc-900 flex flex-col w-full justify-start gap-2"}>
                Select a team
            </div>

        )

    const { data: squad, isLoading, error } = useSWR(selectedTeam && `https://worldcup-api-tau.vercel.app/api/squads?tournament_name=${year}&team_code=${selectedTeam}`, fetcher,
        {
            revalidateOnFocus: false,
        }
    );




    if (isLoading)
        return (
            <div class={"outline outline-zinc-800 col-span-3 p-2 bg-zinc-900 flex flex-col w-full justify-start gap-2"}>
                Loading...
            </div>)

    if (error)
        return (<div></div>)




    const order = ["GK", "DF", "MF", "FW"];




    return (
        <div class={"outline outline-zinc-800 col-span-4 h-min col-start-9   flex flex-col  gap-0 p-1 bg-zinc-900"}>
            <SectionTitle title={"SQUAD"} />

            <div class={"flex items-center gap-2 px-3 py-1 text-md font-semibold"}>
                {getFlag(selectedTeam, 22, 16)}
                {`${year} players`}
            </div>





            <div class={"flex flex-col divide-y divide-zinc-700 gap-1"}>

                {
                    squad.sort((a, b) => {
                        return order.indexOf(a.position_code) - order.indexOf(b.position_code);
                    }).map((player) => (
                        <Player player={player} />
                    ))
                }

            </div>

        </div>
    )
}

export default Squad