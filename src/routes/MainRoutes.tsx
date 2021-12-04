import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'ui-component/Loadable'
import AuthGuard from 'utils/route-guard/AuthGuard'

//Empresas operadoras
const ReadOperatingCompanies = Loadable(
    lazy(() => import('views/operatingCompanies/ReadOperatingCompanies'))
)
const CreateOperatingCompany = Loadable(
    lazy(() => import('views/operatingCompanies/CreateOperatingCompany'))
)
const EditOperatingCompany = Loadable(
    lazy(() => import('views/operatingCompanies/EditOperatingCompany'))
)
///////////////// flota asociada a una empresa//////////////////
const ReadFleetCompany = Loadable(
    lazy(() => import('views/fleetAsociateCompany/ReadFleetCompany'))
)

const CreateFleetCompany = Loadable(
    lazy(() => import('views/fleetAsociateCompany/CreateFleetCompany'))
)
const EditFleetCompany = Loadable(
    lazy(() => import('views/fleetAsociateCompany/EditFleetCompany'))
)
//Usuarios
const ReadUsers = Loadable(lazy(() => import('views/users/ReadUsers')))
const CreateUser = Loadable(lazy(() => import('views/users/CreateUser')))
const EditUser = Loadable(lazy(() => import('views/users/EditUser')))

//Mantenimiento
const RestartBackend = Loadable(
    lazy(() => import('views/maintenance/RestartBackend'))
)
const RestartTradeInfo = Loadable(
    lazy(() => import('views/maintenance/RestartTradeInfo'))
)

//Combustible
const Fuel = Loadable(lazy(() => import('views/Fuel')))

//Proveedores
const ReadVendors = Loadable(lazy(() => import('views/vendors/ReadVendors')))
const CreateVendor = Loadable(lazy(() => import('views/vendors/CreateVendor')))
const EditVendor = Loadable(lazy(() => import('views/vendors/EditVendor')))

//Ordenes
const ReadOrders = Loadable(lazy(() => import('views/orders/ReadOrders')))
const CreateOrder = Loadable(lazy(() => import('views/orders/CreateOrder')))
const EditOrder = Loadable(lazy(() => import('views/orders/EditOrder')))

//Gestión de Soporte
const Support = Loadable(lazy(() => import('views/Support')))

//Gestión De Estructura Tarifaria
const ReadTariff = Loadable(
    lazy(() => import('views/tariff/Tariff/ReadTariff'))
)
const CreateTariff = Loadable(
    lazy(() => import('views/tariff/Tariff/CreateTariff'))
)
const EditTariff = Loadable(
    lazy(() => import('views/tariff/Tariff/EditTariff'))
)

// Gestión de Tarjetas
const ReadCards = Loadable(lazy(() => import('views/tariff/cards/ReadCards')))
const CreateCard = Loadable(lazy(() => import('views/tariff/cards/CreateCard')))
const EditCard = Loadable(lazy(() => import('views/tariff/cards/EditCard')))
const Titles = Loadable(lazy(() => import('views/tariff/Titles')))
// const StopsAndZones = Loadable(lazy(() => import('views/tariff/StopsAndZones')))
// const Cards = Loadable(lazy(() => import('views/tariff/Cards')))
// const Titles = Loadable(lazy(() => import('views/tariff/Titles')))

//////////////////////Paradas y zonas//////////////////////////////
const ReadStopsAndZones = Loadable(
    lazy(() => import('views/tariff/StopsAndZones/ReadStopsAndZones'))
)
const CreateStopsAndZones = Loadable(
    lazy(() => import('views/tariff/StopsAndZones/CreateStopsAndZones'))
)

const EditStopsAndZones = Loadable(
    lazy(() => import('views/tariff/StopsAndZones/EditStopsAndZones'))
)

const RoutesAndLines = Loadable(
    lazy(() => import('views/tariff/RoutesAndLines/ReadRoutesAndLines'))
)
const Transfers = Loadable(lazy(() => import('views/tariff/Transfers')))
const Prices = Loadable(lazy(() => import('views/tariff/Prices')))
const Exchanges = Loadable(lazy(() => import('views/tariff/Exchanges')))

//Gestión De Títulos De Transporte
const TransportTitles = Loadable(
    lazy(() => import('views/transportTitlesManagement/TransportTitles'))
)
const Moviments = Loadable(
    lazy(() => import('views/transportTitlesManagement/Movements'))
)
const HeadlineManagement = Loadable(
    lazy(() => import('views/transportTitlesManagement/HeadlineManagement'))
)
const TitlesManagement = Loadable(
    lazy(() => import('views/transportTitlesManagement/TitlesManagement'))
)
const ListsManagement = Loadable(
    lazy(() => import('views/transportTitlesManagement/ListsManagement'))
)

//Monitorización De Equipos
const FleetManagement = Loadable(
    lazy(() => import('views/equipmentMonitoring/FleetManagement'))
)
const EquipmentsManagement = Loadable(
    lazy(() => import('views/equipmentMonitoring/EquipmentsManagement'))
)

//Reportes
const SaleReports = Loadable(lazy(() => import('views/reports/SaleReports')))
const TransitReports = Loadable(
    lazy(() => import('views/reports/TransitReports'))
)
const LiquidationsReports = Loadable(
    lazy(() => import('views/reports/LiquidationsReports'))
)
const MaintenanceReports = Loadable(
    lazy(() => import('views/reports/MaintenanceReports'))
)

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/gestion-empresa/listar',
            element: <ReadOperatingCompanies />,
        },
        {
            path: '/gestion-empresa/crear',
            element: <CreateOperatingCompany />,
        },
        {
            path: '/gestion-empresa/editar/:id',
            element: <EditOperatingCompany />,
        },
        {
            path: '/gestion-flota/listar',
            element: <ReadFleetCompany />,
        },
        {
            path: '/gestion-flota/crear',
            element: <CreateFleetCompany />,
        },
        {
            path: '/gestion-flota/editar/:id',
            element: <EditFleetCompany />,
        },
        {
            path: '/gestion-usuarios/listar',
            element: <ReadUsers />,
        },
        {
            path: '/gestion-usuarios/crear',
            element: <CreateUser />,
        },
        {
            path: '/gestion-usuarios/editar/:id',
            element: <EditUser />,
        },
        {
            path: '/mantenimiento/reiniciar-backend',
            element: <RestartBackend />,
        },
        {
            path: '/mantenimiento/reiniciar-trade-info',
            element: <RestartTradeInfo />,
        },
        {
            path: '/combustible',
            element: <Fuel />,
        },
        {
            path: '/proveedores/listar',
            element: <ReadVendors />,
        },
        {
            path: '/proveedor/crear',
            element: <CreateVendor />,
        },
        {
            path: '/proveedor/editar/:id',
            element: <EditVendor />,
        },
        {
            path: '/gestion-de-ordenes/listar',
            element: <ReadOrders />,
        },
        {
            path: '/gestion-de-ordenes/crear',
            element: <CreateOrder />,
        },
        {
            path: '/gestion-de-ordenes/editar/:id',
            element: <EditOrder />,
        },
        {
            path: '/gestion-de-soporte',
            element: <Support />,
        },
        {
            path: '/gestion-de-tarifas',
            element: <ReadTariff />,
        },
        {
            path: '/gestion-de-tarifas/crear',
            element: <CreateTariff />,
        },
        {
            path: '/gestion-de-tarifas/editar/:id',
            element: <EditTariff />,
        },
        {
            path: '/categoria-de-tarjetas/listar',
            element: <ReadCards />,
        },
        {
            path: '/categoria-de-tarjetas/crear',
            element: <CreateCard />,
        },
        {
            path: '/categoria-de-tarjetas/editar/:id',
            element: <EditCard />,
        },
        {
            path: '/definicion-de-titulos',
            element: <Titles />,
        },
        {
            path: '/paradas-y-zonas/listar',
            element: <ReadStopsAndZones />,
        },
        {
            path: '/paradas-y-zonas/crear',
            element: <CreateStopsAndZones />,
        },
        {
            path: '/paradas-y-zonas/editar/:id',
            element: <EditStopsAndZones />,
        },
        {
            path: '/rutas-y-lineas/listar',
            element: <RoutesAndLines />,
        },
        {
            path: '/definicion-de-transferencias',
            element: <Transfers />,
        },
        {
            path: '/gestion-de-precios',
            element: <Prices />,
        },
        {
            path: '/definicion-de-tipos-de-cambios',
            element: <Exchanges />,
        },
        {
            path: '/titulos-de-transporte',
            element: <TransportTitles />,
        },
        {
            path: '/movimientos',
            element: <Moviments />,
        },
        {
            path: '/gestion-de-titulares',
            element: <HeadlineManagement />,
        },
        {
            path: '/gestion-de-tareas-asociadas-a-titulos',
            element: <TitlesManagement />,
        },
        {
            path: '/gestion-de-listas',
            element: <ListsManagement />,
        },
        {
            path: '/gestion-de-flota',
            element: <FleetManagement />,
        },
        {
            path: '/gestion-de-equipos-fijos',
            element: <EquipmentsManagement />,
        },
        {
            path: '/reporte-de-ventas',
            element: <SaleReports />,
        },
        {
            path: '/reporte-de-transitos',
            element: <TransitReports />,
        },
        {
            path: '/reporte-de-liquidaciones',
            element: <LiquidationsReports />,
        },
        {
            path: '/reporte-de-mantenimiento',
            element: <MaintenanceReports />,
        },
    ],
}

export default MainRoutes
