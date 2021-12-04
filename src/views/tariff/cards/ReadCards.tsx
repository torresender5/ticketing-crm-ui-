import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../../components/Table'
// import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import EditIcon from '@material-ui/icons/Edit'
// import SelectColumnFilter from "components/Table/Filters/SelectColumnFilter";
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DefaultRootStateProps } from 'types/index'
import { getCardsRequest } from 'store/cards/cardsActions'

const columns = [
    {
        Header: 'Categoría',
        accessor: 'category',
    },
    {
        Header: 'Nombre de Tarjeta',
        accessor: 'name',
    },
    {
        Header: 'Abreviatura',
        accessor: 'abbreviation',
    },
    {
        Header: 'Descripción',
        accessor: 'description',
    },
    {
        Header: 'Acciones admitidas',
        accessor: 'allowed_actions',
    },
    {
        Header: 'Soportes Admitidos',
        accessor: 'allowed_media',
    },
    {
        Header: 'Admite titulos asociados',
        accessor: 'is_ticket_allowed',
    },
    {
        Header: 'Admite recarga via web',
        accessor: 'web_rechargable',
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

const ReadCards = () => {
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    // Customs Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const operatingCards = useSelector(
        (state: DefaultRootStateProps) => state.cards
    )
    // FUNCTIONS
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        navigate(`/categoria-de-tarjetas/editar/${id}`)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/categoria-de-tarjetas/crear`)
    }

    const handleChip = (active) => {
        return active ? (
            <Chip
                label="Si"
                size="small"
                chipcolor="success"
                sx={{ width: '96px' }}
            />
        ) : (
            <Chip
                label="No"
                size="small"
                chipcolor="orange"
                sx={{ width: '96px' }}
            />
        )
    }

    React.useEffect(() => {
        dispatch(getCardsRequest())
    }, [])

    //EFFECTS
    React.useEffect(() => {
        console.log('operatingCards', operatingCards)
        const rows = operatingCards.map(
            ({
                id,
                category,
                name,
                description,
                allowed_media,
                allowed_actions,
                is_ticket_allowed,
                web_rechargable,
                abbreviation,
            }) => ({
                id,
                category,
                name,
                description,
                allowed_media: allowed_media?.map((items) => <p>{items}</p>),
                allowed_actions: allowed_actions?.map((items) => (
                    <p>{items}</p>
                )),
                is_ticket_allowed: is_ticket_allowed
                    ? handleChip(true)
                    : handleChip(false),
                web_rechargable: web_rechargable
                    ? handleChip(true)
                    : handleChip(false),
                abbreviation,
                edit: (
                    <div className="flex">
                        <button data-id={id} onClick={handleEdit}>
                            <IconButton color="primary">
                                {/* <VisibilityTwoToneIcon
                                    sx={{ fontSize: '1.3rem' }}
                                /> */}
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
    }, [])

    return (
        <div>
            <TableCustom
                columns={columns}
                data={rowsInitial}
                title="Gestión de Tarjetas"
                addIconTooltip="Crear Tarjeta"
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default ReadCards
