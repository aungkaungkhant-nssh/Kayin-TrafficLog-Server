import React from 'react'
import DashboardCard from '@/components/dashboard/DashboardCard';
import { ChartBarLabel } from '@/components/ui/BarChart'
import { ChartPieLabelList } from '@/components/ui/chart-pie-label';
import { columns } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';

const page = async () => {
  return (
    <div className="space-y-4">
      <DashboardCard
        totalFineAmount={100000}
        offendersCount={50}
        unfiledCasesCount={20}
        filedCasesCount={30}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartBarLabel />
        <ChartPieLabelList />
      </div>
      <hr />
      <div>
        <DataTable
          data={[]}
          columns={columns}
          scheduleTitle={"ပြစ်မှုအများဆုံး ကျူလွန်သောသူများ"}
          meta={{ totalCount: 0, hasNextPage: true }}
          currentPage={1}
          showPagination={false}
          showSearch={false}
          buttonText={'အားလုံး'}
          buttonRedirectPath='/trafficlog/offender'
        />
      </div>
    </div>
  )
}

export default page