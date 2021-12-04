// third-party
import { FormattedMessage } from 'react-intl'

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconBasket,
    IconGasStation,
    IconBuildingStore,
    IconHelp,
} from '@tabler/icons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { OverrideIcon } from 'types'

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconBasket,
    IconGasStation,
    IconBuildingStore,
    IconHelp,
    ContentPasteIcon,
    Inventory2OutlinedIcon,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface InventoryModuleProps {
    id: string
    title: React.ReactNode | string
    type: string
    children:
        | {
              id: string
              title: React.ReactNode | string
              type: string
              icon: OverrideIcon
              children: {
                  id: string
                  title: React.ReactNode | string
                  type: string
                  url: string
                  breadcrumbs: boolean
              }[]
          }
        | any
}

const InventoryModule: InventoryModuleProps = {
    id: 'InventoryModule',
    title: <FormattedMessage id="Inventario" />,
    type: 'group',
    children: [
        {
            id: 'proveedores',
            title: <FormattedMessage id="Proveedores" />,
            type: 'collapse',
            icon: icons.IconBuildingStore,
            children: [
                {
                    id: 'readVendors',
                    title: <FormattedMessage id="Listar" />,
                    type: 'item',
                    url: '/proveedores/listar',
                    breadcrumbs: false,
                },
                {
                    id: 'createVendors',
                    title: <FormattedMessage id="Crear" />,
                    type: 'item',
                    url: '/proveedor/crear',
                    breadcrumbs: false,
                },
            ],
        },
        {
            id: 'Gestion de ordenes',
            title: <FormattedMessage id="Gestión de ordenes" />,
            type: 'collapse',
            icon: ContentPasteIcon,
            children: [
                {
                    id: 'readOrders',
                    title: <FormattedMessage id="Listar" />,
                    type: 'item',
                    url: '/gestion-de-ordenes/listar',
                    breadcrumbs: false,
                },
                {
                    id: 'createOrders',
                    title: <FormattedMessage id="Crear" />,
                    type: 'item',
                    url: '/gestion-de-ordenes/crear',
                    breadcrumbs: false,
                },
            ],
        },
        {
            id: 'Gestion de soporte',
            title: <FormattedMessage id="Gestion de soporte" />,
            type: 'item',
            icon: Inventory2OutlinedIcon,
            url: '/gestion-de-soporte',
            breadcrumbs: false,
        },
    ],
}

export default InventoryModule
