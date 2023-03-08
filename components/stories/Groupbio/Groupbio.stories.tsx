import Groupbio from './Groupbio'

export default {
  title: 'Groupbio', 
  component: Groupbio
}

export const Default = () => {
    return <Groupbio 
    groupName = "Benkegruppen"
    bio = "Her er gruppen for oss som elsker å benke!"
    ></Groupbio>
}