import {Toast as FlowbiteToast} from "flowbite-react";
import {useEffect, useState} from "react";
import {HiCheck, HiX} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {hideToast} from "../../store/toast/toast.action";

const Toast = ({topPos}) => {
    const dispatch = useDispatch();
    const [closeToastTime, setCloseToastTime] = useState(3);
    const toast = useSelector(state => state.toast);

    const showSuccessIcon = toast.result === "success";

    useEffect(() => {
        if (toast.show) {
            if (closeToastTime > 0) {
                const timer = setInterval(() => {
                    setCloseToastTime(prev => prev - 1);
                }, 1000);

                return () => clearInterval(timer);
            } else if (closeToastTime === 0) {
                dispatch(hideToast());
                setCloseToastTime(3);
            }

        }

    }, [closeToastTime, dispatch, toast.show]);

    return (
        toast.show && (
            <FlowbiteToast className={`fixed top-${topPos} right-5 z-50 bg-gray-800 text-gray-400 dark:bg-white dark:text-gray-500`}>
                {showSuccessIcon ? <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div> :
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                }
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold">{toast.msg}</span>
                    {toast.showSubMsg && <div className="mb-2 text-sm font-normal">{toast.subMsg}{closeToastTime} sec</div>}
                </div>
            </FlowbiteToast>
        )
    );
};

export default Toast;