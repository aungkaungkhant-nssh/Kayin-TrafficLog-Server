import React from 'react'
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { topKey } from '@/utils/constant/columnkeys';
import { getOffenderMostCount } from '@/server/action/offensecaseData';


const page = async ({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams
    const page = params?.page ?? "1";
    const search = params?.search ?? "";
    const pageNumber = parseInt(Array.isArray(page) ? page[0] : page);

    const res = await getOffenderMostCount({
        page: pageNumber,
        limit: 10,
        search: Array.isArray(search) ? search[0] : search,
    })

    return (
        <div className="mt-4">
            <div>
                <DataTable
                    data={res.data}
                    columns={columns}
                    scheduleTitle={"ပြစ်မှုများအများဆုံး ကျူးလွန်သူမှတ်တမ်းများ"}
                    meta={res.meta}
                    currentPage={pageNumber}
                    showPagination={true}
                    showSearch={true}
                    showButton={false}
                    toggleableColumnKeys={topKey}
                    showColumn={true}
                />
            </div>
        </div>
    )
}

export default page