"use client";
import React from "react";
import { assets } from "@/data/assets";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="h-fit flex flex-col sm:flex-row gap-1 text-sm p-10 bg-black text-white">
      <div className="flex-3">
        <img src={assets.logo} alt="logo" className="mb-5 w-32 invert" />
        <p className="w-full md:w-2/3 text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nam
          voluptate cum facilis quia, eos assumenda distinctio est neque,
          incidunt amet reprehenderit odit ducimus consequatur deserunt nemo
          porro? Provident, suscipit.
        </p>
      </div>
      <div className="flex-1">
        <p className="text-xl font-medium mb-5">Company</p>
        <ul className="flex flex-col gap-1 text-gray-200">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="#policy">Privacy Policy</Link>
        </ul>
      </div>
      <div className="">
        <p className="text-xl font-medium mb-5">Get In Touch</p>
        <ul className="flex flex-col gap-1 text-gray-200">
          <li>+2-222-555-1110</li>
          <li>contact@forever.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
