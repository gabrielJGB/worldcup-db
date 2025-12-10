import SectionTitle from '@/components/tournament/SectionTitle'
import { fetcher } from '@/utils/fetcher';
import { getFlag } from '@/utils/helper';
import React from 'react'
import useSWR from 'swr';

const AwardWinners = ({ year }) => {

  const { data: winners, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/award_winners?tournament_name=${year}`, fetcher,
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




  return (
    <div class={"outline outline-zinc-800 col-span-3 p-2 bg-zinc-900 flex flex-col gap-1"}>
      <SectionTitle title={"AWARD WINNERS"} />
      <div class={"grid grid-cols-2 gap-2"}>
        {
          winners.map((winner) => (
            <div class={"flex flex-col text-xs"}>
              <div class={"text-gray-300 italic"}>{winner.award_name}</div>
              <div class={"flex flex-row items-center gap-1"}>
                {getFlag(winner.team_code)}
                <div class={"font-semibold"}>{winner.given_name != "not applicable" && winner.given_name} {winner.family_name}</div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AwardWinners