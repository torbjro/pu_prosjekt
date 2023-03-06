import Joingroup from './Joingroup'

export default {
  title: 'Joingroup', 
  component: Joingroup
}

export const Following = () => {
    return <Joingroup following={false} onLeave={() => {}} groupName="Benkærne"></Joingroup>
}

export const NotFollowing = () => {
  return <Joingroup following={false} onLeave={() => {}} groupName="Benkærne"></Joingroup>
}