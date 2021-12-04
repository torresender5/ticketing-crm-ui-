// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { OverrideIcon } from 'types'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import MultipleStopIcon from '@mui/icons-material/MultipleStop'
import TrafficIcon from '@mui/icons-material/Traffic'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import HandymanIcon from '@mui/icons-material/Handyman'

// constant
const icons = {
    PointOfSaleIcon,
    MultipleStopIcon,
    TrafficIcon,
    AccountBalanceIcon,
    HandymanIcon,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface ReportsModuleProps {
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

const ReportsModule: ReportsModuleProps = {
    id: 'reportsModule',
    title: <FormattedMessage id="Reportes" />,
    type: 'group',
    children: [
        {
            id: 'ventas',
            title: <FormattedMessage id="Ventas" />,
            type: 'item',
            icon: icons.PointOfSaleIcon,
            url: '/reporte-de-ventas',
            breadcrumbs: false,
        },
        {
            id: 'transitos',
            title: <FormattedMessage id="Tránsitos" />,
            type: 'item',
            icon: icons.TrafficIcon,
            url: '/reporte-de-transitos',
            breadcrumbs: false,
        },
        {
            id: 'liquidaciones',
            title: <FormattedMessage id="Liquidaciones" />,
            type: 'item',
            icon: icons.AccountBalanceIcon,
            url: '/reporte-de-liquidaciones',
            breadcrumbs: false,
        },
        {
            id: 'mantenimiento',
            title: <FormattedMessage id="Mantenimiento" />,
            type: 'item',
            icon: icons.HandymanIcon,
            url: '/reporte-de-mantenimiento',
            breadcrumbs: false,
        },
    ],
}

export default ReportsModule
