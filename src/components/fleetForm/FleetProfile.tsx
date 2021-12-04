import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DefaultRootStateProps, FleetDataProps } from 'types'

//REDUX
import { useDispatch, useSelector } from 'react-redux'
import {  gridSpacing } from 'store/constant'
import {
    createFleetRequest,
    updateFleetRequest,
} from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'

const useStyles = makeStyles((theme: Theme) => ({
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
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
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
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    unit_id: string
    transportation_mean: string
    plate: string
    vin?: string
    make: string
    model: string
    capacity: number
    fuel_type?: string
    tank_capacity?: number
    manfucture_date?: string
}

const Schema = yup.object().shape({
    unit_id: yup
        .string()
        .max(8, 'Maximo 8 caracteres')
        .required('Este campo es requerido'),
    transportation_mean: yup.string().required('Este campo es obligatorio'),
    plate: yup.string().required('Este campo es obligatorio'),
    vin: yup.string().optional(),
    make: yup.string().required('Este campo es obligatorio'),
    model: yup.string().required('Este campo es obligatorio'),
    manfucture_date: yup
        .string()
        .required('Este campo es requerido')
        .matches(
            /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            'La fecha introducida no es válida'
        ),
    capacity: yup
        .number()
        .min(1, 'Debe ser mayor a 0')
        .required('Este campo es requerido'),
    fuel_type: yup.string().required('Este campo es obligatorio'),
    tank_capacity: yup
        .number()
        .min(1, 'Debe ser mayor a 0')
        .required('Este campo es obligatorio'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
}

const FleetProfile = ({ fleetId, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fleets = useSelector((state: DefaultRootStateProps) => state.fleets)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    const fuelTypes = useSelector((state:DefaultRootStateProps) => state.login.user.content.web_config.fuel_type)
    const transportMeans= useSelector((state: DefaultRootStateProps) => state.login.user.content.web_config.transport_means)

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [fleetData] = React.useState<FleetDataProps | undefined>(
        fleets?.find((fleet) => fleet.id === fleetId)
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('transportation_mean', fleetData?.transportation_mean, {
            shouldValidate: true,
        })
        setValue('unit_id', fleetData?.unit_id, {
            shouldValidate: true,
        })
        setValue('capacity', fleetData?.capacity, {
            shouldValidate: true,
        })
        setValue('make', fleetData?.make, {
            shouldValidate: true,
        })
        setValue('model', fleetData?.model, {
            shouldValidate: true,
        })
        setValue('plate', fleetData?.plate, {
            shouldValidate: true,
        })
        setValue('vin', fleetData?.vin, {
            shouldValidate: true,
        })
        setValue('manfucture_date', fleetData?.manfucture_date, {
            shouldValidate: true,
        })
        setValue('fuel_type', fleetData?.fuel_type, {
            shouldValidate: true,
        })
        setValue('tank_capacity', fleetData?.tank_capacity, {
            shouldValidate: true,
        })
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        const {
            unit_id,
            transportation_mean,
            plate,
            // vin,
            make,
            model,
            capacity,
            fuel_type,
            tank_capacity,
            // manfucture_date,
        } = data

        if (!editable) {
            dispatch(
                createFleetRequest({
                    unit_id,
                    transportation_mean,
                    plate,
                    make,
                    model,
                    capacity,
                    fuel_type,
                    tank_capacity,
                })
            )
            navigate(`/gestion-flota/listar`)
        }

        if (editable) {
            dispatch(
                updateFleetRequest({
                    id: fleetId,
                    unit_id,
                    transportation_mean,
                    plate,
                    make,
                    model,
                    capacity,
                    fuel_type,
                    tank_capacity,
                })
            )
            navigate('/gestion-flota/listar')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">Datos de la unidad</Typography>
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

                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="unit_id"
                        control={control}
                        defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Identificación de la unidad de transporte"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.unit_id}
                                    helperText={errors.unit_id?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="transportation_mean"
                        control={control}
                        defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo de unidad de transporte"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.transportation_mean}
                                    helperText={
                                        errors.transportation_mean?.message
                                    }
                                >
                                    {transportMeans && transportMeans.map((option) => (
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

                    <Controller
                        name="make"
                        control={control}
                        defaultValue={fleetData?.make}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Marca de la unidad de transporte"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.make}
                                    helperText={errors.make?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="model"
                        control={control}
                        defaultValue={fleetData?.model}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Modelo de la unidad de transporte"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.model}
                                    helperText={errors.model?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="plate"
                        control={control}
                        defaultValue={fleetData?.plate}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Placa de la unidad"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.plate}
                                    helperText={errors.plate?.message}
                                ></TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="vin"
                        control={control}
                        defaultValue={fleetData?.vin}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Vin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.vin}
                                    helperText={errors.vin?.message}
                                ></TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="manfucture_date"
                        control={control}
                        defaultValue={fleetData?.manfucture_date}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type="date"
                                    label="Fecha de fabricación"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.manfucture_date}
                                    helperText={errors.manfucture_date?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="capacity"
                        control={control}
                        defaultValue={fleetData?.capacity}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Capacidad de pasajeros de la unidad"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.capacity}
                                    helperText={errors.capacity?.message}
                                ></TextField>
                            </Grid>
                        )}
                    />
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Datos del combustible
                        </Typography>
                    </Grid>

                    <Controller
                        name="fuel_type"
                        control={control}
                        defaultValue={fleetData?.fuel_type}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo de combustible"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.fuel_type}
                                    helperText={errors.fuel_type?.message}
                                >
                                    {fuelTypes && fuelTypes.map((option) => (
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
                        name="tank_capacity"
                        control={control}
                        defaultValue={fleetData?.tank_capacity}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Capacidad del tanque de combustible"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.tank_capacity}
                                    helperText={errors.tank_capacity?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <AnimateButton>
                                        <Button
                                            // variant="contained"
                                            size="medium"
                                            onClick={handleCancelEdit}
                                            className="mx-4"
                                            color="error"
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
                            {readOnly ? null : (
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Crear Unidad
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FleetProfile
