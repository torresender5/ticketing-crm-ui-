import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { TRANSPORT_TYPE } from 'store/constant'

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

// project imports
import { gridSpacing } from 'store/constant'
// import { getTypesCompanyRequest } from 'store/typesCompany/typesCompanyActions'
//Icons

import { DefaultRootStateProps, fareProps } from 'types'
import { getDaysRequest } from 'store/weekDays/WeekdaysAction'
import { getCardsRequest } from 'store/cards/cardsActions'
import {
    createTariffRequest,
    updateTariffRequest,
} from 'store/tariff_management/TariffActions'

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
    route: string
    calendar_1: string
    calendar_2: string
    calendar: number
    category: Array<string>
    factor_card: number
    overdraft_allowed: boolean
    max_allowed_overdraft: string
}
//schema validation
const Schema = yup.object().shape({
    route: yup.string().required('Este campo es requerido'),
    calendar_1: yup.string().required('Este campo es requerido'),
    calendar_2: yup.string().required('Este campo es requerido'),
    calendar: yup.number().required('Este campo es requerido'),
    category: yup.array().required('Este campo es requerido'),
    factor_card: yup.number().required('Este campo es requerido'),
    overdraft_allowed: yup.boolean(),
    max_allowed_overdraft: yup.string().when('overdraft_allowed', {
        is: true,
        then: yup.string().required('Este campo es requerido'),
    }),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface FareProfileProps {
    fareIdParam?: string
    view?: boolean
}

const TariffFormProfile = ({ fareIdParam, view }: FareProfileProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fares = useSelector((state: DefaultRootStateProps) => state.fares)
    const days = useSelector((state: DefaultRootStateProps) => state.days)
    const cardCategory = useSelector(
        (state: DefaultRootStateProps) => state.cards
    )
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES
    const [initialRender, setInitialRender] = React.useState<boolean>(true)
    const [filialCompanyID, setFilialCompanyID] = React.useState<string>('')
    const [readOnly, setReadOnly] = React.useState<boolean | undefined>(view)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [checkError, setCheckError] = React.useState<boolean>(false)
    const [equalBankInfo, setEqualBankInfo] = React.useState<boolean>(false)
    const [fareData] = React.useState<fareProps | undefined>(
        fares?.find((fare) => fare.id === fareIdParam)
    )
    const [filialCompany, setFilialCompany] = React.useState<boolean>(
        !!fareData?.overdraft_allowed
    )
    const [checksData, setChecksData] = React.useState<any>(
        view ? fareData?.calendar?.week_days?.days_hours : []
    )
    console.log(checksData)

    const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value

        const someValue = checksData.some((element) => element === currentValue)
        const filterData = checksData.filter(
            (element) => element !== currentValue
        )
        setInitialRender(false)
        if (someValue) setChecksData([...filterData])
        else setChecksData([...checksData, currentValue])
    }

    const handleFilialCompanySwitch = () => {
        setValue('overdraft_allowed', !filialCompany, {
            shouldValidate: true,
        })
        setFilialCompany(!filialCompany)
        setEqualBankInfo(equalBankInfo)
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        if (checksData.length < 1) {
            setCheckError(true)
            return
        }
        return
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(data)
        if (checkError) {
            return
        }

        const {
            route,
            calendar_1,
            calendar_2,
            calendar,
            category,
            factor_card,
            overdraft_allowed,
            max_allowed_overdraft,
        } = data
        if (!editable) {
            dispatch(
                createTariffRequest({
                    route,
                    calendar: {
                        week_days: {
                            // days_hours: [...checksData],
                        },
                        weekends: `${calendar_1}-${calendar_2}`,
                    },
                    allowed_categories: [
                        {
                            category: category,
                        },
                    ],
                    fare_prices: {
                        price: `${calendar * factor_card}`,
                    },
                    overdraft_allowed,
                    max_allowed_overdraft,
                })
            )
        }
        if (editable) {
            dispatch(
                updateTariffRequest({
                    id: fareData?.id,
                    route,
                    calendar: {
                        week_days: {
                            // days_hours: [...checksData],
                        },
                        weekends: `${calendar_1}-${calendar_2}`,
                    },
                    allowed_categories: [
                        {
                            category: category,
                        },
                    ],
                    fare_prices: {
                        price: `${calendar * factor_card}`,
                    },
                    overdraft_allowed,
                    max_allowed_overdraft,
                })
            )
        }

        navigate(`/gestion-de-tarifas`)
    }

    const onChangeFilialCompany = (e) => {
        e.preventDefault()
        setValue('overdraft_allowed', e.target.value, {
            shouldValidate: true,
        })
        setFilialCompanyID(e.target.value)
    }

    const handleAbleToEdit = () => {
        setReadOnly(!readOnly)
        setEditable(!editable)
    }
    const handleCancelEdit = () => {
        setReadOnly(!readOnly)
        setEditable(!editable)

        setValue('route', fareData?.route, {
            shouldValidate: true,
        })
        setValue('calendar_1', fareData?.calendar?.weekends, {
            shouldValidate: true,
        })
        setValue('calendar_2', fareData?.calendar?.weekends, {
            shouldValidate: true,
        })
        setValue('calendar', fareData?.fare_prices.price, {
            shouldValidate: true,
        })
        setValue('category', fareData?.allowed_categories, {
            shouldValidate: true,
        })
        setValue('factor_card', fareData?.fare_prices.price, {
            shouldValidate: true,
        })
        setValue('overdraft_allowed', fareData?.overdraft_allowed, {
            shouldValidate: true,
        })
        setValue('max_allowed_overdraft', fareData?.max_allowed_overdraft, {
            shouldValidate: true,
        })

        setChecksData(fareData?.calendar?.week_days?.days_hours)
    }

    // EFFECTS
    // VALIDATE CHECKS BOX
    React.useEffect(() => {
        if (fareIdParam) {
            const far = fares?.find((fare) => fare.id === fareIdParam)
            TRANSPORT_TYPE.map((types) => {
                if (far?.route === types.label) far.route = types.value
            })

            setValue('category', far?.allowed_categories, {
                shouldValidate: true,
            })

            setValue('route', far?.route, {
                shouldValidate: true,
            })
        }
    }, [fareIdParam, filialCompanyID, setValue])
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

    React.useEffect(() => {
        dispatch(getDaysRequest())
        dispatch(getCardsRequest())
    }, [])
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos de ruta</Typography>
            </Grid>
            {readOnly ? (
                <Grid item>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleAbleToEdit}
                            className="mx-60 -mt-8"
                        >
                            Editar
                        </Button>
                    </AnimateButton>
                </Grid>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '2px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="route"
                            control={control}
                            defaultValue={fareData?.route}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Lista de rutas"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.route}
                                    helperText={errors.route?.message}
                                    disabled={readOnly}
                                >
                                    {TRANSPORT_TYPE.map((option) => (
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
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Calendario ( Días y horas )
                            <FormHelperText>
                                {checkError ? (
                                    <span className="text-red-600">
                                        debes seleccionar al menos un día de la
                                        semana
                                    </span>
                                ) : null}
                            </FormHelperText>
                        </Typography>
                    </Grid>

                    {days.map(({ name }) => (
                        <Grid item xs={12} md={3} key={name}>
                            <FormControlLabel
                                name="checksData"
                                control={
                                    <Checkbox
                                        checked={checksData?.some(
                                            (element) => element === name
                                        )}
                                        onChange={handleChangeState}
                                        // name="weekends"
                                        color="primary"
                                        value={name}
                                        disabled={readOnly}
                                    />
                                }
                                label={name}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="calendar_1"
                            control={control}
                            defaultValue={fareData?.calendar?.weekends}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="time"
                                    // defaultValue="07:30"
                                    label="Comienzo del turno"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.calendar_1}
                                    helperText={errors.calendar_1?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="calendar_2"
                            control={control}
                            defaultValue={fareData?.calendar?.weekends}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="time"
                                    // defaultValue="20:30"
                                    label="Termino del turno"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.calendar_2}
                                    helperText={errors.calendar_2?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="calendar"
                            control={control}
                            defaultValue={fareData?.fare_prices.price}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Factor por calendario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.calendar}
                                    helperText={errors.calendar?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Categoría de tarjetas
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={fareData?.allowed_categories}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipos de tarjetas"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    // helperText={errors.category?.message}
                                    disabled={readOnly}
                                >
                                    {cardCategory.map((option) => (
                                        <MenuItem
                                            key={option.name}
                                            value={option.name}
                                        >
                                            {option.description}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.searchControl}>
                        <Controller
                            name="factor_card"
                            control={control}
                            defaultValue={fareData?.fare_prices.price}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="factor por tarjeta"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.factor_card}
                                    helperText={errors.factor_card?.message}
                                    disabled={readOnly}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={6} md={6}>
                        <Controller
                            name="overdraft_allowed"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value="top"
                                    name="overdraft_allowed"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleFilialCompanySwitch}
                                            checked={filialCompany}
                                            disabled={readOnly}
                                        />
                                    }
                                    label="Sobregiro admitido"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                    {filialCompany ? (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Controller
                                name="max_allowed_overdraft"
                                control={control}
                                defaultValue={fareData?.max_allowed_overdraft}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Máximo sobregiro admitido"
                                        size="small"
                                        autoComplete="off"
                                        onChange={onChangeFilialCompany}
                                        error={!!errors.max_allowed_overdraft}
                                        helperText={
                                            errors.max_allowed_overdraft
                                                ?.message
                                        }
                                        disabled={readOnly}
                                    />
                                )}
                            />
                        </Grid>
                    ) : null}
                </Grid>
                <Divider sx={{ marginTop: '70px' }} />
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <AnimateButton>
                                    <Button
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
                                        Gestionar Tarifa
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

export default TariffFormProfile
