import Loading from "@/components/Loading";
import { fetcher } from "@/utils/fetcher";
import { useState, useMemo } from "preact/hooks";
import data from '@/data/data_filter.json'
import useSWR from "swr";


const buildQueryParams = (arr) => {
    return arr
        .filter(item => item.value !== "")
        .map(item => `${encodeURIComponent(item.field)}=${encodeURIComponent(item.value)}`)
        .join("&");
};

const getTextElement = (text) => {

    if(text === 1)
        return "yes"
    if(text===0)
        return "no"

    if (String(text).includes("wikipedia"))
        return <a target="_blank" class={"hover:underline"} href={text}>Wikipedia</a>

    return text
}

export const DynamicTable = ({ fields, section }) => {


    const [queryParams, setQueryParams] = useState("")
    const [filters, setFilters] = useState(fields.map((field) => ({
        field,
        value: null,
    }))
    );

    // reemp false con: queryParams != ""   y    sacar :temp

    const { data, isLoading, error } = useSWR(queryParams != "" ? `https://worldcup-api-tau.vercel.app/api/${section}?${queryParams}` : null, fetcher,

        {
            revalidateOnFocus: false,
        }
    );




    if (error)
        return (<div class={"text-center w-full mt-7"}>Ha ocurrido un error {":("}</div>)


    return (
        <div class="overflow-x-auto min-h-screen p-4">

            <button
                class={"cursor-pointer rounded bg-zinc-950 py-1 px-2 text-sm hover:bg-zinc-800 mb-3"}
                onClick={() => {
                    const filtersOn = filters.filter(filter => filter.value != null)
                    const qp = buildQueryParams(filtersOn)
                    setQueryParams(qp)

                }}>Search</button>

            <table class="border-separate border-spacing-[2px] bg-zinc-700  w-full text-sm">
                <thead>
                    <tr class={"bg-black"}>

                        {filters.map(field => (
                            <th class="border border-gray-500 ">

                                <input
                                    class={"placeholder:text-gray-600 w-[100px] placeholder:text-xs  p-2 "}
                                    placeholder={field.field.replaceAll("_", " ")}
                                    title={field.field.replaceAll("_", " ")}
                                    value={field.value}
                                    onInput={e => {
                                        // @ts-ignore
                                        // console.log(filters.find(filter=>filter.field === field),e.target.value)
                                        field.value = e.target.value != "" ? e.target.value : null
                                    }}
                                />

                            </th>
                        ))}
                    </tr>
                </thead>

                {/* {console.log(data, queryParams)} */}
                <tbody>


                    {
                        isLoading &&
                        <div className="w-full pt-10 flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
                            <span className="text-xs text-gray-300 font-semibold  select-none">BUSCANDO...</span>
                        </div>
                    }
                    {
                        data != undefined &&

                        data.map((row, i) => (
                            <tr key={i}>
                                {
                                    Object.entries(row).map(x => (

                                        <td class={"bg-zinc-800 text-center text-xs h-10 p-1"}>
                                            {getTextElement(x[1])}
                                        </td>
                                    ))
                                }

                                {/* <td>{Object.entries(row)[0]}</td> */}
                            </tr>
                        ))

                    }

                    {
                        data != undefined && data.length === 0 &&
                        <div>Sin resultados</div>
                    }


                    {/* {filteredData.map((row, idx) => (
            <tr key={idx} class="hover:bg-gray-50">
              {fields.map(field => (
                <td class="border p-2">
                  {String(row[field] ?? "")}
                </td>
              ))}
            </tr>
          ))} */}
                </tbody>
            </table>
        </div>
    );
};
