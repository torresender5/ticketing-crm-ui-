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
    FormHelperText,
    Switch,
    // MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

// project imports
import { gridSpacing } from 'store/constant'
import {
    createCardsRequest,
    updateCardsRequest,
} from 'store/cards/cardsActions'

//Icons
import { DefaultRootStateProps, TCardsProps } from 'types'

// CONSTANTS
const allowSupports = [
    {
        name: 'Ticket sin soporte',
    },
    {
        name: 'Codigo 1D/2D',
    },
    {
        name: 'Mifare Ultralight',
    },
    {
        name: 'Mifare Classic 1K',
    },
    {
        name: 'Mifare 4K',
    },
]
const allowActions = [
    {
        name: 'Inicializacion',
    },
    {
        name: 'Transito',
    },
    {
        name: 'Consumo',
    },
    {
        name: 'Remplazo',
    },
    {
        name: 'Emision',
    },
    {
        name: 'Borrado',
    },
    {
        name: 'Terminado',
    },
    {
        name: 'Bloquear',
    },
    {
        name: 'Retornar',
    },
    {
        name: 'Personalizar',
    },
    {
        name: 'Pago',
    },
    {
        name: 'Devolucion',
    },
    {
        name: 'Penalizacion',
    },
]

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
    category: string
    name: string
    description: string
    abbreviation: string
    allowed_media: Array<string>
    is_ticket_allowed: boolean
    web_rechargable: boolean
    allowed_actions: Array<string>
}
//schema validation
const Schema = yup.object().shape({
    category: yup
        .string()
        .required('Este campo es requerido')
        .min(1, 'Minimo 2 caracterers')
        .max(2, 'Maximo 2 caracteres'),

    name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),

    description: yup.string().required('Este campo es requerido'),

    // allowed_media: yup
    //     .array()
    //     .required('Debe seleccionar al menos un soporte'),

    is_ticket_allowed: yup.boolean(),
    //.required('Este campo es requerido'),

    web_rechargable: yup.boolean(),
    //.required('Este campo es requerido'),

    // allowed_actions: yup
    //     .array()
    //     .required('Debes seleccionar al menos una accion'),

    abbreviation: yup.string().required('Este campo es requerido'),
    // .min(4)
    // .max(6),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    cardsIdParam?: string
    readOnly?: boolean
}

const CardForm = ({ cardsIdParam, readOnly }: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cards = useSelector((state: DefaultRootStateProps) => state.cards)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES
    const [initialRender, setInitialRender] = React.useState<boolean>(true)
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [checkErrorMedia, setCheckErrorMedia] = React.useState<boolean>(false)
    const [checkErrorAction, setCheckErrorAction] = React.useState<boolean>(false)
    const [cardsData] = React.useState<TCardsProps| any >(
        readOnlyState ? cards?.find((cardsItems) => cardsItems?.id === cardsIdParam) : []
    )
    const [isTicketAllowed, setIsTicketAllowed] = React.useState<boolean>(
        cardsData?.is_ticket_allowed
    )
    const [webRechargable, setWebRechargable] = React.useState<boolean>(
        cardsData?.web_rechargable
    )
    const [checksDataMedia, setChecksDataMedia] = React.useState<any>(
        readOnlyState ? cardsData?.allowed_media : []
    )
    const [checksDataActions, setChecksDataActions] = React.useState<any>(
        readOnlyState ? cardsData?.allowed_actions : []
    )

    // FUNCTIONS
    // const optionsCompanies = companies.map((company) => {
    //     return {
    //         label: company.name,
    //         value: company.company_code,
    //     }
    // })

    const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value
        const currentName = event.target.name
        if (currentName === 'allowed_media') {
            const someValue = checksDataMedia.some(
                (element) => element === currentValue
            )
            const filterData = checksDataMedia.filter(
                (element) => element !== currentValue
            )
            setInitialRender(false)
            if (someValue) setChecksDataMedia([...filterData])
            else setChecksDataMedia([...checksDataMedia, currentValue])
        }
        if (currentName === 'allowed_actions') {
            const someValue = checksDataActions.some(
                (element) => element === currentValue
            )
            const filterData = checksDataActions.filter(
                (element) => element !== currentValue
            )
            setInitialRender(false)
            if (someValue) setChecksDataActions([...filterData])
            else setChecksDataActions([...checksDataActions, currentValue])
        }
    }

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        if (name === 'is_ticket_allowed') {
            setIsTicketAllowed(!isTicketAllowed)
            setValue(name, !isTicketAllowed)
        }

        if (name === 'web_rechargable') {
            setWebRechargable(!webRechargable)
            setValue(name, !webRechargable)
        }
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        if (checksDataMedia.length < 1 || checksDataActions.length < 1) {
            if (checksDataMedia.length < 1) setCheckErrorMedia(true)
            if (checksDataActions.length < 1) setCheckErrorAction(true)
            return
        }
        return
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(data)
        if (checkErrorMedia || checkErrorAction) {
            return
        }
        const {
            category,
            name,
            abbreviation,
            description,
            //allowed_media,
            //is_ticket_allowed,
            web_rechargable,
            //allowed_actions,
        } = data
        const currency= "USD"

        if (!editable) {
            dispatch(
                createCardsRequest({
                    category,
                    name,
                    description,
                    allowed_media: checksDataMedia,
                    is_ticket_allowed: isTicketAllowed,
                    web_rechargable: webRechargable,
                    allowed_actions: checksDataActions,
                    abbreviation,
                    currency, 
                })
            )
        }
        if (editable) {
            dispatch(
                updateCardsRequest({
                    id: cardsIdParam,
                    category,
                    name,
                    description,
                    allowed_media: checksDataMedia,
                    is_ticket_allowed: isTicketAllowed,
                    web_rechargable,
                    allowed_actions: checksDataActions,
                    abbreviation,
                    currency,
})
            )
        }
        setTimeout(() => {
            // dispatch(getCardsRequest())
            navigate(`/categoria-de-tarjetas/listar`)
        }, 500)
    }

    // const onChangeFilialCompany = (e) => {
    //     e.preventDefault()
    //     setValue('filialCompany', e.target.value, {
    //         shouldValidate: true,
    //     })
    //     setFilialCompanyId(e.target.value)
    // }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)

        setValue('category', cardsData?.category, {
            shouldValidate: true,
        })
        setValue('name', cardsData?.name, {
            shouldValidate: true,
        })
        setValue('description', cardsData?.description, {
            shouldValidate: true,
        })
        setValue('is_ticket_allowed', cardsData?.is_ticket_allowed, {
            shouldValidate: true,
        })
        setValue('web_rechargable', cardsData?.web_rechargable, {
            shouldValidate: true,
        })
        setValue('allowed_media', cardsData?.allowed_media, {
            shouldValidate: true,
        })
        setValue('allowed_actions', cardsData?.allowed_actions, {
            shouldValidate: true,
        })
        setValue('abbreviation', cardsData?.abbreviation, {
            shouldValidate: true,
        })
        setChecksDataMedia(cardsData?.allowed_media)
        setChecksDataActions(cardsData?.allowed_actions)
        setWebRechargable(cardsData?.web_rechargable)
        setIsTicketAllowed(cardsData?.is_ticket_allowed)
    }

    // EFFECTS
    // VALIDATE CHECKS BOX
    React.useEffect(() => {
        if (!initialRender) {
            if (checksDataMedia.length < 1) setCheckErrorMedia(true)
            if (checksDataMedia.length >= 1) setCheckErrorMedia(false)
            if (checksDataActions.length < 1) setCheckErrorAction(true)
            if (checksDataActions.length >= 1) setCheckErrorAction(false)
        }
    }, [checksDataMedia, checksDataActions, initialRender])

    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">Datos de la tarjeta</Typography>
                {readOnlyState ? (
                    <Grid item sx={{ marginRight: '16px' }}>
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
                            name="category"
                            control={control}
                            defaultValue={cardsData?.category || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={readOnlyState}
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
                            name="name"
                            control={control}
                            defaultValue={cardsData?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tipo de Tarjeta"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
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
                            name="description"
                            control={control}
                            defaultValue={cardsData?.description || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Descripción"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    disabled={readOnlyState}
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
                            defaultValue={cardsData?.abbreviation || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Abreviatura"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.abbreviation}
                                    helperText={errors.abbreviation?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Soportes admitidos
                            <FormHelperText>
                                {checkErrorMedia ? (
                                    <span className="text-red-600">
                                        Debes seleccionar al menos un soporte
                                        admitido
                                    </span>
                                ) : null}
                            </FormHelperText>
                        </Typography>
                    </Grid>

                    {allowSupports.map(({ name }) => (
                        <Grid item xs={12} md={3} key={name}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checksDataMedia?.some(
                                            (element) => element === name
                                        )}
                                        onChange={handleChangeState}
                                        name="allowed_media"
                                        color="primary"
                                        value={name}
                                        disabled={readOnlyState}
                                    />
                                }
                                label={name}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Acciones admitidas
                            <FormHelperText>
                                {checkErrorAction ? (
                                    <span className="text-red-600">
                                        Debes seleccionar al menos un acción
                                        admitida
                                    </span>
                                ) : null}
                            </FormHelperText>
                        </Typography>
                    </Grid>

                    {allowActions.map(({ name }) => (
                        <Grid item xs={12} md={3} key={name}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checksDataActions?.some(
                                            (element) => element === name
                                        )}
                                        onChange={handleChangeState}
                                        name="allowed_actions"
                                        color="primary"
                                        value={name}
                                        disabled={readOnlyState}
                                    />
                                }
                                label={name}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Controller
                            name="is_ticket_allowed"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value={isTicketAllowed || ''}
                                    name="is_ticket_allowed"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleSwitch}
                                            value={isTicketAllowed}
                                            checked={isTicketAllowed}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Admite títulos asociados"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Controller
                            name="web_rechargable"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value={webRechargable || ''}
                                    name="web_rechargable"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleSwitch}
                                            checked={webRechargable}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Admite recarga vía web"
                                    labelPlacement="start"
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
                                        //variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={handleCancelEdit}
                                        className="mx-4"
                                    >
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        // onclick={}
                                    >
                                        Aceptar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        ) : null}
                        {readOnly ? null : (
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        Crear Tarjeta
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

export default CardForm
