import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex min-h-[82vh] w-full flex-col items-center justify-center p-4 md:w-[500px]">
      <div className=" flex min-h-[300px] w-full items-center justify-center rounded-md border-[1px] border-solid border-gray-200 md:min-w-[500px]">
        {children}
      </div>
    </section>
  );
}
