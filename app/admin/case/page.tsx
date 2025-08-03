import React, { Suspense } from 'react'
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { caseColumnKeys } from '@/utils/constant/columnkeys';
import { getPaginatedSeizureRecords } from '@/server/action/offensecases';
import Loading from '../dashboard/Loading';

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = async ({ searchParams }: Props) => {
    const page = searchParams.page ?? "1"; // default to 1 if undefined
    const pageNumber = parseInt(Array.isArray(page) ? page[0] : page);
    const res = await getPaginatedSeizureRecords({
        filterType: 'not_null', page: pageNumber, limit: 10
    });

    return (
        <Suspense fallback={<Loading />}>
            <div className="mt-4">
                <div>
                    <DataTable
                        data={res.data}
                        columns={columns}
                        scheduleTitle={"တရားစွဲပြီးသောမှတ်တမ်းများ"}
                        meta={res.meta}
                        currentPage={pageNumber}
                        showPagination={true}
                        showSearch={true}
                        showButton={false}
                        toggleableColumnKeys={caseColumnKeys}
                    />
                </div>
            </div>
        </Suspense>

    )
}

export default page