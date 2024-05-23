"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const [featureEnabled, setFeatureEnabled] = useState<boolean>(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (search.trim() === "") return;
    else if (featureEnabled) {
      router.push(`/?search=${search}&page=${1}&limit=${10}&feature=author`);
    } else {
      router.push(`/?search=${search}&page=${1}&limit=${10}`);
    }
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      document.getElementById("search")?.focus();
    }
    if (event.altKey && event.key === "r") {
      event.preventDefault();
      router.push(
        `/?search=${search}&page=${1}&limit=${10}&sort=ratings desc')`
      );
      console.log("Alt + R pressed");
    }
  };

  function setFeature() {
    setFeatureEnabled(!featureEnabled);
    if (!featureEnabled) {
      router.push(`/?search=${search}&page=${1}&limit=${10}&feature=author`);
    } else {
      router.push(`/?search=${search}&page=${1}&limit=${10}`);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
  });

  return (
    <div className=" w-full h-full bg-white flex items-start pt-4 gap-5 ">
      <img
        src="/logo.svg"
        alt=""
        width={150}
        height={80}
        className="ml-5 mb-2 invert"
      />
      <div className="w-full flex flex-col gap-1 ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full gap-2"
        >
          <Input
            id="search"
            placeholder={
              !featureEnabled ? "Search Book . . ." : "Search by Author . . ."
            }
            value={search}
            className="w-8/12 "
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            addonAfter={<p className="font-medium  text-[10px]">Ctrl+k</p>}
          />
          <Button type="primary" htmlType="submit" className="">
            <img src="/search.svg" width={18} className="" alt="" />
          </Button>
        </form>
        <p
          className="text-[10px] font-normal cursor-pointer w-fit"
          onClick={setFeature}
        >
          {" "}
          search by{" "}
          <span className="text-[12px] font-bold">
            {" "}
            {featureEnabled ? "Book" : "Author"}
          </span>
        </p>
      </div>

      <Button
        type="default"
        className="mr-5"
        onClick={() => {
          cookies.remove("user");
          router.push("/auth");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
