import { handlers } from "@/server/auth";
import { getServerSession } from "next-auth";
import React from 'react'

const page = async () => {
  const session = await getServerSession(handlers);
  console.log(session)
  return (
    <div>page</div>
  )
}

export default page