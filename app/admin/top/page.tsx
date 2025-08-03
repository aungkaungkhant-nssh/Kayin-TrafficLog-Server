import React from 'react'
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { caseColumnKeys } from '@/utils/constant/columnkeys';
import { getOffenderMostCount } from '@/server/action/offensecaseData';

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = async ({ searchParams }: Props) => {
    const page = searchParams.page ?? "1"; // default to 1 if undefined
    const pageNumber = parseInt(Array.isArray(page) ? page[0] : page);
    const search = searchParams.search ?? "";
    
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
                    toggleableColumnKeys={caseColumnKeys}
                />
            </div>
        </div>
    )
}

export default page