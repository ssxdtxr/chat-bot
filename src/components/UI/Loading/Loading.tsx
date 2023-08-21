import s from "./Loading.module.scss"
import robot from "@/assets/img/robot.svg";
import loading from "@/assets/gifs/loading.gif"

export const Loading = () => {
    return (
        <div className={s.loadingBot}>
            <img width={40} height={40} src={robot} alt=""/>
            <div className={s.loading}>
                <img width={50} height={18} src={loading} alt="loading"/>
            </div>
        </div>
    );
};

