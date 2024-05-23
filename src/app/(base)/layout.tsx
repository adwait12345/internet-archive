'use client'
import React, { useLayoutEffect } from "react";
import cookies from "js-cookie"
import users from "../../lib/user";
import { useRouter } from "next/navigation";


export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let user = cookies.get("user");
  const router = useRouter();
  useLayoutEffect(() => {
    if (user === undefined) {
      router.push("/auth");
    }
    else if (user) {
      let temp = JSON.parse(user);
      let res = users.find((user) => user.userName === temp.userName && user.password === temp.password);
      if (!res){
        router.push("/auth");
      }
      else if(res){
        router.push("/");
      }
    } 

  }, [user]);


  return (
   <React.Fragment>
    {children}
  </React.Fragment>
  );
}
