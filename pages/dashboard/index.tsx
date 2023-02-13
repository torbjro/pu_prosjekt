
import { pocketbase } from '../api/connects';


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;

// export async function getServerSideProps() {
//     const session = await getSession();
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: { session },
//     };
// }
