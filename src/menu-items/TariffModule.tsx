// third-party
import { FormattedMessage } from 'react-intl'

// assets

import { OverrideIcon } from 'types'
import PaymentsIcon from '@mui/icons-material/Payments'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard'
import RvHookupIcon from '@mui/icons-material/RvHookup'
import MultipleStopIcon from '@mui/icons-material/MultipleStop'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

// constant
const icons = {
    PaymentsIcon,
    CreditCardIcon,
    ImportContactsIcon,
    DepartureBoardIcon,
    RvHookupIcon,
    MultipleStopIcon,
    LocalAtmIcon,
    ChangeCircleIcon,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface TariffModuleProps {
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

const TariffModule: TariffModuleProps = {
    id: 'InventoryModule',
    title: <FormattedMessage id="Gestión de estructura tarifaria" />,
    type: 'group',
    children: [
        {
            id: 'Gestion de tarifas',
            title: <FormattedMessage id="Gestión de Tarifas" />,
            type: 'item',
            icon: icons.PaymentsIcon,
            url: '/gestion-de-tarifas',
            breadcrumbs: false,
        },
        {
            id: 'Categoria de tarjetas',
            title: <FormattedMessage id="Categoría de Tarjetas" />,
            type: 'item',
            icon: icons.CreditCardIcon,
            url: '/categoria-de-tarjetas/listar',
            breadcrumbs: false,
        },
        {
            id: 'Definición de titulos',
            title: <FormattedMessage id="Definición de Títulos" />,
            type: 'item',
            icon: icons.ImportContactsIcon,
            url: '/definicion-de-titulos',
            breadcrumbs: false,
        },
        {
            id: 'Paradas y Zonas',
            title: <FormattedMessage id="Paradas y Zonas" />,
            type: 'item',
            icon: icons.DepartureBoardIcon,
            url: '/paradas-y-zonas/listar',
            breadcrumbs: false,
        },
        {
            id: 'Rutas y Lineas',
            title: <FormattedMessage id="Rutas y Líneas" />,
            type: 'item',
            icon: icons.RvHookupIcon,
            url: '/rutas-y-lineas/listar',
            breadcrumbs: false,
        },
        {
            id: 'Definicion de Transferencias',
            title: <FormattedMessage id="Definición de Transferencias" />,
            type: 'item',
            icon: icons.MultipleStopIcon,
            url: '/definicion-de-transferencias',
            breadcrumbs: false,
        },
        {
            id: 'Gestion de precios',
            title: <FormattedMessage id="Gestión de Precios" />,
            type: 'item',
            icon: icons.LocalAtmIcon,
            url: '/gestion-de-precios',
            breadcrumbs: false,
        },
        {
            id: 'Definición de Tipos de Cambios',
            title: <FormattedMessage id="Definición de Tipos de Cambios" />,
            type: 'item',
            icon: icons.ChangeCircleIcon,
            url: '/definicion-de-tipos-de-cambios',
            breadcrumbs: false,
        },
    ],
}

export default TariffModule
