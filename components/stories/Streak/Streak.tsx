import { FC } from "react"

interface StreakProps {
    counter: number
}

const Streak: FC<StreakProps> = (props) => {
    const {counter} = props


    return (

        //Streak tailwind style
        <div className=" text-orange-600">
            <p className="text-white">🔥{counter}🔥</p>
        </div>
    )
}

export default Streak