
import CardProfile from '../../../components/cardsForm'
import { useParams } from 'react-router-dom'

const EditCard = () => {
    const {id}= useParams()
    return (
        <div>
            <CardProfile cardsIdParam={id} readOnly />
        </div>
    )
}

export default EditCard
