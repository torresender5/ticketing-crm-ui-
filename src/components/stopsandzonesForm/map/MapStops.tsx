import React from 'react'
import { Marker } from 'react-map-gl'
import PopupCustom from './Popup'
import { v4 as uuidv4 } from 'uuid'
import { StopsAndZonesProps } from 'types'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import BusIcon from '../../icons/BusIcon'
import TableChartIcon from '@material-ui/icons/TableChart'
import FilterIcon from '@material-ui/icons/FilterList'
import VisibilityIcon from '@material-ui/icons/Visibility'
import FilterForm from './FilterForm'
import Transitions from 'ui-component/extended/Transitions'
import Map from 'components/Map'
// import { useDispatch } from 'react-redux'
// import { createStops } from 'store/StopsAndZones/StopsAndZonesActions'

interface MapProps {
    StopIdProp?: string
    returnButtonAction?: React.MouseEventHandler<HTMLButtonElement>
    stopsAndZonesData: Array<StopsAndZonesProps> | Array<any>
    editMarker: boolean
}

export default function MapStops({
    StopIdProp,
    returnButtonAction,
    stopsAndZonesData,
    editMarker,
}: MapProps) {
    const [readOnly, setReadOnly] = React.useState<boolean>(true)
    const [stopId, setStopId] = React.useState<string | undefined>(
        StopIdProp || ''
    )
    const [filterOptions, setFilterOptions] = React.useState<any>()
    const [markers, setMarkers] =
        React.useState<Array<StopsAndZonesProps>>(stopsAndZonesData)
    const [createMode, setCreateMode] = React.useState<boolean>(false)
    const [createMarker, setCreateMarker] = React.useState<
        Array<StopsAndZonesProps>
    >([])
    const [findStopData, setFindStopData] = React.useState<
        StopsAndZonesProps | undefined
    >(stopsAndZonesData?.find((marker) => marker.stop_code === stopId))
    const [open, setOpen] = React.useState<boolean>(editMarker)
    const [openFilterForm, setOpenFilterForm] = React.useState<boolean>(false)
    // const dispatch = useDispatch()

    React.useEffect(() => {
        // const nameFilter = stopsAndZonesData?.filter((stop) =>
        //     stop?.stop?.name
        //         .toLowerCase()
        //         .includes(filterOptions?.name.toLowerCase())
        // )
        // const stopCodeFilter = nameFilter?.filter((stop) =>
        //     stop?.stop?.stop_code.includes(filterOptions?.stop_code)
        // )
        const routeFilter = stopsAndZonesData?.filter((stop) =>
            stop?.stop_code
                .toLowerCase()
                .includes(filterOptions?.route.toLowerCase())
        )
        const typeFilter = routeFilter?.filter((stop) =>
            stop?.location.type
                .toLowerCase()
                .includes(filterOptions?.type.toLowerCase())
        )
        const stateFilter = typeFilter?.filter((stop) =>
            stop?.location.state
                .toLowerCase()
                .includes(filterOptions?.state.toLowerCase())
        )
        const municipalityFilter = stateFilter?.filter((stop) =>
            stop?.location.municipality
                .toLowerCase()
                .includes(filterOptions?.municipality.toLowerCase())
        )
        setMarkers(municipalityFilter)
    }, [filterOptions])

    React.useEffect(() => {
        setMarkers(stopsAndZonesData)
    }, [stopsAndZonesData])

    const handleOpen = (e) => {
        e.preventDefault()
        const stopCode = e.currentTarget.dataset.id
        setStopId(stopCode)
        setFindStopData(
            stopsAndZonesData?.find((marker) => marker.id === stopCode)
        )
        setOpen(!open)
    }

    const handleMarkers = (e) => {
        if (e.target.localName === 'button') {
            return
        }
        const [longitude, latitude] = e.lngLat
        if (!readOnly && !open && createMode) {
            setCreateMarker((markers) => [
                {
                    id: uuidv4(),
                    location: { coordinates: { longitude, latitude } },
                },
            ])
            setOpen(!open)
        }
    }
    const handleCreateMode = () => {
        setReadOnly(!readOnly)
        setCreateMode(!createMode)
    }
    function getCursor({ isHovering, isDragging }) {
        return createMode
            ? isDragging
                ? 'grabbing'
                : 'crosshair'
            : isDragging
            ? 'grabbing'
            : 'grab'
    }

    return (
        <div className="relative">
            <div className="flex">
                {readOnly ? (
                    <h1 className="text-black font-bold absolute bottom-10 left-4 z-10">
                        Modo lectura
                    </h1>
                ) : (
                    <h1 className="text-green-700 font-bold absolute bottom-10 left-4 z-10">
                        Modo escritura
                    </h1>
                )}
                <Tooltip title="Aplicar filtro" placement="bottom">
                    <Fab
                        color="primary"
                        className="absolute top-4 left-4  z-10"
                        onClick={() => setOpenFilterForm(!openFilterForm)}
                        // disabled={!readOnly}
                    >
                        <FilterIcon />
                    </Fab>
                </Tooltip>
            </div>
            <Tooltip title="Ver tabla" placement="bottom">
                <Fab
                    color="primary"
                    className="absolute top-4 right-4 z-10"
                    onClick={returnButtonAction}
                    disabled={!readOnly}
                >
                    <TableChartIcon />
                </Fab>
            </Tooltip>
            {openFilterForm ? (
                <div className="absolute top-20 left-4 z-10 w-full md:w-1/2 lg:w-1/3">
                    <Transitions
                        type="grow"
                        in
                        position="top-left"
                        direction="up"
                    >
                        <FilterForm setFilterOptions={setFilterOptions} />
                    </Transitions>
                </div>
            ) : null}
            <Map
                onClick={handleMarkers}
                latitude={Number(findStopData?.location?.coordinates?.latitude)}
                longitude={Number(
                    findStopData?.location?.coordinates?.longitude
                )}
                zoom={editMarker ? 18 : 8}
                getCursor={getCursor}
            >
                <>
                    {markers.map((marker) => (
                        <Marker
                            {...marker}
                            latitude={Number(
                                marker.location.coordinates.latitude
                            )}
                            longitude={Number(
                                marker.location.coordinates.longitude
                            )}
                            key={marker.name}
                        >
                            <button
                                onClick={handleOpen}
                                data-id={marker.id}
                                type="button"
                                disabled={createMode}
                                className={`${
                                    createMode
                                        ? 'text-gray-600 pointer-events-none'
                                        : 'text-blue-700'
                                }`}
                            >
                                <BusIcon />
                            </button>
                        </Marker>
                    ))}
                    {createMarker.map((marker) => (
                        <Marker
                            {...marker}
                            latitude={Number(
                                marker.location.coordinates.latitude
                            )}
                            longitude={Number(
                                marker.location.coordinates.longitude
                            )}
                            key={marker.name}
                        >
                            <button
                                onClick={handleOpen}
                                data-id={marker.stop_code}
                                type="button"
                                className="text-blue-700"
                            >
                                <BusIcon />
                            </button>
                        </Marker>
                    ))}

                    {open ? (
                        <PopupCustom
                            stopId={stopId}
                            data={createMode ? createMarker[0] : findStopData}
                            open={open}
                            setOpen={setOpen}
                            readOnly={readOnly}
                            createMode={createMode}
                            setCreateMarker={setCreateMarker}
                        />
                    ) : null}
                </>
            </Map>
            <div className="absolute right-4 bottom-10">
                {createMode ? (
                    <Tooltip title="Modo lectura" placement="top">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleCreateMode}
                            disabled={open}
                        >
                            <VisibilityIcon />
                        </Fab>
                    </Tooltip>
                ) : (
                    <Tooltip title="Añadir Parada" placement="top">
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={handleCreateMode}
                            disabled={open}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                )}
            </div>
        </div>
    )
}
