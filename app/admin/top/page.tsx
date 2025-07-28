import React from 'react'
import { columns, Schedule } from "@/components/data/columns";
import { DataTable } from '@/components/data/data-table';
import { caseColumnKeys } from '@/utils/constant/columnkeys';

const page = async () => {
    const dummyScheduleData: Schedule[] = [
        {
            စဉ်: 1,
            အရေးယူရက်စွဲ: "2025-07-25",
            ယာဉ်အမှတ်: "YGN-1234",
            အမျိုးအမည်: "Toyota Vitz",
            နေရာ: "ရန်ကုန်",
            ယာဉ်မောင်းအမည်: "ကိုကို",
            မှတ်ပုံတင်အမှတ်: "12/PaKaNa(N)123456",
            အဘအမည်: "ဦးမောင်မောင်",
            နေရပ်လိပ်စာ: "No.23, 9th Street, လှိုင်",
            ပုဒ်မ: "၅၂",
            ပုဒ်မအကြောင်းအရာ: "မူးယစ်ဆေးဝါးသယ်ယူ",
            အရေးယူအရာရှိ: "ရဲအရာရှိ ညိုညို",
            ဒဏ်ဆောင်ရက်: "၃ရက်",
            ရာကြီးအမှတ်: "RY-2345",
            ဒဏ်ကြေး: "၁၀၀၀၀",
            သိမ်းဆည်းပစ္စည်း: "ယာဉ်",
        },
        {
            စဉ်: 2,
            အရေးယူရက်စွဲ: "2025-07-20",
            ယာဉ်အမှတ်: "MDY-5678",
            အမျိုးအမည်: "Honda Fit",
            နေရာ: "မန္တလေး",
            ယာဉ်မောင်းအမည်: "မောင်မောင်",
            မှတ်ပုံတင်အမှတ်: "9/AhLaNa(N)654321",
            အဘအမည်: "ဦးအောင်အောင်",
            နေရပ်လိပ်စာ: "အမှတ်(၁၂၄), ပုသိမ်ရပ်ကွက်",
            ပုဒ်မ: "၄၄",
            ပုဒ်မအကြောင်းအရာ: "အရှိန်လွန်ယာဉ်မောင်း",
            အရေးယူအရာရှိ: "ရဲအရာရှိ စန်းစန်း",
            ဒဏ်ဆောင်ရက်: null,
            ရာကြီးအမှတ်: null,
            ဒဏ်ကြေး: "၂၀၀၀",
            သိမ်းဆည်းပစ္စည်း: null,
        },
        {
            စဉ်: 3,
            အရေးယူရက်စွဲ: "2025-07-15",
            ယာဉ်အမှတ်: "NPT-0001",
            အမျိုးအမည်: null,
            နေရာ: "နေပြည်တော်",
            ယာဉ်မောင်းအမည်: "ဇော်ဇော်",
            မှတ်ပုံတင်အမှတ်: null,
            အဘအမည်: null,
            နေရပ်လိပ်စာ: null,
            ပုဒ်မ: null,
            ပုဒ်မအကြောင်းအရာ: null,
            အရေးယူအရာရှိ: null,
            ဒဏ်ဆောင်ရက်: null,
            ရာကြီးအမှတ်: null,
            ဒဏ်ကြေး: null,
            သိမ်းဆည်းပစ္စည်း: null,
        },
    ];

    return (
        <div className="mt-4">
            <div>
                <DataTable
                    data={dummyScheduleData}
                    columns={columns}
                    scheduleTitle={"ပြစ်မှုများအများဆုံး ကျူးလွန်သူမှတ်တမ်းများ"}
                    meta={{ totalCount: dummyScheduleData.length, hasNextPage: false }}
                    currentPage={1}
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