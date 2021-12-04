import UnderConstruction from '../UnderConstruction'
import { useParams } from 'react-router-dom';

const EditVendor = () => {
    const { id } = useParams();
    return (
        <div>
            <h1 className="text-center font-bold text-4xl">Edit Vendor</h1>
            <h1 className="text-center font-bold text-4xl">ID Query: {id}</h1>
            <UnderConstruction />
        </div>
    )
}

export default EditVendor;