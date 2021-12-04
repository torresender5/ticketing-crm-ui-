import UserProfile from '../../components/usersForm'
import { useParams } from 'react-router-dom'

const EditUser = () => {
    const { id } = useParams()
    return (
        <div>
            <UserProfile userIdParam={id} readOnly />
        </div>
    )
}

export default EditUser
