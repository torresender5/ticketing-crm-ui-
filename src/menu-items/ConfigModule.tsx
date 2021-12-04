// third-party
import { FormattedMessage } from 'react-intl'

// assets
// import {
//     IconAdjustments,
//     IconUserCheck,
//     IconBasket,

// } from '@tabler/icons'
import DomainIcon from '@material-ui/icons/Domain'
import BuildIcon from '@material-ui/icons/Build'
import { OverrideIcon } from 'types'

// const icons = {
//     IconAdjustments,

//     IconUserCheck,
//     IconBasket,

// }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface ConfigModuleProps {
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

const ConfigModule: ConfigModuleProps = {
    id: 'operatingCompanies',
    title: <FormattedMessage id="Configuración" />,
    type: 'group',
    children: [
        {
            id: 'Gestion de empresas operadoras',
            title: <FormattedMessage id="Gestión de Empresas Operadoras" />,
            type: 'collapse',
            icon: DomainIcon,
            children: [
                {
                    id: 'gestion de empresas',
                    title: <FormattedMessage id="Gestion de empresas" />,
                    type: 'item',
                    url: '/gestion-empresa/listar',
                    breadcrumbs: false,
                },
                {
                    id: 'Gestion de usuarios',
                    title: <FormattedMessage id="Gestión de Usuarios" />,
                    type: 'item',
                    url: '/gestion-usuarios/listar',
                    breadcrumbs: false,
                },
                {
                    id: 'Gestion de flota',
                    title: <FormattedMessage id="Gestión de Flota" />,
                    type: 'item',
                    url: '/gestion-flota/listar',
                    breadcrumbs: false,
                },
            ],
        },
        {
            id: 'maintenance',
            title: <FormattedMessage id="Mantenimiento" />,
            type: 'collapse',
            icon: BuildIcon,
            children: [
                {
                    id: 'restart-backend',
                    title: <FormattedMessage id="Reiniciar el backend" />,
                    type: 'item',
                    url: '/mantenimiento/reiniciar-backend',
                    breadcrumbs: true,
                },
                {
                    id: 'restart-service',
                    title: (
                        <FormattedMessage id="Reiniciar el Servicio de Pagos Pendientes" />
                    ),
                    type: 'item',
                    url: '/mantenimiento/reiniciar-trade-info',
                    breadcrumbs: true,
                },
            ],
        },
    ],
}

export default ConfigModule
