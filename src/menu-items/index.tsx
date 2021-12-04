import { NavItemType } from 'types';

import ConfigModule from './ConfigModule'
import InventoryModule from './InventoryModule'
import TariffModule from './TariffModule';
import TransportTitlesModule from './TransportTitlesModule';
import EquipmentMonitoringModule from './EquipmentMonitoringModule';
import ReportsModule from './ReportsModule';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [
        ConfigModule, 
        InventoryModule, 
        TariffModule, 
        TransportTitlesModule,
        EquipmentMonitoringModule, 
        ReportsModule
    ]
};

export default menuItems;
