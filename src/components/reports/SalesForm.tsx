import React from 'react'

// material-ui
import {
    Grid,
    CardActions,
    TextField,
    Button,
    Theme,
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

// project imports
import { gridSpacing } from 'store/constant'
import { makeStyles } from '@material-ui/styles'

//hook-form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { DefaultRootStateProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsRequest } from 'store/cards/cardsActions'
import { getCompaniesRequest } from 'store/operatingCompany/operatingCompanyActions'
import { getUsersRequest } from 'store/users/usersActions'

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

interface Inputs {
    date_range: string
    company_code: string
    operator_id: string
    payment_method: string
    card_category: string
    initial_date: string
    finish_date: string
}

const a = [
    {
        label: 'Gasolina',
        value: 'gas',
    },
    {
        label: 'Diesel',
        value: 'diesel',
    },
    {
        label: 'G.L.P',
        value: 'glp',
    },
]

const Schema = yup.object().shape({
    initial_date: yup.date().required('Este campo es requerido'),
    finish_date: yup
        .date()
        .min(yup.ref('initial_date'), 'Debe ser mayor que la fecha inicial')
        .required('Este campo es requerido'),
    company_code: yup.string().required('Este campo es requerido'),
    operator_id: yup.string().required('Este campo es requerido'),
    payment_method: yup.string().required('Este campo es requerido'),
    card_category: yup.string().required('Este campo es requerido'),
})

const SalesForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const cardCategory = useSelector(
        (state: DefaultRootStateProps) => state.cards
    )

    const operatingCompanies = useSelector(
        (state: DefaultRootStateProps) => state.operatingCompanies
    )

    const user = useSelector((state: DefaultRootStateProps) => state.users)
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)

        // const {
        //     date_range,
        //     company_code,
        //     operator_id,
        //     payment_method,
        //     card_category,
        //     initial_date,
        //     finish_date
        // } = data
    }
    React.useEffect(() => {
        dispatch(getCardsRequest())
        dispatch(getCompaniesRequest())
        dispatch(getUsersRequest())
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    spacing={gridSpacing}
                    className={classes.searchControl}
                >
                    <Controller
                        name="initial_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type="date"
                                    label="Fecha de inicio"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.initial_date}
                                    helperText={errors.initial_date?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="finish_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type="date"
                                    label="Fecha de cierre"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.finish_date}
                                    helperText={errors.finish_date?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="company_code"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Código de compañia"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.company_code}
                                    helperText={errors.company_code?.message}
                                >
                                    {operatingCompanies.map((option) => (
                                        <MenuItem
                                            key={option.company_code}
                                            value={option.company_code}
                                        >
                                            {option.company_code}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="operator_id"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Operador de venta"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.operator_id}
                                    helperText={errors.operator_id?.message}
                                >
                                    {user.map((option) => (
                                        <MenuItem
                                            key={option.operator_card}
                                            value={option.operator_card}
                                        >
                                            {option.operator_card}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="payment_method"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Método de pago"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.payment_method}
                                    helperText={errors.payment_method?.message}
                                >
                                    {a.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="card_category"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Categoría de tarjeta"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.card_category}
                                    helperText={errors.card_category?.message}
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
                            </Grid>
                        )}
                    />
                </Grid>
                <CardActions>
                    <Grid
                        container
                        justifyContent="flex-end"
                        spacing={0}
                        sx={{ marginTop: '10px' }}
                    >
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    type="submit"
                                >
                                    Crear Reporte
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default SalesForm
