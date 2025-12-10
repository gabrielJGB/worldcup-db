import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher';
import { getFlag } from '@/utils/helper';
import React from 'react'
import useSWR from 'swr';

const Participants = ({ year, setSelectedTeam,selectedTeam }) => {


  const { data: teams, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/qualified_teams?tournament_name=${year}`, fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return (
      <div class={"outline outline-zinc-800 col-span-2 row-start-2 p-2 bg-zinc-900 flex flex-col w-full justify-start gap-2"}>
        Loading...
      </div>)

  if (error)
    return (<div></div>)

  return (
    <div class={"outline outline-zinc-800 col-span-2 flex flex-col divide-y divide-zinc-700 gap-0 p-1 bg-zinc-900"}>
      <SectionTitle title={"PARTICIPANTS"} />


      {
        teams.map((team) => (
          <div
            class={`flex flex-col p-1 hover:bg-zinc-800 cursor-pointer`}
            onClick={() => { setSelectedTeam(team.team_code) }}
          >
            <div class={"flex flex-row items-center gap-2"}>
              {/* <div class={"w-[16px] h-[10px] bg-white"}></div> */}

              {getFlag(team.team_code)}

              <div class={`${selectedTeam === team.team_code?"font-semibold":""}`}>{team.team_name} {selectedTeam === team.team_code?">":""}</div>
            </div>
            <div class={"flex flex-col text-gray-300 text-[11px]"}>
              <div>{team.count_matches} games played </div>
              {/* <div>{team.performance}</div> */}
            </div>
          </div>

        ))
      }


    </div>
  )
}

export default Participants