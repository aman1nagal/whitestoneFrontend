import React from "react";
import { Close, Delete } from "../common/Icons";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: () => void;
  hideModal?: () => void;
  message?: string;
  title?: string;
  subTitle?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const ConfirmModal = ({
  title = "Alert",
  subTitle,
  message = "Are you sure you want to delete this item?",
  action = () => {},
  hideModal = () => {},
  primaryBtnText = "Yes",
  secondaryBtnText = "No",
  ...rest
}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[61] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black/60 focus:outline-none"
      {...rest}
    >
      <div className="relative w-11/12 md:w-5/12 lg:w-1/3 md:min-w-[500px] mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-md shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col gap-2">
            {/* Modal Header */}
            <div className="relative flex flex-col items-center w-full p-4">
              <div className="text-xl font-semibold text-center mb-5 mt-4">
                {title}
              </div>

              {/* Close Button */}
              <div
                className="flex absolute cursor-pointer justify-end items-end pr-4 w-full mt-0 close"
                onClick={() => hideModal()}
              >
                <Close />
              </div>

              {/* Icon */}
              <div className="p-2 mb-3 rounded-full w-fit">
                <Delete />
              </div>

              {/* SubTitle and Message */}
              {subTitle && (
                <p className="pb-4 text-lg font-medium">{subTitle}</p>
              )}
              <p className="mt-2 text-sm md:text-base text-center text-gray-o-480">
                {message}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 md:gap-6 border-t py-3">
              <button
                className="px-7 sm:px-14 py-2 rounded-md font-medium text-black bg-gray-100 hover:bg-gray-300 hover:shadow-md transition ease-in"
                onClick={() => hideModal()}
              >
                {secondaryBtnText}
              </button>
              <button
                className="px-7 sm:px-14 py-2 rounded-md bg-red-600 hover:bg-red-800/[.8] text-white transition ease-in"
                onClick={action}
              >
                {primaryBtnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConfirmModal };
