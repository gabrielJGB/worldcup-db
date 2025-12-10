import Loading from '@/components/Loading';
import { DynamicTable } from '@/pages/Section/components/DynamicTable';
import { fetcher } from '@/utils/fetcher';
import React from 'react'
import useSWR from 'swr';

const Section = ({ section }) => {

    const { data, isLoading, error } = useSWR(`https://worldcup-api-tau.vercel.app/api/${section}`, fetcher,

        {
            revalidateOnFocus: false,
        }
    );

    if (isLoading)
        return (<Loading />)

    if (error)
        return (<div class={"text-center w-full mt-7"}>Ha ocurrido un error {":("}</div>)


    const fields = data.available_filters

    return (

        <div>
            <div class={"text-lg uppercase px-4 font-semibold"}>{section}</div>
            <DynamicTable
                section={section}
                fields={fields}
            />
        </div>
    )
}

export default Section