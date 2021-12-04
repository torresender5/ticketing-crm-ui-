import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, StopsAndZonesProps } from 'types'

//react-hook-form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// material-ui
import {
    Grid,
    TextField,
    Theme,
    MenuItem,
    Button,
    Typography,
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import AlertDialog from 'components/AlertDialog'
import MainCard from 'ui-component/cards/MainCard'
import {
    createStops,
    deleteStops,
    updateStops,
} from 'store/StopsAndZones/StopsAndZonesActions'
import { getTransportMeansRequest } from 'store/transportMeans/transportMeansActions'
import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        paddingRight: '10px',
        paddingLeft: '10px',
        marginTop: '10px',
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
    visibility: {
        display: 'none',
    },
}))

interface Inputs {
    stop_code: string
    name: string
    abbr: string
    transportation_mean: string
    companies: string
    isPublic: boolean
    publicStop: boolean
    latitude: string
    longitude: string
}
const Schema = yup.object().shape({
    stop_code: yup
        .string()
        .required('Este campo es requerido')
        .max(8, 'Máximo 8 caracteres'),
    name: yup.string().required('Este campo es requerido'),
    abbr: yup.string().required('Este campo es requerido'),
    transportation_mean: yup.string().required('Este campo es requerido'),
    companies: yup.string().required('Este campo es requerido'),
    isPublic: yup.boolean(),
    publicStop: yup.boolean().optional(),
    latitude: yup.string(),
    longitude: yup.string(),
})

interface StopFormProp {
    setCreateMarker: React.Dispatch<React.SetStateAction<Array<any>>>
    readOnly?: boolean
    stopData?: StopsAndZonesProps
    createMode?: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const StopForm = ({
    stopData,
    setCreateMarker,
    readOnly,
    createMode,
    setOpen,
}: StopFormProp) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const transportMeans = useSelector(
        (state: DefaultRootStateProps) => state.transportMeans
    )

    const companies = useSelector(
        (state: DefaultRootStateProps) => state.operatingCompanies
    )

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    //States
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [update, setUpdate] = React.useState<boolean>(false)
    const [publicStop, setPublicStop] = React.useState<boolean>(
        !!stopData?.is_public_stop
    )

    const handlePublicStopSwitch = () => {
        setValue('isPublic', !publicStop, {
            shouldValidate: true,
        })
        setPublicStop(!publicStop)
    }

    const handleEdit = () => {
        setReadOnlyState(!readOnlyState)
        setUpdate(!update)
        setValue('name', stopData?.name, {
            shouldValidate: true,
        })
    }

    const handleDelete = () => {
        setOpen(false)
        dispatch(deleteStops({ id: stopData?.id }))
    }

    React.useEffect(() => {
        dispatch(getTransportMeansRequest())
        dispatch(getCompaniesRequest())
    }, [])

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const {
            stop_code,
            name,
            abbr,
            transportation_mean,
            // companies,
            publicStop,
            latitude,
            longitude,
        } = data
        if (!update) {
            dispatch(
                createStops({
                    stop_code,
                    trans_means: transportation_mean,
                    name,
                    abbreviation: abbr,
                    location: {
                        type: 'parada',
                        coordinates: {
                            latitude,
                            longitude,
                        },
                    },
                    municipality_code: '1234',
                    state_code: '456',
                    is_public_stop: publicStop,
                })
            )

            setOpen(false)
            setCreateMarker([])
        }
        if (update) {
            dispatch(
                updateStops({
                    id: stopData?.id,
                    stop_code,
                    trans_means: transportation_mean,
                    name,
                    abbreviation: abbr,
                    location: {
                        type: 'parada',
                        coordinates: {
                            latitude,
                            longitude,
                        },
                    },
                    municipality_code: 'abc',
                    state_code: '456',
                    is_public_stop: publicStop,
                })
            )

            setReadOnlyState(!readOnlyState)
            setUpdate(!update)
        }
    }

    return (
        <>
            <MainCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} sx={{ marginBottom: '14px' }}>
                        <Typography variant="h4">Datos de la parada</Typography>
                    </Grid>

                    <Grid container spacing={1}>
                        <Controller
                            name="stop_code"
                            control={control}
                            defaultValue={stopData?.stop_code || ''}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.searchControl}
                                    sx={{ paddingBottom: '5px' }}
                                >
                                    <TextField
                                        fullWidth
                                        label="código de la parada"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.stop_code}
                                        {...field}
                                        helperText={errors.stop_code?.message}
                                        disabled={readOnlyState}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="abbr"
                            control={control}
                            defaultValue={stopData?.abbreviation}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        fullWidth
                                        label="Abreviatura"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.abbr}
                                        {...field}
                                        helperText={errors.abbr?.message}
                                        disabled={readOnlyState}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="name"
                            control={control}
                            defaultValue={stopData?.name || ''}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        fullWidth
                                        label="Nombre de la parada"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.name}
                                        {...field}
                                        helperText={errors.name?.message}
                                        disabled={readOnlyState}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="transportation_mean"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        select
                                        fullWidth
                                        label="Tipo de transporte"
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.transportation_mean}
                                        helperText={
                                            errors.transportation_mean?.message
                                        }
                                        disabled={readOnlyState}
                                    >
                                        {transportMeans.map((option) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )}
                        />

                        <Grid item xs={6} md={6}>
                            <Controller
                                name="isPublic"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        {...field}
                                        value="top"
                                        name="isPublic"
                                        control={
                                            <Switch
                                                color="primary"
                                                onChange={
                                                    handlePublicStopSwitch
                                                }
                                                checked={publicStop}
                                                disabled={readOnlyState}
                                            />
                                        }
                                        label={
                                            <Typography variant="caption">
                                                Pública
                                            </Typography>
                                        }
                                        labelPlacement="start"
                                        sx={{ color: 'black' }}
                                    />
                                )}
                            />
                        </Grid>

                        <Controller
                            name="companies"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        select
                                        fullWidth
                                        label="Compañias"
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.companies}
                                        helperText={errors.companies?.message}
                                        disabled={readOnlyState}
                                    >
                                        {companies.map((option) => (
                                            <MenuItem
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )}
                        />

                        <Controller
                            name="latitude"
                            control={control}
                            defaultValue={
                                stopData?.location?.coordinates.latitude || ''
                            }
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.visibility}
                                >
                                    <TextField
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="longitude"
                            control={control}
                            defaultValue={
                                stopData?.location?.coordinates?.longitude || ''
                            }
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={6}
                                    className={classes.visibility}
                                >
                                    <TextField
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </Grid>
                            )}
                        />

                        {readOnlyState ? (
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    width: '100%',
                                }}
                            >
                                <div className="w-1/2 mt-4 mr-1">
                                    <AnimateButton>
                                        <Button
                                            className="w-full"
                                            color="error"
                                            size="medium"
                                            onClick={() => setOpenModal(true)}
                                        >
                                            Eliminar parada
                                        </Button>
                                    </AnimateButton>
                                </div>
                                <div className="w-1/2 mt-4 ml-1">
                                    <AnimateButton>
                                        <Button
                                            className="w-full"
                                            variant="contained"
                                            size="medium"
                                            onClick={handleEdit}
                                        >
                                            Editar parada
                                        </Button>
                                    </AnimateButton>
                                </div>
                            </Grid>
                        ) : (
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'end',
                                    width: '100%',
                                }}
                            >
                                <div className="w-1/2 mt-4 pr-2 mx-auto">
                                    <AnimateButton>
                                        <Button
                                            className="w-full"
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Aceptar
                                        </Button>
                                    </AnimateButton>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </form>
                <AlertDialog
                    open={openModal}
                    setOpen={setOpenModal}
                    title="Eliminar"
                    description="¿Seguro que deseas eliminar esta parada?"
                    handleAccept={handleDelete}
                />
            </MainCard>
        </>
    )
}

export default StopForm
