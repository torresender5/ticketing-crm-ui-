import FleetIndex from 'components/fleetForm/FleetIndex'
import { useParams } from 'react-router'

const EditFleetCompany = () => {
    const { id } = useParams()

    return (
        <>
            <FleetIndex fleetId={id} readOnly />
        </>
    )
}

export default EditFleetCompany
