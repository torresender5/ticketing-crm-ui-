import React from 'react'
import { useNavigate } from 'react-router-dom'
import Chip from 'ui-component/extended/Chip'
import TableCustom from '../../../components/Table'
import EditIcon from '@material-ui/icons/Edit'
import MapIcon from '@material-ui/icons/Map'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, StopsAndZonesProps } from 'types'
import MapStops from 'components/stopsandzonesForm/map/MapStops'
import { getStopsRequest } from 'store/StopsAndZones/StopsAndZonesActions'

const columns = [
    {
        Header: 'Código',
        accessor: 'stop_code',
    },
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Tipo',
        accessor: 'type',
    },
    {
        Header: 'Parada pública',
        accessor: 'is_public_stop',
        disableFilters: true,
    },
    {
        Header: 'Estado',
        accessor: 'state',
        disableFilters: true,
    },
    {
        Header: 'Municipio',
        accessor: 'municipality',
        disableFilters: true,
    },
    {
        Header: 'Acciones',
        accessor: 'edit',
        disableFilters: true,
    },
]

const ReadStopsAndZones = () => {
    // Customs Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stopsAndZones = useSelector(
        (state: DefaultRootStateProps) => state.stopsAndZones
    )
    // States
    const [rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [mapView, setMapView] = React.useState<boolean>(false)
    const [stopsAndZonesData, setStopAndZonesData] =
        React.useState<Array<StopsAndZonesProps>>(stopsAndZones)
    const [stopId, setStopId] = React.useState<string | undefined>('')
    const [editMarker, setEditMarker] = React.useState<boolean>(false)
    // FUNCTIONS
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = e.currentTarget.dataset.id
        setStopId(id)
        setEditMarker(true)
        setMapView(true)
    }

    const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/paradas-y-zonas/crear`)
    }
    const handleChangeView = () => {
        setEditMarker(false)
        setMapView(!mapView)
    }

    React.useEffect(() => {
        dispatch(getStopsRequest())
    }, [dispatch])

    //EFFECTS
    React.useEffect(() => {
        const rows = stopsAndZones.map(
            ({
                stop_code,
                name,
                trans_means,
                is_public_stop,
                route,
                location,
            }) => ({
                stop_code,
                name,
                route,
                type: location?.type,
                trans_means,
                // state: location?.state,
                // municipality: location?.municipality,
                is_public_stop: is_public_stop ? (
                    <Chip
                        label="Privada"
                        size="small"
                        chipcolor="success"
                        sx={{ width: '96px' }}
                    />
                ) : (
                    <Chip
                        label="Pública"
                        size="small"
                        chipcolor="orange"
                        sx={{ width: '96px' }}
                    />
                ),
                edit: (
                    <div className="flex">
                        <button data-id={stop_code} onClick={handleEdit}>
                            <IconButton color="primary">
                                <EditIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </button>
                    </div>
                ),
            })
        )
        setRowsInitial(rows)
        setStopAndZonesData(stopsAndZones)
    }, [stopsAndZones])

    return (
        <div>
            {mapView ? (
                <div>
                    <MapStops
                        stopsAndZonesData={stopsAndZonesData}
                        returnButtonAction={handleChangeView}
                        StopIdProp={stopId}
                        editMarker={editMarker}
                    />
                </div>
            ) : (
                <div>
                    <TableCustom
                        columns={columns}
                        data={rowsInitial}
                        title="Paradas"
                        extraOptionIcon={<MapIcon />}
                        handleCreate={handleCreate}
                        extraOptionAction={handleChangeView}
                    />
                </div>
            )}
        </div>
    )
}

export default ReadStopsAndZones
