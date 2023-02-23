import { useEffect, useState } from 'react'
import { getPosts, getExercisesByPostId } from '../api/connects';
import { Record } from 'pocketbase';
import Layout from '@/components/stories/Dashboard/Layout';
import { Post2, Exercise } from '@/components/stories/Post/Post2';
import { getUserById } from '../api/connects';


function Dashboard() {
    const [posts, setPosts] = useState<Record[]>();
    const [UserPostMap, setUserPostMap] = useState<Map<Record, Record>>();
    const [ProgramExercises, setProgramExercises] = useState<Map<Record, Record[]>>();
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPosts().then((posts: Record[]) => {
          setPosts(posts);
          const tempMap = new Map<Record, Record>();
          const tempMap2 = new Map<Record, Record[]>();
          const exercisesPromises = posts.map((post) => getExercisesByPostId(post.id));
          Promise.all([Promise.all(posts.map((post) => getUserById(post.user))), Promise.all(exercisesPromises)])
            .then(([usersArray, exercisesArrays]) => {
              posts.forEach((post, index) => {
                tempMap.set(post, usersArray[index]);
                tempMap2.set(post, exercisesArrays[index].items);
              });
              setUserPostMap(tempMap);
              setProgramExercises(tempMap2);
              setLoading(false);
            });
        });
      }, []);
      
        

  return (
    <>
        <div className='grid justify-center'>
            {
                //map through posts and create a post for each one with name of user
                posts?.map((post) => {
                    // console.log(UserPostMap?.get(post))
                    const user = UserPostMap?.get(post);
                    console.log(ProgramExercises?.get(post));

                    let exercises: Exercise[] = [];
                    if (ProgramExercises?.get(post)) {
                        exercises = ProgramExercises.get(post)?.map((exercise) => {
                            return {
                                navn: exercise.exercise,
                                sets: exercise.sets,
                                reps: exercise.reps,
                            }
                        })!;
                    }
                    return (
                        <div key={post.id} className="py-3">
                            <Post2
                                name={user?.name}
                                exercises={exercises}
                                profile_pic_src={user?.avatar ? `http://127.0.0.1:8090/api/files/users/${user?.id}/${user?.avatar}` : `https://picsum.photos/200`} 
                                profile_src={'/dashboard' /* TODO: add src to database or make profile address based on id */}/>
                        </div>
                    )
                })
            }
        </div>
    </>
  );
}

export default Dashboard;
