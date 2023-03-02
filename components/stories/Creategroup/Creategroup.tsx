import { FC } from "react"

interface CreategroupProps {
    children?: string
}

const Creategroup: FC<CreategroupProps> = (props) => {
    const {children} = props
    return (

        //Creategroup tailwind style
        <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-violet-500 py-2">
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Groupname" aria-label="Full name"></input>
                    <button className="flex-shrink-0 bg-violet-500 hover:bg-violet-700 border-violet-500 hover:border-violet-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Create group
      </button>
      <button className="flex-shrink-0 border-transparent border-4 text-violet-500 hover:text-violet-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
        </button>
        </div>
        </form>
    )
}

export default Creategroup