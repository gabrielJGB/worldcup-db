import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher'
import { getFlag, getStages } from '@/utils/helper'
import React from 'react'
import useSWR from 'swr'

const Game = ({ game }) => {




  return (
    <div class={"border border-zinc-800 h-min flex flex-col justify-center bg-zinc-900"}>


      {/* <div class={" text-center  text-[11px] text-gray-300"}>{game.stadium_name} - {game.city_name}</div>
      <div class={" text-center  text-[11px] text-gray-300"}>{game.match_date.replaceAll("-","/")}, {game.match_time}</div> */}


      <div class={"flex items-center justify-center py-1"}>
        <div title={game.home_team_name} class={"flex items-center gap-1 text-sm"}>
          {getFlag(game.home_team_code)}
          <div >{game.home_team_code}</div>
        </div>

        <div class={"text-sm font-semibold px-2"}>
          {game.score}
        </div>

        <div title={game.away_team_name} class={"flex items-center gap-1 text-sm"}>
          <div >{game.away_team_code}</div>
          {getFlag(game.away_team_code)}
        </div>

      </div>

    </div>
  )
}


const KnockoutStages = ({ year }) => {



  const { data: games, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/matches?knockout_stage=1&tournament_name=${year}`, fetcher,
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



  const stages = getStages(games)




  return (
    <div class={"outline outline-zinc-800 h-min  p-1 flex flex-col gap-2 bg-zinc-900"}>
      <SectionTitle title={"KNOCKOUT STAGES"} />

      {
        stages.map((stage) => (
          <div class={"border border-zinc-300 bg-zinc-300"}>
            <div class={"font-semibold text-[15px] text-center text-black"}>{stage.name}</div>
            <div class={`${stage.games.length === 1 ? "grid grid-cols-1":"grid grid-cols-2"}`}>
              {
                stage.games.map((game) => (
                  <Game game={game} />
                ))
              }
            </div>
          </div>
        ))
      }



    </div>
  )
}

export default KnockoutStages