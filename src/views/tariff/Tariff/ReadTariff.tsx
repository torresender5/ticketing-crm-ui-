import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../../components/Table'
// import EditIcon from '@material-ui/icons/Edit'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
// import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getTariffRequest } from 'store/tariff_management/TariffActions'

const columns = [
    {
        Header: 'Ruta ID',
        accessor: 'route',
    },
    {
        Header: 'Nombre',
        accessor: 'fare_iso_code',
    },
    {
        Header: 'Tarifa Base',
        accessor: 'fare_prices.price',
    },
    {
        Header: 'Fecha de creación',
        accessor: 'created_on',
    },
    {
        Header: 'última actualización',
        accessor: 'updated_on',
    },
    // {
    //     Header: 'Activo',
    //     accessor: 'active',
    //     disableFilters: true,
    // },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadTariff = () => {
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const fares = useSelector((state: DefaultRootStateProps) => state.fares)

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/gestion-de-tarifas/editar/${id}`)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/gestion-de-tarifas/crear`)
    }
    React.useEffect(() => {
        dispatch(getTariffRequest())
    }, [])

    React.useEffect(() => {
        const rows = fares.map(
            ({
                id,
                route,
                fare_iso_code,
                created_on,
                updated_on,
                fare_prices,
            }) => ({
                route,
                fare_iso_code,
                created_on,
                updated_on,
                fare_prices,
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
                            {/* <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton> */}
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
    }, [fares])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Tarifas"
                addIconTooltip="Gestión de tarifas"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadTariff
