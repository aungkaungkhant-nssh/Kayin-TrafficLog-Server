
import LoginForm from "@/components/auth/LoginForm";
import { columns } from "@/components/data/columns";
import { DataTable } from "@/components/data/data-table";
// import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page() {

  // const tutorialSchedules = await getSchedules(ScheduleEnum.Tutorial, currentPage);

  return (
    <div className="w-[100%]">
      <LoginForm />
      {/* <DataTable
        data={[]}
        columns={columns}
        scheduleTitle={ScheduleEnum.Tutorial}
        meta={tutorialSchedules.meta}
        currentPage={currentPage}
      /> */}
    </div>
  );
}


// import { handlers } from "@/server/auth"
// import NextAuth from "next-auth";
// export const { auth } = NextAuth(handlers);
// export const { GET, POST } = handlers