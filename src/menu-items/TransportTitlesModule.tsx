// third-party
import { FormattedMessage } from 'react-intl'

// assets

import { OverrideIcon } from 'types'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard'
import RuleIcon from '@mui/icons-material/Rule'

// constant
const icons = {
    ContactMailIcon,
    CreditCardIcon,
    HistoryEduIcon,
    DepartureBoardIcon,
    RuleIcon,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface TransportTitlesModuleProps {
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

const TransportTitlesModule: TransportTitlesModuleProps = {
    id: 'InventoryModule',
    title: <FormattedMessage id="Gestión de Títulos de Transporte" />,
    type: 'group',
    children: [
        {
            id: 'Titulos de Transporte',
            title: <FormattedMessage id="Títulos de Transporte" />,
            type: 'item',
            icon: icons.ContactMailIcon,
            url: '/titulos-de-transporte',
            breadcrumbs: false,
        },
        {
            id: 'movimientos',
            title: <FormattedMessage id="Movimientos" />,
            type: 'item',
            icon: icons.CreditCardIcon,
            url: '/movimientos',
            breadcrumbs: false,
        },
        {
            id: 'Titulares',
            title: <FormattedMessage id="Gestión de Titulares" />,
            type: 'item',
            icon: icons.HistoryEduIcon,
            url: '/gestion-de-titulares',
            breadcrumbs: false,
        },
        {
            id: 'Gestion de Tareas Asociadas a Títulos',
            title: (
                <FormattedMessage id="Gestión de Tareas Asociadas a Títulos" />
            ),
            type: 'item',
            icon: icons.DepartureBoardIcon,
            url: '/gestion-de-tareas-asociadas-a-titulos',
            breadcrumbs: false,
        },
        {
            id: 'Gestion de listas',
            title: <FormattedMessage id="Gestión de Listas" />,
            type: 'item',
            icon: icons.RuleIcon,
            url: '/gestion-de-listas',
            breadcrumbs: false,
        },
    ],
}

export default TransportTitlesModule
