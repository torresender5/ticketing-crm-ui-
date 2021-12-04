// third-party
import { FormattedMessage } from 'react-intl'

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconBasket,
    IconGasStation,
} from '@tabler/icons'
import { OverrideIcon } from 'types'
import CommuteIcon from '@mui/icons-material/Commute'
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone'

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconBasket,
    IconGasStation,
    CommuteIcon,
    PinDropTwoToneIcon,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface EquipmentMonitoringModuleProps {
    id: string
    title: React.ReactNode | string
    type: string
    children: {
        id: string
        title: React.ReactNode | string
        type: string
        icon: OverrideIcon
        url: string
        breadcrumbs: boolean
    }[]
}

const EquipmentMonitoringModule: EquipmentMonitoringModuleProps = {
    id: 'InventoryModule',
    title: <FormattedMessage id="Monitorización de Equipos" />,
    type: 'group',
    children: [
        {
            id: 'Gestion de Flota',
            title: <FormattedMessage id="Gestión de Flota" />,
            type: 'item',
            icon: icons.CommuteIcon,
            url: '/gestion-de-flota',
            breadcrumbs: false,
        },
        {
            id: 'Gestion de Equipos Fijos',
            title: <FormattedMessage id="Gestión de Equipos Fijos" />,
            type: 'item',
            icon: icons.PinDropTwoToneIcon,
            url: '/gestion-de-equipos-fijos',
            breadcrumbs: false,
        },
    ],
}

export default EquipmentMonitoringModule
