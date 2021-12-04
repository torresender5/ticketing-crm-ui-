import TariffProfile from 'components/TariffForm'
import { useParams } from 'react-router'

const EditTariff = () => {
    const { id } = useParams()
    return (
        <>
            <TariffProfile fareIdParam={id} readOnly />
        </>
    )
}
export default EditTariff
