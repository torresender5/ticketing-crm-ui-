import React, { FunctionComponent, ReactElement } from 'react'
import {
    PaletteMode,
    SvgIconTypeMap,
    SnackbarOrigin,
    ChipProps,
    TableCellProps,
} from '@material-ui/core'
import { Property } from 'csstype'

import { OverridableComponent } from '@material-ui/core/OverridableComponent'

// project imports
import { UserProfile } from '_mockApis/user-profile/types'
import { TablerIcon } from '@tabler/icons'
import { CartStateProps } from './cart'

export type ArrangementOrder = 'asc' | 'desc' | undefined

export type DateRange = { start: number | Date; end: number | Date }

export type GetComparator = (
    o: ArrangementOrder,
    o1: string
) => (a: KeyedObject, b: KeyedObject) => number

export type Direction = 'up' | 'down' | 'right' | 'left'

export type DialogMaxWidthType =
    | false
    | 'sm'
    | 'xs'
    | 'md'
    | 'lg'
    | 'xl'
    | undefined

export interface TabsProps {
    children?: React.ReactElement | string
    value: string | number
    index: number
}

export interface GenericCardProps {
    title?: string
    primary?: string | number | undefined
    secondary?: string
    content?: string
    image?: string
    dateTime?: string
    iconPrimary?: OverrideIcon
    color?: string
    size?: string
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
          muiName: string
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | TablerIcon

export interface EnhancedTableHeadProps extends TableCellProps {
    onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void
    order: ArrangementOrder
    orderBy?: string
    numSelected: number
    rowCount: number
    onRequestSort: (e: React.SyntheticEvent, p: string) => void
}

export interface EnhancedTableToolbarProps {
    numSelected: number
}

export type HeadCell = {
    id: string
    numeric: boolean
    label: string
    disablePadding?: string | boolean | undefined
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined
}

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

export type NavItemTypeObject = {
    children?: NavItemType[]
    items?: NavItemType[]
    type?: string
}

export type NavItemType = {
    id?: string
    icon?: GenericCardProps['iconPrimary']
    target?: boolean
    external?: string
    url?: string | undefined
    type?: string
    title?: React.ReactNode | string
    color?: 'primary' | 'secondary' | 'default' | undefined
    caption?: React.ReactNode | string
    breadcrumbs?: boolean
    disabled?: boolean
    chip?: ChipProps
}

export type AuthSliderProps = {
    title: string
    description: string
}

export interface CustomizationStateProps {
    isOpen: NavItemType[]
    type?: string
    id?: string
    navType: PaletteMode
    presetColor: string
    locale: string
    rtlLayout: boolean
    opened: boolean
    fontFamily: Property.FontFamily
    borderRadius?: number
    outlinedFilled: boolean
}
export interface SnackbarStateProps {
    action: boolean
    open: boolean
    message: string
    anchorOrigin: SnackbarOrigin
    variant: string
    alertSeverity: 'error' | 'warning' | 'success'
    transition: string
    close: boolean
    actionButton: boolean
}

export interface ColorPaletteProps {
    color: string
    label: string
    value: string
}

export interface OperatingCompanyProps {
    id?: string
    company_code?: string
    name: string
    abbreviation: string
    nif: string
    address: string
    city: string
    state: string
    legal_representative: string
    id_number: string
    company_type?: string
    logo?: string
    active: boolean
    department?: number
    filial_company?: string
    transportation_means?: Array<string>
    bank_details: [
        {
            bank?: string
            bank_code: string
            bank_name: string
            bank_agency: string
            account_type: string
            account_number: string
            swift_code?: string
        }
    ]
    created_by?: string
    created_on?: string
}
export interface TBanksProps {
    id: string
    bank_code: string
    bank_name: string
    swift_code: string
}

export interface TCardsProps {
    id?:string
    category: string,
    name: string,
    description: string,
    allowed_media: Array<string>,
    is_ticket_allowed: boolean,
    web_rechargable: boolean,
    allowed_actions: Array<string>,
    abbreviation: string,
    currency?: string, 

}

export interface TWeekDays {
    id?: string
    weekday: string
    name: string
    abbreviation: string
    description: string
}

export interface StopsAndZonesProps {
    id?: string
    stop_code?: string
    trans_means?: string
    name?: string
    abbreviation?: string
    route?: string
    location: {
        type?: any
        coordinates: {
            latitude: string
            longitude: string
        }
    }
    municipality_code?: string
    state_code?: string
    is_public_stop?: boolean
}

export interface UserProps {
    id?: string
    employee_code?: string
    company_code?: string
    second_name: string
    second_last_name?: string
    sex: string
    personal_id: string
    mobile: string
    active: boolean
    role?: Array<string>
    permissions: Array<string>
    description: string
    department_no: number
    operator_card: string
    created_on: string
    last_update_on: null
    user?: string
    user_data: {
        id?: string
        username: string
        password?: string
        first_name: string
        last_name: string
        email: string
    }
}

export interface UserTry {
    user: {
        username: string
        password: string
        first_name: string
        last_name: string
        email: string
    }
    employee: {
        employee_code?: string
        company_code?: string
        second_name: string
        second_last_name?: string
        sex: string
        personal_id: string
        mobile: string
        role: string
        permissions: Array<string>
        description: string
        department_no: number
        operator_card: string
    }
}

export interface UserEdit {
    user: {
        username: string
        password: string
        first_name: string
        last_name: string
        email: string
    }
    employee: {
        id?: string
        user: string
        employee_code?: string
        company_code?: string
        second_name: string
        second_last_name?: string
        sex: string
        personal_id: string
        mobile: string
        role: Array<string>
        permissions: Array<string>
        description: string
        department_no: number
        operator_card: string
    }
}

export interface FleetDataProps {
    id?: string
    unit_id: string
    name?: string
    company_code?: string
    transportation_mean: string
    vin?: string
    plate: string
    make: string
    model: string
    capacity: number
    fuel_type?: string
    tank_capacity?: number
    manfucture_date?: string
    features?: string
}
export interface TAuthorizedRoutes{
    stop_code: string,
    trans_means: string,
    name: string,
    abbreviation: string,
    route: string,
    location: {
        type: string,
        state: string,
        municipality: string,
    },
}

export interface fareProps {
    id?: string
    route: string
    fare_iso_code?: string
    calendar?: {
        week_days?: {
            days_hours?: Array<string>
            night_hours?: string
        }
        weekends?: string
        holidays?: string
    }
    allowed_categories: [
        {
            category: Array<string>
        }
    ]
    fare_prices: {
        from_zone?: Array<string>
        to_zone?: Array<string>
        price: string
    }
    overdraft_allowed: boolean
    max_allowed_overdraft: string
    created_on?: string
    updated_on?: string
    version?: string
}

export interface DefaultRootStateProps {
    login: any
    loginData: TLoginDataProps
    customization: CustomizationStateProps
    snackbar: SnackbarStateProps
    cart: CartStateProps
    cards: Array<TCardsProps>
    operatingCompanies: Array<OperatingCompanyProps>
    stopsAndZones: Array<StopsAndZonesProps>
    users: Array<UserProps>
    fleets: Array<FleetDataProps>
    users2: Array<UserTry>
    usersEdit: Array<UserEdit>
    banks: Array<TBanksProps>
    typesCompany: Array<TTypesCompany>
    accountTypes: Array<TAccountTypes>
    stateOptions: Array<TStateOptions>
    cities: Array<TCities>
    fuelTypes: Array<TFuelTypes>
    roles: Array<TRoles>
    transportMeans: Array<TTransportMeans>
    authorizedRoutes:Array<TAuthorizedRoutes>
    fares: Array<fareProps>
    days: Array<TWeekDays>
}

export interface ColorProps {
    readonly [key: string]: string
}

export type GuardProps = {
    children: ReactElement | null
}

export interface StringColorProps {
    id?: string
    label?: string
    color?: string
    primary?: string
    secondary?: string
}

export interface JWTData {
    userId: string
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any
}

export interface initialLoginContextProps {
    isLoggedIn: boolean | string | null
    isInitialized: boolean
    user?: UserProfile | null | undefined
    content?: object
}
export interface TLoginDataProps{
    username:string
    password:string
}

export interface FormInputProps {
    bug: KeyedObject
    fullWidth?: boolean
    size?: 'small' | 'medium' | undefined
    label: string
    name: string
    required?: boolean
    InputProps?: {
        label: string
        startAdornment?: React.ReactNode
    }
}

export type HandleFunction = (i: string, s: string) => Promise<void>

export type Event = {
    id: string
    allDay: boolean
    color: string
    textColor?: string
    description: string
    start: Date
    end: Date
    title: string
}

/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean
export type StringNumFunc = (s: string) => number
export type NumbColorFunc = (n: number) => StringColorProps | undefined
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void

// CONST
// Types Company const
export interface TTypesCompany {
    id: string
    company_type: string
    name: string
    description: string
}
// account types

export interface TAccountTypes {
    id: string
    name: string
    account_code: string
    abbreviation: string
    description: string
}

// State
export interface TStateOptions {
    id: string
    state_code: string
    alpha_code: string
    name: string
    abbreviation: string
    description: string
}

// cities
export interface TCities {
    id: string
    city_code: string
    alpha_code: string
    name: string
    abbreviation: string
    description: string
}

// Fuel Types

export interface TFuelTypes {
    id: string
    name: string
    abbreviation: string
    description: string
}

export interface TRoles {
    id: string
    role: string
    name: string
    abbreviation: string
    description: string
}

// transport means
export interface TTransportMeans {
    id: string
    trans_means: string
    trans_mode: string
    name: string
    abbreviation: string
    description: string
}
