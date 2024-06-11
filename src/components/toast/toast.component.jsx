import {Toast as FlowbiteToast} from "flowbite-react";
import {HiCheck, HiX} from "react-icons/hi";

const Toast = ({result, msg}) => {

    const showSuccessIcon = result === "success";

    return (
        <FlowbiteToast className="fixed top-20 right-5">
            {showSuccessIcon ? <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
            </div> :
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <HiX className="h-5 w-5" />
                </div>
            }
            <div className="ml-3 text-sm font-normal">{msg}</div>
        </FlowbiteToast>
    );
};

export default Toast;