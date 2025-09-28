import React from "react";
import SearchBar from "@/components/SearchBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* <SearchBar /> */}
      {children}
    </section>
  );
}
