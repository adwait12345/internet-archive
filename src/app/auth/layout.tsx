import type { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: "Auth",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <React.Fragment>
    {children}
  </React.Fragment>
  );
}
