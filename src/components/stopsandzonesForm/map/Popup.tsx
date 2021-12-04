import React from 'react'
import StopForm from './StopForm'
// import { useSelector } from 'react-redux'
import { Popup } from 'react-map-gl'
// import { DefaultRootStateProps, StopsAndZonesProps } from 'types'

interface PopupProp {
    stopId?: string
    readOnly?: boolean
    createMode?: boolean
    data: any
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setCreateMarker: React.Dispatch<React.SetStateAction<Array<any>>>
}

const PopupCustom = ({
    data,
    open,
    setOpen,
    stopId,
    readOnly,
    createMode,
    setCreateMarker,
}: PopupProp) => {
    return (
        <Popup
            latitude={parseFloat(data.location.coordinates.latitude)}
            longitude={parseFloat(data.location.coordinates.longitude)}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
                setOpen(!open)
                setCreateMarker([])
            }}
            offsetTop={-30}
        >
            <StopForm
                stopData={data}
                readOnly={readOnly}
                setCreateMarker={setCreateMarker}
                createMode={createMode}
                setOpen={setOpen}
            />
        </Popup>
    )
}

export default PopupCustom
