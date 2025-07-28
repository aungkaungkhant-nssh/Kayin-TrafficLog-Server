import React from 'react';

type DashboardCardProps = {
    title: string;
    count: number;
    icon?: React.ReactNode;
};

const CountCard = ({ title, count, icon }: DashboardCardProps) => {
    return (
        <div className={`rounded-xl p-5 flex items-center justify-between bg-white shadow-md`}>
            <div>
                <div className="text-sm font-medium uppercase tracking-wide">{title}</div>
                <div className="text-3xl font-bold mt-1 text-primary">{count}</div>
            </div>
            {icon && <div className="text-4xl opacity-30 text-primary">{icon}</div>}
        </div>
    )
}

export default CountCard