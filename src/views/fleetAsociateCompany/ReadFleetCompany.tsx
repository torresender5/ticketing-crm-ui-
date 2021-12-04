import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import TableCustom from 'components/Table'
import { getFleetRequest } from 'store/fleetCompany/FleetCompanyActions'

const columns = [
    {
        Header: 'Unidad',
        accessor: 'unit_id',
    },
    {
        Header: 'Tipo de transporte',
        accessor: 'transportation_mean',
    },
    {
        Header: 'Marca',
        accessor: 'make',
    },
    {
        Header: 'Modelo',
        accessor: 'model',
    },
    {
        Header: 'Pasajeros',
        accessor: 'capacity',
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadFleetCompany = () => {
    const dispatch = useDispatch()
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const fleets = useSelector((state: DefaultRootStateProps) => state.fleets)

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const fleetID = e.currentTarget.dataset.id
        navigate(`/gestion-flota/editar/${fleetID}`)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        navigate(`/gestion-flota/crear`)
    }

    React.useEffect(() => {
        dispatch(getFleetRequest())
    }, [dispatch])

    React.useEffect(() => {
        const rows = fleets.map(
            ({ id, unit_id, transportation_mean, make, model, capacity }) => ({
                unit_id,
                transportation_mean,
                make,
                model,
                capacity,
                // active: active ? (
                //     <Chip
                //         label="Habilitado"
                //         size="small"
                //         chipcolor="success"
                //         sx={{ width: '96px' }}
                //     />
                // ) : (
                //     <Chip
                //         label="Deshabilitado"
                //         size="small"
                //         chipcolor="orange"
                //         sx={{ width: '96px' }}
                //     />
                // ),
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                        {/* <button data-id={employee_id} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button> */}
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [fleets])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Flota"
                addIconTooltip="Añadir Unidad"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadFleetCompany
