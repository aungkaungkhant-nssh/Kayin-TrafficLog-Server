import React, { Suspense } from 'react'
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { dailyColumnKeys } from '@/utils/constant/columnkeys';
import { getPaginatedSeizureRecords } from '@/server/action/offensecases';
import Loading from '../dashboard/Loading';

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = async ({ searchParams }: Props) => {
    const page = searchParams.page ?? "1"; // default to 1 if undefined
    const pageNumber = parseInt(Array.isArray(page) ? page[0] : page);
    const search = searchParams.search ?? "";
    const res = await getPaginatedSeizureRecords({
        filterType: 'null',
        page: pageNumber,
        limit: 10,
        search: Array.isArray(search) ? search[0] : search,
    });

    return (
        <Suspense fallback={<Loading />}>
            <div className="mt-4">
                <div>
                    <DataTable
                        data={res.data}
                        columns={columns}
                        scheduleTitle={"နေ့စဉ်မှတ်တမ်းများ"}
                        meta={res.meta}
                        currentPage={pageNumber}
                        showPagination={true}
                        showSearch={true}
                        showButton={false}
                        toggleableColumnKeys={dailyColumnKeys}
                    />
                </div>
            </div>

        </Suspense>

    )
}

export default page