import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'

const columns = [
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'RIF',
        accessor: 'nif',
    },
    {
        Header: 'Estado',
        accessor: 'state',
    },
    {
        Header: 'Ciudad',
        accessor: 'city',
    },
    {
        Header: 'Representante',
        accessor: 'legal_representative',
    },
    {
        Header: 'Modos de transporte',
        accessor: 'transportation_means',
    },
    {
        Header: 'Activo',
        accessor: 'active',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadOperatingCompanies = () => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const dispatch = useDispatch()
    // Customs Hooks
    const navigate = useNavigate()
    const operatingCompanies = useSelector(
        (state: DefaultRootStateProps) => state.operatingCompanies
    )
    // FUNCTIONS
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/gestion-empresa/editar/${id}`)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/gestion-empresa/crear`)
    }

    //EFFECTS
    React.useEffect(() => {
        dispatch(getCompaniesRequest())
    }, [])
    React.useEffect(() => {
        const rows = operatingCompanies.map(
            ({  id,
                name,
                nif,
                state,
                city,
                legal_representative,
                company_code,
                active,
                transportation_means,
            }) => ({
                id,
                name,
                nif,
                state,
                city,
                legal_representative,
                transportation_means: transportation_means?.map((type) => (
                    <p>{type}</p>
                )),
                active: active ? (
                    <Chip
                        label="Habilitado"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="Deshabilitado"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: '96px' }}
                    />
                ),
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [operatingCompanies])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Empresas"
                addIconTooltip="Crear Empresa"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadOperatingCompanies
