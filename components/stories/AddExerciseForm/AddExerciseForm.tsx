import { FC, useState } from "react"
import { Input } from "@chakra-ui/react"

interface AddExerciseFormProps {
    children?: string
}

const AddExerciseForm: FC<AddExerciseFormProps> = (props) => {
    const [exercise, setExercise] = useState('')
    const [reps, setReps] = useState('')
    const [sets, setSets] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(exercise, reps, sets)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="exercise">Exercise</label>
            <Input type="text" id="exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} />
            <label htmlFor="reps">Reps</label>
            <Input type="text" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
            <label htmlFor="sets">Sets</label>
            <Input type="text" id="sets" value={sets} onChange={(e) => setSets(e.target.value)} />
            <button type="submit">Add Exercise</button>
        </form>
    )
}

export default AddExerciseForm