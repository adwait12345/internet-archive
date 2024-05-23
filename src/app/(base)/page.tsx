"use client"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Tables from "@/components/Table"
import { Suspense, useState } from "react"

export interface Author {
  author: string;
  authorId: string;
}

function Home() {

  const [author, setAuthor] = useState<Author>({author:"", authorId:""})

    return (
      <div className="w-full h-screen flex flex-col ">
        <div className="h-[10%] w-full border-b ">

        <Navbar  />
        </div>
        <div className="flex items-center justify-between h-[90%]  ">
          <div className="w-[12.5%] h-full border-r ">

          <Sidebar author={author} setAuthor={setAuthor} />
          </div>
          <div className="w-[87.5%] h-full no-scrollbar overflow-y-auto ">
          <Suspense fallback={<div>Loading...</div>}>
         <Tables author={author} setAuthor={setAuthor} />
          </Suspense>
</div>
        </div>
      </div>
    )
} 

export default Home