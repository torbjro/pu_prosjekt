import { FC } from "react"

interface FormsProps {
    children?: string
}

const Forms: FC<FormsProps> = (props) => {
    return (

        //Forms tailwind style
       <body>
        <div className= 'flex justify-center items-center h-screen'>
            <div className="w-96 p-6 shadow-lg rounded-md bg-white text-black">

                <hr className="h-px my-8 border-0 dark:bg-black"></hr>
                <div>
                    <label htmlFor="username" className="block text-base mb-1"></label>
                    <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none focus:border-black focus:ring-0" placeholder="Value"/>
                </div>
            </div>
        </div> 
       </body>
    )
}

export default Forms