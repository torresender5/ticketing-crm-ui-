import CompanyProfile from '../../components/companiesForm'
import { useParams } from 'react-router-dom'

const EditOperatingCompany = () => {
    const { id } = useParams()
    return (
        <div>
            <CompanyProfile companyIdParam={id} readOnly />
        </div>
    )
}

export default EditOperatingCompany
