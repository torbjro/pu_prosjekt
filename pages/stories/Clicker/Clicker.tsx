import { FC } from "react"

interface ClickerProps {
    children?: string
}

const Clicker: FC<ClickerProps> = (props) => {
    const {children} = props
    return (

        //Clicker tailwind style
        <div 
        className="bg-violet-600 hover:bg-violet-700 p-7 text-center w-32 h-16 rounded-2xl text-white flex justify-center items-center text-2xl">
            {children}
        </div>
    )
}

export default Clicker