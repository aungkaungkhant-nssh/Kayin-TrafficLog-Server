import React, { Suspense } from 'react'
import DashboardCard from '@/components/dashboard/DashboardCard';
import { ChartBarLabel } from '@/components/ui/BarChart'
import { ChartPieLabelList } from '@/components/ui/chart-pie-label';
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { topKey } from '@/utils/constant/columnkeys';
import { getDashboardCount } from '@/server/action/dashboardData';
import Loading from './Loading';
import { getOffenderMostCount } from '@/server/action/offensecaseData';

const page = async () => {
  const data = await getDashboardCount();
  const res = await getOffenderMostCount({})
  const { totalFineAmount, offendersCount, filedCasesCount, unfiledCasesCount, categoryCounts } = data;

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-4">
        <DashboardCard
          totalFineAmount={totalFineAmount}
          offendersCount={offendersCount}
          unfiledCasesCount={filedCasesCount}
          filedCasesCount={unfiledCasesCount}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartBarLabel />
          <ChartPieLabelList
            chartData={categoryCounts}
          />
        </div>
        <hr />
        <div>
          <DataTable
            data={res.data.slice(0, 3)}
            columns={columns}
            scheduleTitle={"ပြစ်မှုများအများဆုံး ကျူးလွန်သူမှတ်တမ်းများ"}
            meta={res.meta}
            currentPage={1}
            showPagination={false}
            showSearch={false}
            buttonText="အားလုံးကြည့်မည်"
            buttonRedirectPath="/admin/top"
            toggleableColumnKeys={topKey}
            showColumn={true}
          />
        </div>
      </div>

    </Suspense>

  )
}

export default page