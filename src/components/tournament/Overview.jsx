import Loading from '@/components/Loading';
import { fetcher } from '@/utils/fetcher';
import React from 'react'
import useSWR from 'swr';

const Overview = ({ year }) => {

  const { data, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/tournaments?tournament_name=${year}`, fetcher,
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
    <div

      class={" outline outline-zinc-800 col-span-3 py-2 bg-zinc-900 flex flex-col w-full items-center justify-center  gap-2"}
    >
      <div class={"text-3xl font-semibold text-center text-shadow-xs text-shadow-black"}>{data[0].host_country} {data[0].year}</div>
      <div class={"flex flex-row gap-2 w-full justify-evenly items-center"}>

        <img src={`/${year}.png`} class={"h-30 rounded drop-shadow-xs drop-shadow-black"} />

        <div class={"flex flex-col gap-1 "}>


          <div class={"text-center"}>🏆 {data[0].winner}</div>


          <div class={"text-xs text-center"}>{data[0].count_teams} teams</div>
          <div class={"text-xs text-center"}>{data[0].start_date.replaceAll("-", "/")} - {data[0].end_date.replaceAll("-", "/")}</div>

        </div>

      </div>
    </div>
  )
}

export default Overview