import React from 'react'
import { Marker } from 'react-map-gl'
// import { v4 as uuidv4 } from 'uuid'
import { StopsAndZonesProps } from 'types'
// import { Fab, Tooltip } from '@material-ui/core'
// import AddIcon from '@material-ui/icons/Add'
import BusIcon from '../icons/BusIcon'
// import TableChartIcon from '@material-ui/icons/TableChart'
// import FilterIcon from '@material-ui/icons/FilterList'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import Transitions from 'ui-component/extended/Transitions'
import Map from 'components/Map'
import RoutePanel from './RoutePanel'
import Transitions from 'ui-component/extended/Transitions'

interface MapProps {
    StopIdProp?: string
    returnButtonAction?: React.MouseEventHandler<HTMLButtonElement>
    stopsAndZonesData: Array<StopsAndZonesProps> | Array<any>
    editMarker: boolean
}

export default function MapRoutes({
    StopIdProp,
    returnButtonAction,
    stopsAndZonesData,
    editMarker,
}: MapProps) {
    const [stopId, setStopId] = React.useState<string | undefined>(
        StopIdProp || ''
    )
    const [markers, setMarkers] =
        React.useState<Array<StopsAndZonesProps>>(stopsAndZonesData)
    // const [createMarker, setCreateMarker] = React.useState<
    //     Array<StopsAndZonesProps>
    // >([])
    const [findStopData, setFindStopData] = React.useState<
        StopsAndZonesProps | undefined
    >(stopsAndZonesData?.find((marker) => marker.stop.stop_code === stopId))
    const [open, setOpen] = React.useState<boolean>(editMarker)

    // React.useEffect(() => {
    // const nameFilter = stopsAndZonesData?.filter((stop) =>
    //     stop?.stop?.name
    //         .toLowerCase()
    //         .includes(filterOptions?.name.toLowerCase())
    // )
    // const stopCodeFilter = nameFilter?.filter((stop) =>
    //     stop?.stop?.stop_code.includes(filterOptions?.stop_code)
    // )
    //     const routeFilter = stopsAndZonesData?.filter((stop) =>
    //         stop?.stop?.route
    //             .toLowerCase()
    //             .includes(filterOptions?.route.toLowerCase())
    //     )
    //     const typeFilter = routeFilter?.filter((stop) =>
    //         stop?.stop?.location.type
    //             .toLowerCase()
    //             .includes(filterOptions?.type.toLowerCase())
    //     )
    //     const stateFilter = typeFilter?.filter((stop) =>
    //         stop?.stop?.location.state
    //             .toLowerCase()
    //             .includes(filterOptions?.state.toLowerCase())
    //     )
    //     const municipalityFilter = stateFilter?.filter((stop) =>
    //         stop?.stop?.location.municipality
    //             .toLowerCase()
    //             .includes(filterOptions?.municipality.toLowerCase())
    //     )
    //     setMarkers(municipalityFilter)
    // }, [filterOptions])

    React.useEffect(() => {
        setMarkers(stopsAndZonesData)
    }, [stopsAndZonesData])

    const handleOpen = (e) => {
        e.preventDefault()
        const stopCode = e.currentTarget.dataset.id
        setStopId(stopCode)
        setFindStopData(
            stopsAndZonesData?.find((marker) => marker.stop_code === stopCode)
        )
        setOpen(!open)
    }

    const handleMarkers = (e) => {
        // if (e.target.localName === 'button') {
        //     return
        // }
        // const [longitude, latitude] = e.lngLat
        // if (!readOnly && !open && createMode) {
        //     setCreateMarker((markers) => [
        //         {
        //             stop: {
        //                 stop_code: uuidv4(),
        //                 location: { coordinates: { longitude, latitude } },
        //             },
        //         },
        //     ])
        //     setOpen(!open)
        // }
    }
    // const handleCreateMode = () => {
    //     setReadOnly(!readOnly)
    //     setCreateMode(!createMode)
    // }
    // function getCursor({ isHovering, isDragging }) {
    //     return createMode
    //         ? isDragging
    //             ? 'grabbing'
    //             : 'crosshair'
    //         : isDragging
    //         ? 'grabbing'
    //         : 'grab'
    // }

    return (
        <div className="flex">
            <Map
                onClick={handleMarkers}
                latitude={Number(findStopData?.location?.coordinates?.latitude)}
                longitude={Number(
                    findStopData?.location?.coordinates?.longitude
                )}
                zoom={editMarker ? 18 : 8}
                // getCursor={getCursor}
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
                                data-id={marker.stop_code}
                                type="button"
                                //     disabled={createMode}
                                className={`text-gray-600 pointer-events-none`}
                            >
                                <BusIcon />
                            </button>
                        </Marker>
                    ))}
                </>
            </Map>
            <div className="w-1/3">
                <Transitions type="grow" in position="top-left" direction="up">
                    <RoutePanel />
                </Transitions>
            </div>
        </div>
    )
}
