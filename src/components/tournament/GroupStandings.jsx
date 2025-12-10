import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher';
import { getFlag, getGroups } from '@/utils/helper';
import React from 'react'
import useSWR from 'swr';

const GroupTable = ({ group }) => {

  const teams = group.teams

  return (
    <div class="overflow-x-auto">
      <table class="w-full    border-separate border-spacing-px ">
        <thead>
          <tr class="text-center bg-zinc-950 text-primary  text-sm ">
            <th class="">#</th>
            <th class="text-left ">Team</th>
            <th title={"Points"} class="">Pts</th>
            <th title={"Games played"} class="">Plyd</th>
            <th title={"Won"} class="">W</th>
            <th title={"Draw"} class="">D</th>
            <th title={""} class="">GF</th>
            <th title={"Points"} class="">GA</th>
            <th title={"Points"} class="">GD</th>
          </tr>
        </thead>
        <tbody>
          {
            teams.map((team) => (
              <tr class={`text-xs text-center ${team.advanced === 1 ? "bg-green-800/80" : "bg-zinc-800"}`}>
                <td>{team.position}</td>
                <td class={"text-left py-1 flex items-center gap-1 pl-1"}>
                  {getFlag(team.team_code)}
                  <div>{team.team_name}</div>
                </td>
                <td class={"font-semibold"}>{team.points}</td>
                <td>{team.played}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.goal_difference}</td>
                <td>{team.goals_against}</td>
                <td>{team.goals_for}</td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const GroupGames = ({ games }) => {

  
  
  
  

  return (
    <div class={`grid grid-cols-2 gap-px bg-zinc-600 p-px`}>

      {
        games.map((game) => (
          <div class={"flex flex-col justify-between bg-zinc-900"}>
            <div class={"font-semibold text-center w-full text-xs text-gray-300"}>

            </div>
            <div class={"grid grid-cols-3 p-1 "}>
              <div class={"flex items-center gap-1 text-xs"}>
                {getFlag(game.home_team_code)}
                <div title={game.home_team_name}>{game.home_team_code}</div>
              </div>

              <div class={"text-sm text-center font-semibold px-2"}>
                {/* {`${game.home_team_score} - ${game.away_team_score}`} */}
                {game.score}
              </div>

              <div class={"flex items-center gap-1 text-xs"}>
                <div title={game.away_team_name}>{game.away_team_code}</div>
                {getFlag(game.away_team_code)}
              </div>

            </div>

          </div>
        ))
      }

    </div>
  )
}

const GroupStandings = ({ year }) => {



  const { data: groupsRes, isLoading: loadingStandings, error: standingsError } = useSWR(`https://worldcup-api-tau.vercel.app/api/group_standings?tournament_name=${year}`, fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: groupsGames, isLoading: loadingGroups, error: groupsError } = useSWR(`https://worldcup-api-tau.vercel.app/api/matches?tournament_name=${year}&stage_name=${encodeURIComponent("group stage")}`, fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (loadingStandings || loadingGroups)
    return (
      <div class={"outline outline-zinc-800 col-span-2 row-start-2 p-2 bg-zinc-900 flex flex-col w-full justify-start gap-2"}>
        Loading...
      </div>)

  if (standingsError || groupsError)
    return (<div></div>)




  const groups = getGroups(groupsRes)


  return (
    <div class={"outline outline-zinc-800 h-min col-span-6  flex flex-col gap-1 p-1 bg-zinc-900"}>
      <SectionTitle title={"GROUP STANDINGS"} />

      <div class={"grid grid-cols-2 gap-3"}>

        {
          groups
            .map((group) => (
              <div class={"flex- flex-col  border border-zinc-300  "}>
                <div class={"font-semibold bg-zinc-300 text-zinc-950 px-2"}>{group.name}</div>

                <GroupTable
                  group={group}
                />

                <GroupGames
                  games={groupsGames.filter(g => g.group_name === group.name)}
                />

              </div>
            ))
        }



      </div>
    </div>
  )
}

export default GroupStandings