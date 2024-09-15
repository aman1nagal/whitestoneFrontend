import React from "react";
import { CheckIcon } from "@heroicons/react/solid";

export default function Success({ message, hideModal }: any) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black/60 focus:outline-none"
        onClick={() => hideModal(true)}
      >
        <div className="relative w-11/12 md:w-5/12 lg:w-1/3 max-w-[360px] mx-auto my-6">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex flex-col">
              <div className="relative flex flex-col p-6">
                <div className="flex justify-center">
                  <div className="flex justify-center items-center rounded-full bg-green-200  h-20 w-20">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="40" cy="40" r="40" fill="#038E60" />
                      <path
                        d="M26.5834 41.916L34.25 49.5827L53.4167 30.416"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-5 flex justify-center font-medium">
                  {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
