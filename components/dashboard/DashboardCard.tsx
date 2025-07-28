import React from 'react';
import CountCard from './CountCard';
import { UsersIcon, DollarSignIcon, FileCheckIcon, FileTextIcon } from "lucide-react";

type DashboardCardProps = {
  totalFineAmount: number;
  offendersCount: number;
  unfiledCasesCount: number;
  filedCasesCount: number;
};

const DashboardCard = ({
  totalFineAmount,
  offendersCount,
  unfiledCasesCount,
  filedCasesCount
}: DashboardCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <CountCard title="ဒဏ်ငွေ" count={totalFineAmount} icon={<DollarSignIcon />} />
      <CountCard title="ပြစ်မှုကျူးလွန်သူဦးရေ" count={offendersCount} icon={<UsersIcon />} />
      <CountCard title="တရားမစွဲ‌ထားသော အရေအတွက်" count={unfiledCasesCount} icon={<FileTextIcon />} />
      <CountCard title="တရားစွဲပြီးသော အရေအတွက်" count={filedCasesCount} icon={<FileCheckIcon />} />
    </div>
  )
}

export default DashboardCard