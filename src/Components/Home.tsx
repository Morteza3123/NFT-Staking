import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("created_collections");

  return (
    <div className="h-screen w-full bg-gradient-to-b from-black  to-gray-900 bg-gray-900">
      <div className="mx-auto justify-center flex-col w-3/4 h-screen py-8">
        <div className="border-b-[1px] border-zinc-900 mt-6 flex justify-around items-start">
          <ul className="border-solid border-b-2 border-white flex justify-center items-start gap-5 text-center  text-gray-400 w-full h-12 ">
            <li
              className={`flex justify-center items-center gap-2 my-auto font-medium text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all ease-linear duration-200 ${
                tab == "created_items" || tab == "created_collections"
                  ? `border-x-2 border-t-2 rounded-lg pt-1 px-3  border-gray-100 dark:text-gray-100 text-gray-900`
                  : `border-none`
              }`}
            >
              Your's NFT
            </li>
            <li
                            className={`flex justify-center items-center gap-2 my-auto font-medium text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all ease-linear duration-200 p-4 ${
                                tab == "favorites"
                                    ? `border-b-4  border-blue-600 dark:text-gray-100 text-gray-900`
                                    : `border-none`
                            }`}
                        >
                            {/* <AiOutlineHeart className="text-2xl" /> */}
                            <span>Favorites</span>
                            <span className="text-xs">0</span>
                        </li>
            <li
                            className={`flex justify-center items-center gap-2 my-auto font-medium text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all ease-linear duration-200 p-4 ${
                                tab == "favorites"
                                    ? `border-b-4  border-blue-600 dark:text-gray-100 text-gray-900`
                                    : `border-none`
                            }`}
                        >
                            {/* <AiOutlineHeart className="text-2xl" /> */}
                            <span>Favorites</span>
                            <span className="text-xs">0</span>
                        </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
