import { FC } from "react"

interface GroupbioProps {
    groupName: string,
    bio?: string,
}

const Groupbio: FC<GroupbioProps> = (props) => {
    const {groupName, bio} = props
    return (

        //Groupbio tailwind style
        <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-violet-800 dark:border-violet-700 dark:hover:bg-violet-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{groupName}</h5>
        <p className="font-normal text-gray-200 dark:text-gray-200">{bio}</p>
        </a>
    )
}

export default Groupbio