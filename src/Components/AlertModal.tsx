//* Alert Modal used for show success of failure message after transactions *//

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { BsArrowUpCircle } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
//* Interface *//
interface AlertModalProps {
    alertModal: boolean;
    setAlertModal: (finalMessage: boolean) => void;
    status: string;
}

//* Main function *//
function AlertModal({ alertModal, setAlertModal, status }: AlertModalProps) {
    //* *//
    const { t } = useTranslation("alertModal"); //* Find translator file and read it *//

    //* Close alert modal function *//
    const close = () => {
        setAlertModal(false);
    };
    return (
        <>
            {/* Headless modal => Tailwind plugin */}
            <Transition appear show={alertModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] bg-slate-600 bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-10"
                    onClose={() => null}
                >
                    <div className="min-h-screen px-4 text-center flex justify-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span className="inline-block align-middle" aria-hidden="true"></span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block  w-full max-w-sm p-5  overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-[#191B1F] shadow-xl rounded-2xl">
                                {/* Modal header */}
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                                >
                                    <div className="flex justify-end items-center ">
                                        <CgClose
                                            className="text-2xl cursor-pointer"
                                            onClick={() => close()}
                                        />
                                    </div>
                                </Dialog.Title>
                                {/* Modal content */}
                                {/* Show success of failure message based on the received status */}
                                {status === "success" ? (
                                    <div className="mt-6">
                                        {/* Success message */}
                                        <div className="mt-6 flex justify-center items-center text-7xl text-blue-500 ">
                                            <BsArrowUpCircle />
                                        </div>
                                        <div className="flex flex-col justify-center items-center my-5 space-y-3">
                                            <h1 className="dark:text-gray-200 text-gray-700 text-xl font-medium">
                                                {t("transaction_submitted")}
                                            </h1>
                                            <p className="text-blue-500 text-sm font-medium cursor-pointer ">
                                                {t("view_on_explorer")}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6">
                                        {/* Success message */}
                                        <div className="mt-6 flex justify-center items-center text-7xl text-blue-500 ">
                                            <BsArrowUpCircle color="red" />
                                        </div>
                                        <div className="flex flex-col justify-center items-center my-5 space-y-3">
                                            <h1 className="dark:text-gray-200 text-gray-700 text-xl font-medium">
                                                {t("transaction_failed")}
                                            </h1>
                                            
                                        </div>
                                    </div>
                                )}
                                {/* Modal footer includes close button */}
                                <div className="mt-6 flex justify-center items-center ">
                                    <button
                                        onClick={() => close()}
                                        className="flex justify-center items-center  py-3 w-full rounded-2xl font-medium text-lg gap-2 bg-blue-600 text-gray-200 dark:bg-blue-800 dark:hover:shadow-BTNShadowDark hover:bg-blue-500 hover:shadow-BTNShadow transition-all ease-linear duration-300 "
                                    >
                                        {t("close")}
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default AlertModal;