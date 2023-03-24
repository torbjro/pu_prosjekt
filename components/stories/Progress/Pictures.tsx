import Layout from '@/components/stories/Dashboard/Layout';
import { Picture, User } from '@/lib/types';
import { addPicture, currentUser, pocketbase, getPictures } from '@/pages/api/connects';
import { Button, Image } from "@chakra-ui/react"
import { FC, useEffect, useState, FormEvent, useRef } from 'react';

interface Pictures {
    user: User
}

const PictureFeed: FC<Pictures> = (props) => {
    const {id, pictures} = props.user;
    console.log(pictures);
    const [pic, setPic] = useState<FileList | null>(null);
    const [pics, setPics] = useState<Picture[]>()

    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getPictures().then((result) => {
            setPics(result.items);
        })
    }, [id, pics]);

    // adding pictures is currently not working!
    function handleAddPicture(e: FormEvent<HTMLFormElement>) {
        const file = fileInput.current?.files?.[0];
        if (!file) {
            return;
        }
        console.log(file);
        addPicture(currentUser!.id, file);
    }

    return (
        <div className="flex flex-col justify-center text-center items-center">
            <div className='flex'>
            <form
            onSubmit={handleAddPicture}
            className="flex flex-col justify-center items-center space-y-4"
            >
            <input
                type="file"
                ref={fileInput}
                id="file"
                className="text-purple-900 bottom-2.5 bg-purple-200 hover:bg-purple-300 focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-300 dark:hover:bg-purple-400 dark:focus:ring-purple-500"
                required
            />

            <Button
                type="submit"
                className="text-purple-900 bottom-2.5 bg-purple-200 hover:bg-purple-300 focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-300 dark:hover:bg-purple-400 dark:focus:ring-purple-500"
            >
                Add
            </Button>
            </form>
                {/* <input 
                    type="search" 
                    id="default-search" 
                    className="p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 dark:bg-white dark:border-violet-600 dark:placeholder-violet-600 dark:text-black dark:focus:ring-violet-500 dark:focus:border-violet-500" 
                    placeholder="Add a picture file" 
                    onChange={(e) => setPic(e.target.value)}
                    required>
                </input> */}
                {/* <input
                    type="submit" 
                    className="text-white bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-500"
                    onClick={() => handleAddPicture()}>
                        Add
                </input> */}
            </div>
            {pics?.map((picture, index) => (
                <div key={index} className='flex justify-center shadow-md mb-2 rounded-xl overflow-hidden'>
                    <Image width={400} height={'min-content'} src={`http://127.0.0.1:8090/api/files/pictures/${picture.id}/${picture.progressPicture}`} className="h-80 w-auto mb-5" alt="" />
                </div>
            ))}
        </div>
    )
}

export default PictureFeed;