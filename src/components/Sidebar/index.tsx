import searchAuthors from "@/hooks/searchAuthors";
import React from "react";
import { Skeleton } from "antd";

export default function Sidebar({
  author,
  setAuthor,
}: {
  author: any;
  setAuthor: any;
}) {
  const { authorData, isLoading } = searchAuthors(author.author);

  let res = authorData?.docs.filter((e: any) => {
    return e.key === author.authorId;
  });

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col p-5 gap-2">
          <Skeleton.Image active className=" w-[100px] h-[100px]" />{" "}
          <Skeleton active className="space-y-5" paragraph={{ rows: 1 }} />
        </div>
      ) : (
        res?.length !== 0 && (
          <div className=" w-full left-0  h-full  bg-white p-5 flex flex-col gap-2 ">
            <img
              src={`https://covers.openlibrary.org/a/olid/${author.authorId}-M.jpg`}
              loading="lazy"
              width={100}
              height={100}
              className="bg-slate-100 "
              alt=""
            />

            <div className="">
              <p>{res[0]?.name}</p>
              <p className="text-[10px] font-bold">
                Top Work:{" "}
                <span className=" font-normal">{res[0]?.top_work}</span>{" "}
              </p>
              <p className="text-[10px] font-bold">
                Date of Birth:{" "}
                <span className="italic font-normal">
                  {res[0]?.birth_date || "na"}
                </span>{" "}
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}
