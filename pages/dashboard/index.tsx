import { useEffect, useState } from 'react'
import { getPosts, getExercisesByPostId } from '../api/connects';
import { Record } from 'pocketbase';
import Layout from '@/components/stories/Dashboard/Layout';
import { Post2} from '@/components/stories/Post/Post2';
import { getUserById } from '../api/connects';
import { Post } from '../types';
import router from 'next/router';

// export loader and log test

export const loader = () => console.log('test');
function Dashboard() {
    const [posts, setPosts] = useState<Post[]>();
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            getPosts().then((posts: Post[]) => {
                setPosts(posts);
                setLoading(false);
            }
            );
        }
        fetchPosts();
      }, []);
      
        

  return (
    <>
        <div className='grid justify-center w-full'>
        <button onClick={() => router.push('/create_post')} className="bg-violet-600 text-white px-4 my-6 w-full h-20 rounded-lg">New Post</button>
            {
                posts?.map((post) => {
                    return (
                     <div key={post.id} className="py-3">
                            <Post2
                                post={post}
                                />
                        </div>
                    )
                })
            }
        </div>
    </>
  );
}

export default Dashboard;
