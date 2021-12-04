import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../components/Table'
import EditIcon from '@material-ui/icons/Edit'
// import SelectColumnFilter from 'components/Table/Filters/SelectColumnFilter'
// import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { getUsersRequest } from 'store/users/usersActions'

const columns = [
    // {
    //     Header: 'ID',
    //     accessor: 'employee_code',
    // },
    {
        Header: 'Operador',
        accessor: 'operator_card',
    },
    {
        Header: 'Nombre de usuario',
        accessor: 'username',
    },
    {
        Header: 'Código compañia',
        accessor: 'company_code',
    },
    {
        Header: 'Primer Nombre',
        accessor: 'first_name',
    },
    {
        Header: 'Apellido',
        accessor: 'last_name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    // {
    //     Header: 'rol',
    //     accessor: 'role',
    //     Filter: SelectColumnFilter,
    //     filter: 'includes',
    // },
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

const ReadUsers = () => {
    const dispatch = useDispatch()

    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const navigate = useNavigate()
    const users = useSelector((state: DefaultRootStateProps) => state.users)

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/gestion-usuarios/editar/${id}`)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/gestion-usuarios/crear`)
    }
    React.useEffect(() => {
        dispatch(getUsersRequest())
    }, [])

    React.useEffect(() => {
        const rows = users.map(
            ({
                operator_card,
                company_code,
                role,
                active,
                id,
                user_data: { username, first_name, last_name, email },
            }) => ({
                operator_card,
                username,
                company_code,
                first_name,
                last_name,
                email,
                role,
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
    }, [users])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Usuarios"
                addIconTooltip="Crear Usuario"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadUsers
