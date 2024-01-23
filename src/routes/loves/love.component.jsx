import {useEffect} from "react";
import {useSelector} from "react-redux";

const Loves = (movies) => {
    const token = useSelector(state => state.token);

    useEffect(() => {
        const request = fetch('/api/getlove', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // 根据请求的内容类型添加其他头部
            },
        });

        request.then(response => {
            return response.json();
        }).then(({msg}) => {
            if (msg === "Token has expired") {

            }
        });

    }, []);
    return (
        <div>
            這是loves
        </div>

    );
};

export default Loves;