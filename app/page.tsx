
import LoginForm from "@/components/auth/LoginForm";
export interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page() {
  return (
    <div className="w-[100%]">
      <LoginForm />
    </div>
  );
}
