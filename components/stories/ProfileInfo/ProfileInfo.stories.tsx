import ProfileInfo from './ProfileInfo'
import { User } from '@/lib/types'

export const generated = () => {

    const user = {
        id: '1',
        name: 'John Doe',
        email: '',
        avatar: 'avatar.png'
    } as User
  return <ProfileInfo user={user}/>
}

export default { title: 'Profile Info Banner' }