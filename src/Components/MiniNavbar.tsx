import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export default function MiniNavbar() {
    let query = useQuery();
    let tab = query.get("tab");
    
  return (
    <div className="border-b-[1px] border-zinc-900 mt-6 flex justify-around items-start">
          <ul className="border-solid border-b-2 border-white flex justify-center items-start gap-6 md:gap-10 text-top  text-gray-400 w-full h-12 md:h-12 ">
            <li
              className={`flex justify-center items-center my-auto text-sm font-medium md:text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all md:ease-linear duration-200 ${
                tab == undefined
                  ? `border-x-2 border-t-2 rounded-lg border-gray-100 dark:text-gray-100 text-gray-900 w-20 md:w-32`
                  : `border-none`
              }`}
            >
              <Link to="/">NFT</Link>
            </li>
            <li
              className={`flex justify-center items-center my-auto font-medium text-sm md:text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all ease-linear duration-200 ${
                tab == "staked"
                  ? `border-x-2 border-t-2 rounded-lg  border-gray-100 dark:text-gray-100 text-gray-900 w-20 md:w-32`
                  : `border-none`
              }`}
            >
              <Link to="/?tab=staked">STAKED</Link>
              <span className="text-xs"></span>
            </li>
            <li
              className={`flex justify-center items-center my-auto font-medium text-sm md:text-lg cursor-pointer dark:hover:text-white hover:text-gray-900 transition-all ease-linear duration-200 ${
                tab == "earned"
                  ? `border-x-2 border-t-2 rounded-lg   border-gray-100 dark:text-gray-100 text-gray-900 w-20 md:w-32`
                  : `border-none`
              }`}
            >
              <Link to="/?tab=earned">EARNED</Link>
              <span className="text-xs"></span>
            </li>
          </ul>
        </div>
  )
}
