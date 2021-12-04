import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
// import {
//     SNACKBAR_OPEN,
//     ADD_OPERATING_COMPANY,
//     UPDATE_OPERATING_COMPANY,
// } from 'store/actions'
import {
    // ACCOUNT_TYPES,
    // BANKS,
    // CITIES,
    // COMPANY_TYPES,
    RIF_OPTIONS,
    // STATES,
    TRANSPORT_TYPE,
} from 'store/constant'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    Typography,
    FormControlLabel,
    Checkbox,
    CardActions,
    Divider,
    MenuItem,
    FormHelperText,
    Switch,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'
import Avatar from 'ui-component/extended/Avatar'

// project imports
import { gridSpacing } from 'store/constant'
import { createCompaniesRequest, updateCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'
import { getTypesCompanyRequest } from 'store/typesCompany/typesCompanyActions'
//Icons
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
import { DefaultRootStateProps, OperatingCompanyProps } from 'types'
// import { getBanksRequest } from 'store/banks/banksActions'
// import { getAccountTypesRequest } from 'store/account_type/accountTypeActions'
// import { getStateRequest } from 'store/state/stateActions'
// import { getCitiesRequest } from 'store/cities/citiesActions'


// CONSTANTS

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

//types form
interface Inputs {
    name: string
    abbreviation: string
    company_type: string
    rifCompanyType: string
    nif: string
    state: string
    city: string
    legal_representative: string
    rifRepresent: string
    cedula: string
    bank_agency: string
    account_number: string
    account_type: string
    bank_code: string
    filialCompanySwitch: boolean
    transportation_means: Array<{ name: string }>
    address: string
    filialCompany: string
}
//schema validation
const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    abbreviation: yup
        .string()
        .required('Este campo es requerido')
        .min(4)
        .max(6),
    company_type: yup.string().required('Este campo es requerido'),
    rifCompanyType: yup.string().required('Este campo es requerido'),
    nif: yup
        .string()
        .required('Este campo es requerido')
        .min(8, 'Mínimo 8 digitos'),
    state: yup.string().required('Este campo es requerido'),
    city: yup.string().required('Este campo es requerido'),
    legal_representative: yup
        .string()
        .required('Este campo es requerido')
        .min(8, 'Mínimo 8 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    rifRepresent: yup.string().required('Este campo es requerido'),
    cedula: yup.string().required('Este campo es requerido'),
    bank_agency: yup.string().required('Este campo es requerido'),
    account_number: yup
        .string()
        .required('Este campo es requerido')
        .min(12, 'Mínimo 12 digitos'),
    account_type: yup.string().required('Este campo es requerido'),
    bank_code: yup.string().required('Este campo es requerido'),
    transportation_means: yup.boolean(),
    address: yup
        .string()
        .required('Este campo es requerido')
        .min(8, 'Mínimo 8 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    filialCompanySwitch: yup.boolean(),
    filialCompany: yup.string().when('filialCompanySwitch', {
        is: true,
        then: yup.string().required('Este campo es requerido'),
    }),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    companyIdParam?: string
    view?: boolean
}

const CompanyProfileForm = ({
    companyIdParam,
    view,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const companies = useSelector(
        (state: DefaultRootStateProps) => state.operatingCompanies
    )
    // const banks = useSelector(
    //     (state: DefaultRootStateProps) => state.banks
    // )
    const typesCompany = useSelector(
        (state: DefaultRootStateProps) => state.login.user.content.web_config.company_type
    )
    const banks = useSelector(
        (state: DefaultRootStateProps) => state.login.user.content.web_config.banks
    )
    const accountTypes = useSelector(
        (state: DefaultRootStateProps) => state.login.user.content.web_config.account_types
    )
    const stateOptions = useSelector(
        (state: DefaultRootStateProps) => state.login.user.content.web_config.estate
    )
    const cities = useSelector(
        (state: DefaultRootStateProps) => state.login.user.content.web_config.cities
    )
    const {
        handleSubmit,
        control,
        formState: { errors, dirtyFields },
        setValue,
        getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES
    const [initialRender, setInitialRender] = React.useState<boolean>(true)
    const [filialCompanyID, setFilialCompanyId] = React.useState<string>('')
    const [readOnly, setReadOnly] = React.useState<boolean | undefined>(view)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [checkError, setCheckError] = React.useState<boolean>(false)
    const [equalBankInfo, setEqualBankInfo] = React.useState<boolean>(false)
    const [companyData] = React.useState<OperatingCompanyProps | undefined>(
        companies?.find((company) => company.id === companyIdParam)
    )
    const [filialCompany, setFilialCompany] = React.useState<boolean>(
        !!companyData?.filial_company
    )
    const [checksData, setChecksData] = React.useState<any>(
        view ? companyData?.transportation_means : []
    )
    const [CitiesSelected ,setCitiesSelected]= React.useState<any>([])

    // FUNCTIONS
    const optionsCompanies = companies.map((company) => {
        return {
            label: company.name,
            value: company.company_code,
        }
    })


    const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value
        const someValue = checksData.some((element) => element === currentValue)
        setInitialRender(false)
        if (someValue) {
            const filterData = checksData.filter(
                (element) => element !== currentValue
            )
            setChecksData([...filterData])
        } else {
            setChecksData([...checksData, currentValue])
        }
    }

    const handleFilialCompanySwitch = () => {
        setValue('filialCompanySwitch', !filialCompany, {
            shouldValidate: true,
        })
        setFilialCompany(!filialCompany)
        setEqualBankInfo(false)
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        if (checksData.length < 1) {
            setCheckError(true)
            return
        }
        return
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (checkError) {
            return
        }
        const bankName = banks.find(
            (bank) => bank.bank_code === getValues('bank_code')
        )?.bank_name
        const {
            name,
            abbreviation,
            address,
            rifRepresent,
            nif,
            cedula,
            state,
            city,
            company_type,
            filialCompany,
            legal_representative,
            account_type,
            bank_code,
            bank_agency,
            account_number,
        } = data
        if (!editable) {
            dispatch(
                createCompaniesRequest({
                    company_code: uuidv4(),
                    name,
                    abbreviation,
                    nif: `${rifRepresent}-${nif}`,
                    city,
                    state,
                    legal_representative,
                    id_number: `${rifRepresent}-${cedula}`,
                    company_type,
                    active: true,
                    address,
                    transportation_means: checksData,
                    filial_company: filialCompany,
                    bank_details: [
                        {
                            bank_name: bankName as string,
                            bank_code,
                            account_type,
                            bank_agency,
                            account_number,
                        },
                    ],
                })
            )
        }
        if (editable) {
            console.log('as')
            dispatch(
                updateCompaniesRequest({
                    id: companyData?.id, 
                    company_code: companyData?.company_code,
                    name,
                    abbreviation,
                    nif: `${rifRepresent}-${nif}`,
                    city,
                    state,
                    legal_representative,
                    id_number: `${rifRepresent}-${cedula}`,
                    company_type,
                    active: true,
                    address,
                    transportation_means: checksData,
                    filial_company: filialCompany,
                    bank_details: [
                        {
                            bank_name: bankName as string,
                            bank_code,
                            account_type,
                            bank_agency,
                            account_number,
                        },
                    ],
                })
            )
        }

        navigate(`/gestion-empresa/listar`)
    }

    const onChangeFilialCompany = (e) => {
        e.preventDefault()
        setValue('filialCompany', e.target.value, {
            shouldValidate: true,
        })
        setFilialCompanyId(e.target.value)
    }

    const handleAbleToEdit = () => {
        setReadOnly(!readOnly)
        setEditable(!editable)
    }
    const handleCancelEdit = () => {
        setReadOnly(!readOnly)
        setEditable(!editable)
        setValue('bank_agency', companyData?.bank_details[0]?.bank_agency, {
            shouldValidate: true,
        })
        setValue('bank_code', companyData?.bank_details[0]?.bank_code, {
            shouldValidate: true,
        })
        setValue('account_type', companyData?.bank_details[0]?.account_type, {
            shouldValidate: true,
        })
        setValue(
            'account_number',
            companyData?.bank_details[0]?.account_number,
            {
                shouldValidate: true,
            }
        )
        setValue('name', companyData?.name, {
            shouldValidate: true,
        })
        setValue('abbreviation', companyData?.abbreviation, {
            shouldValidate: true,
        })
        setValue('company_type', companyData?.company_type, {
            shouldValidate: true,
        })
        setValue('rifCompanyType', companyData?.nif.charAt(0), {
            shouldValidate: true,
        })
        setValue('nif', companyData?.nif.replace(/\D/g, ''), {
            shouldValidate: true,
        })
        setValue('state', companyData?.state, {
            shouldValidate: true,
        })
        setValue('city', companyData?.city, {
            shouldValidate: true,
        })
        setValue('address', companyData?.address, {
            shouldValidate: true,
        })
        setValue('legal_representative', companyData?.legal_representative, {
            shouldValidate: true,
        })
        setValue('rifRepresent', companyData?.id_number.charAt(0), {
            shouldValidate: true,
        })
        setValue('cedula', companyData?.id_number.replace(/\D/g, ''), {
            shouldValidate: true,
        })
        setChecksData(companyData?.transportation_means)
        if (companyData?.filial_company) {
            setFilialCompany(true)
            setValue('filialCompany', companyData?.filial_company, {
                shouldValidate: true,
            })
        }
        if (!companyData?.filial_company) {
            setFilialCompany(false)
            setValue('filialCompany', '', {
                shouldValidate: true,
            })
        }
    }
    const handleState = (event)=> {
        const target = event.target
        const code = target.value
        console.log(code)
        const state = stateOptions.find((state) => state.state_code === code)
        console.log('state', state.name)
        var option= new Array();
        var c_options = cities.map((items) => {
            // let item;
            if(items.state === state.name){
                option.push(items)
                
                // console.log(items)
                // item = items
            } 
           
        //     console.log(item )
        //     return item

            
        })
        console.log(option)
        setCitiesSelected(option)
        console.log(CitiesSelected)

        console.log('c_options', c_options)
        return code
    }
    // EFFECTS
    // VALIDATE CHECKS BOX
    React.useEffect (()=>{
        if(companyIdParam){
            const com = companies?.find((company) => company.id === companyIdParam)

            typesCompany.map((types) => {
                if(com?.company_type === types.id && com?.company_type ) com.company_type = types.company_type
            })
            stateOptions.map((state)=> {
                if(com?.state === state.name && com?.state) com.state = state.state_code
            })
            cities.map((item) => {
                if(com?.city === item.name && com?.city ) com.city= item.city_code
            })
            banks.map((item)=>{
                if(com?.bank_details[0].bank === item.id) com?.bank_details.map((i) => i.bank = item.bank_code)
            })
            console.log("bancode",com?.bank_details[0]?.bank )
            accountTypes.map((item)=> {
                if(com?.bank_details[0].account_type === item.id) com?.bank_details.map((i) => i.account_type = item.account_code)
            })

            setValue('company_type', com?.company_type, { shouldValidate: true })
            setValue('state', com?.state, { shouldValidate: true })
            setValue('çity', com?.city, { shouldValidate: true }) 
            setValue('bank_code', com?.bank_details[0]?.bank, { shouldValidate: true })
            setValue('account_type', com?.bank_details[0]?.account_type,{ shouldValidate: true })
        }

    },[companyIdParam, setValue])

    React.useLayoutEffect(() => {
        if (!initialRender) {
            if (checksData.length < 1) {
                setCheckError(true)
            }
            if (checksData.length >= 1) {
                setCheckError(false)
            }
        }
    }, [checksData, initialRender])
    React.useLayoutEffect(() => {
        if (equalBankInfo) {
            const findValue = companies.find(
                (company) => company.company_code === getValues('filialCompany')
            )?.bank_details
            if( findValue){
                banks.map((item)=>{
                    if(findValue?.[0].bank=== item.id) findValue[0].bank = item.bank_code
                })
                accountTypes.map((item)=> {
                    if(findValue?.[0].account_type === item.id) findValue[0].account_type = item.account_code
                })
            }

            console.log("findValue", findValue)

            console.log(findValue)
            const value = findValue?.map((item) => item.bank) 
            console.log(value)
            setValue(
                'bank_agency',
                findValue?.[0].bank_agency,
                {
                    shouldValidate: true,
                }
            )
            setValue(
                'bank_code',
                findValue?.[0].bank,
                {
                    shouldValidate: true,
                }
            )
            setValue(
                'account_type',
                findValue?.[0].account_type,
                {
                    shouldValidate: true,
                }
            )
            setValue(
                'account_number',
                findValue?.[0].account_number,
                {
                    shouldValidate: true,
                }
            )
        }
    }, [equalBankInfo, filialCompanyID, companies, getValues, setValue])

    React.useEffect(() => {
        dispatch(getTypesCompanyRequest())
    }, [])
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos de la empresa</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ marginTop: '5px' }}
                >
                    <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                        <Grid item xs={12}>
                            <label htmlFor="containedButtonFile">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="containedButtonFile"
                                    multiple
                                    type="file"
                                />

                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<UploadTwoToneIcon />}
                                >
                                    Cargar Imagen
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={12} sx={{ marginLeft: '17px' }}>
                            <Typography variant="caption">
                                <ErrorTwoToneIcon
                                    className={classes.alertIcon}
                                />
                                descripcion de logo a definir
                            </Typography>
                        </Grid>
                    </Grid>
                    {readOnly ? (
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAbleToEdit}
                                >
                                    Editar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={companyData?.name}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre de la empresa"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="abbreviation"
                            control={control}
                            defaultValue={companyData?.abbreviation}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Abreviatura  (nombre de la empresa)"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="company_type"
                            control={control}
                            defaultValue={companyData?.company_type}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo de empresa"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.company_type}
                                    helperText={errors.company_type?.message}
                                    disabled={readOnly}
                                >
                                    {typesCompany.map((option) => (
                                        <MenuItem
                                            key={option.company_type}
                                            value={option.company_type}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="rifCompanyType"
                            control={control}
                            defaultValue={companyData?.nif.charAt(0)}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.rifCompanyType}
                                    helperText={errors.rifCompanyType?.message}
                                    disabled={readOnly}
                                >
                                    {RIF_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="nif"
                            control={control}
                            defaultValue={companyData?.nif.replace(/\D/g, '')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Rif"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.nif}
                                    type="number"
                                    helperText={errors.nif?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="state"
                            control={control}
                            defaultValue={companyData?.state}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Estado"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={readOnly}
                                    onChange={handleState}
                                >
                                    {stateOptions.map((option) => (
                                        <MenuItem
                                            key={ option.state_code }
                                            value={ option.state_code }
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                   
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="city"
                            control={control}
                            defaultValue={companyData?.city}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Ciudad"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    disabled={CitiesSelected.length === 0 ? true : readOnly }
                                >
                                    {CitiesSelected.map((option) => (
                                        <MenuItem
                                            key={option.city_code}
                                            value={option.city_code}

                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="address"
                            control={control}
                            defaultValue={companyData?.address}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Dirección"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Controller
                            name="filialCompanySwitch"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value="top"
                                    name="filialCompanySwitch"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleFilialCompanySwitch}
                                            checked={filialCompany}
                                            disabled={readOnly}
                                        />
                                    }
                                    label="Compañia Filial"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                    {filialCompany ? (
                        <Grid
                            item
                            xs={6}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Controller
                                name="filialCompany"
                                control={control}
                                defaultValue={companyData?.filial_company}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Empresa"
                                        size="small"
                                        autoComplete="off"
                                        onChange={onChangeFilialCompany}
                                        error={!!errors.filialCompany}
                                        helperText={
                                            errors.filialCompany?.message
                                        }
                                        disabled={readOnly}
                                    >
                                        {optionsCompanies.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    ) : null}
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Modos de transporte asociado
                            <FormHelperText>
                                {checkError ? (
                                    <span className="text-red-600">
                                        debes seleccionar al menos un modo de
                                        transporte
                                    </span>
                                ) : null}
                            </FormHelperText>
                        </Typography>
                    </Grid>

                    {TRANSPORT_TYPE.map(({ label }) => (
                        <Grid item xs={12} md={3} key={label}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checksData?.some(
                                            (element) => element === label
                                        )}
                                        onChange={handleChangeState}
                                        name="transportType"
                                        color="primary"
                                        value={label}
                                        disabled={readOnly}
                                    />
                                }
                                label={label}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Datos del representante legal
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="legal_representative"
                            control={control}
                            defaultValue={companyData?.legal_representative}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre y Apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.legal_representative}
                                    helperText={
                                        errors.legal_representative?.message
                                    }
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="rifRepresent"
                            control={control}
                            defaultValue={companyData?.id_number.charAt(0)}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.rifRepresent}
                                    helperText={errors.rifRepresent?.message}
                                    disabled={readOnly}
                                >
                                    {RIF_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="cedula"
                            control={control}
                            defaultValue={companyData?.id_number.replace(
                                /\D/g,
                                ''
                            )}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Documento Legal"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.cedula}
                                    helperText={errors.cedula?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Datos Bancarios de la empresa
                        </Typography>
                    </Grid>
                    {filialCompany ? (
                        <Grid item xs={12} md={12}>
                            <FormControlLabel
                                value="top"
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={() =>
                                            setEqualBankInfo(!equalBankInfo)
                                        }
                                        checked={equalBankInfo}
                                        disabled={
                                            !dirtyFields.filialCompany ||
                                            readOnly
                                        }
                                    />
                                }
                                label="Misma cuenta de la compañia matriz"
                                labelPlacement="start"
                            />
                        </Grid>
                    ) : null}

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="bank_code"
                            control={control}
                            defaultValue={
                                companyData?.bank_details?.[0].bank_code || ''
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Banco"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.bank_code}
                                    helperText={errors.bank_code?.message}
                                    disabled={equalBankInfo || readOnly}
                                >
                                    {banks.map((option) => (
                                        <MenuItem
                                            key={option.bank_code}
                                            value={option.bank_code}
                                        >
                                            {option.bank_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="bank_agency"
                            control={control}
                            defaultValue={
                                companyData?.bank_details?.[0].bank_agency || ''
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Sucursal"
                                    size="small"
                                    autoComplete="off"
                                    disabled={equalBankInfo || readOnly}
                                    error={!!errors.bank_agency}
                                    helperText={
                                        errors.bank_agency
                                            ? 'Este campo es requerido'
                                            : ''
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="account_type"
                            control={control}
                            defaultValue={
                                companyData?.bank_details?.map(
                                    (item) => item.account_type
                                ) || ''
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo de cuenta"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.account_type}
                                    helperText={errors.account_type?.message}
                                    disabled={equalBankInfo || readOnly}
                                >
                                    {accountTypes.map((option) => (
                                        <MenuItem
                                            key={option.account_code}
                                            value={option.account_code}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="account_number"
                            control={control}
                            defaultValue={
                                companyData?.bank_details?.[0].account_number || ''
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Número de cuenta"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.account_number}
                                    disabled={equalBankInfo || readOnly}
                                    helperText={errors.account_number?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: '70px' }} />
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <AnimateButton>
                                    <Button
                                        // variant="contained"
                                        color="error"
                                        size="medium"
                                        onClick={handleCancelEdit}
                                        className="mx-4"
                                    >
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        type="submit"
                                    >
                                        Aceptar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        ) : null}
                        {editable ? null : (
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        type="submit"
                                    >
                                        Crear empresa
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        )}
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default CompanyProfileForm
