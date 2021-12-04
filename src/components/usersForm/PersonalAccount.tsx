import React from 'react'
// import ButtonUnstyled from '../Button/Button'
import {
    useForm,
    Controller,
    SubmitErrorHandler,
    SubmitHandler,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    SEX,
    RIF_OPTIONS,
    DEPARTMENTS,
    NUMBER_CODE,
    // ROLES,
} from 'store/constant'
import { makeStyles } from '@material-ui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import AnimateButton from 'ui-component/extended/AnimateButton'
import * as yup from 'yup'

// material-ui
import {
    Grid,
    TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Divider,
    Button,
    Stack,
} from '@material-ui/core'

// project imports
import { gridSpacing } from 'store/constant'
import { DefaultRootStateProps, UserProps } from 'types'
import { createUserRequest, updateUserRequest } from 'store/users/usersActions'
// import { DefaultRootStateProps } from 'types'

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
    first_name: string
    second_name: string
    last_name: string
    sex: string
    document_type: string
    personal_id: number
    email: string
    department: string
    user_id: string
    role: string
    username: string
    cellphone_code: string
    contact_number: number
    password: string
    password_confirm: string
    employee_code?: string
    company_code?: string
    second_last_name?: string
    permissions: Array<string>
    department_no: number
    operator_card: string
    user: string
}

const Schema = yup.object().shape({
    first_name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 8 caracteres')
        .max(20, 'Máximo 50 caracteres'),
    second_name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 4 caracteres')
        .max(10, 'Máximo 6 caracteres'),
    last_name: yup.string().required('Este campo es requerido'),
    sex: yup.string().required('Este campo es requerido'),
    personal_id: yup
        .number()
        .positive()
        .integer()
        .required('Este campo es requerido'),
    document_type: yup.string().required('Este campo es requerido'),
    email: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es requerido'),
    department: yup.number().required('Este campo es requerido'),
    user_id: yup
        .string()
        .required('Este campo es requerido')
        .min(4, 'Minimo 4 caracteres')
        .max(4, ' Maximo 4 caracteres'),
    role: yup.string().required('Este campo es requerido'),
    username: yup.string().required('Este campo es requerido'),
    cellphone_code: yup.string().required('Este campo es requerido'),
    contact_number: yup
        .string()
        .min(7, 'Debe tener mínimo 8 digitos')
        .max(7, 'Debe tener máximo 8 digitos')
        .required('Este campo es requerido'),
    password: yup
        .string()
        .min(4, 'Mínimo 4 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .required('Este campo es requerido'),
    password_confirm: yup
        .string()
        .required('Este campo es requerido')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})

interface PersonalAccountProps {
    userIdParam?: string
    readOnly?: boolean
}

const PersonalAccount = ({ userIdParam, readOnly }: PersonalAccountProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state: DefaultRootStateProps) => state.users)
    const roles = useSelector((state: DefaultRootStateProps)=> state.login.user.content.web_config.roles )
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [userData] = React.useState<UserProps | undefined>(
        users?.find((user) => user.id === userIdParam)
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('first_name', userData?.user_data.first_name, {
            shouldValidate: true,
        })
        setValue('second_name', userData?.second_name, {
            shouldValidate: true,
        })
        setValue('last_name', userData?.user_data.last_name, {
            shouldValidate: true,
        })
        setValue('sex', userData?.sex, {
            shouldValidate: true,
        })
        setValue('document_type', userData?.personal_id.charAt(0), {
            shouldValidate: true,
        })
        setValue('personal_id', userData?.personal_id.replace(/\D/g, ''), {
            shouldValidate: true,
        })
        setValue('email', userData?.user_data.email, {
            shouldValidate: true,
        })
        setValue('department', userData?.department_no, {
            shouldValidate: true,
        })
        setValue('user_id', userData?.employee_code, {
            shouldValidate: true,
        })
        setValue('username', userData?.user_data.username, {
            shouldValidate: true,
        })
        setValue('cellphone_code', userData?.mobile.substring(0, 4), {
            shouldValidate: true,
        })
        setValue('contact_number', userData?.mobile.slice(4), {
            shouldValidate: true,
        })
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {
            username,
            first_name,
            second_name,
            last_name,
            sex,
            personal_id,
            user_id,
            email,
            cellphone_code,
            contact_number,
            password,
            document_type,
            employee_code,
            company_code,
            second_last_name,
            department_no,
            operator_card,
            role,
        } = data

        // dispatch(console.log(getRoleUser))

        if (!editable) {
            dispatch(
                createUserRequest({
                    user: {
                        username,
                        password,
                        first_name,
                        last_name,
                        email,
                    },
                    employee: {
                        employee_code: `${user_id}`,
                        company_code,
                        second_name,
                        second_last_name,
                        sex,
                        personal_id: `${document_type}-${personal_id}`,
                        mobile: `${cellphone_code}${contact_number}`,
                        role,
                        permissions: ['view_user'],
                        description: 'soy yo',
                        department_no,
                        operator_card,
                    },
                })
            )
            navigate(`/gestion-usuarios/listar`)
        }
        if (editable) {
            dispatch(
                updateUserRequest({
                    user: {
                        username,
                        password,
                        first_name,
                        last_name,
                        email,
                    },
                    employee: {
                        id: userIdParam,
                        user: `${user_id}`,
                        employee_code,
                        company_code,
                        second_name,
                        second_last_name,
                        sex,
                        personal_id: `${document_type}-${personal_id}`,
                        mobile: `${cellphone_code}${contact_number}`,
                        role: [],
                        permissions: ['view_user'],
                        description: 'soy empleado',
                        department_no,
                        operator_card,
                    },
                })
            )
            navigate(`/gestion-usuarios/listar`)
        }
    }
    const onInvalid: SubmitErrorHandler<Inputs> = (data) => {}
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">Datos del usuario</Typography>
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
                    name="user_id"
                    control={control}
                    defaultValue={userData?.employee_code}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Id del usuario"
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.user_id}
                                helperText={errors.user_id?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="first_name"
                    control={control}
                    defaultValue={userData?.user_data.first_name}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Primer Nombre"
                                size="small"
                                autoComplete="off"
                                error={!!errors.first_name}
                                {...field}
                                helperText={errors.first_name?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="second_name"
                    control={control}
                    defaultValue={userData?.second_name}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Segundo Nombre"
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.second_name?.message}
                                helperText={errors.second_name?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="last_name"
                    control={control}
                    defaultValue={userData?.user_data.last_name}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Apellidos"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="sex"
                    control={control}
                    defaultValue={userData?.sex}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                label="Sexo"
                                fullWidth
                                size="small"
                                {...field}
                                error={!!errors.sex}
                                helperText={errors.sex?.message}
                                disabled={readOnlyState}
                            >
                                {SEX.map((option) => (
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
                    name="document_type"
                    control={control}
                    defaultValue={userData?.personal_id.charAt(0)}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                fullWidth
                                label="Tipo"
                                size="small"
                                {...field}
                                error={!!errors.document_type}
                                helperText={errors.document_type?.message}
                                disabled={readOnlyState}
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
                        </Grid>
                    )}
                />

                <Controller
                    name="personal_id"
                    control={control}
                    defaultValue={userData?.personal_id.replace(/\D/g, '')}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Documento de identidad"
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.personal_id}
                                helperText={errors.personal_id?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="cellphone_code"
                    control={control}
                    defaultValue={userData?.mobile.substring(0, 4)}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                label="04XX"
                                fullWidth
                                size="small"
                                {...field}
                                error={!!errors.cellphone_code}
                                helperText={errors.cellphone_code?.message}
                                disabled={readOnlyState}
                            >
                                {NUMBER_CODE.map((option) => (
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
                    name="contact_number"
                    control={control}
                    defaultValue={userData?.mobile.slice(4)}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            className={classes.searchControl}
                        >
                            <TextField
                                type="number"
                                fullWidth
                                label="Número de contacto"
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.contact_number}
                                helperText={errors.contact_number?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />
            </Grid>

            <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Datos de usuario en la empresa
                    </Typography>
                </Grid>

                <Controller
                    name="department"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                label="Departamento"
                                fullWidth
                                size="small"
                                {...field}
                                error={!!errors.department}
                                helperText={errors.department?.message}
                            >
                                {DEPARTMENTS.map((option) => (
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
                    name="role"
                    control={control}
                    defaultValue={userData?.role}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                select
                                fullWidth
                                label="Rol"
                                size="small"
                                {...field}
                                error={!!errors.role}
                                helperText={errors.role?.message}
                                disabled={readOnlyState}
                            >
                                {roles.map((option) => (
                                    <MenuItem
                                        key={option.role}
                                        value={option.role}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                />
            </Grid>

            <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Datos de acceso para el usuario
                    </Typography>
                </Grid>

                <Controller
                    name="username"
                    control={control}
                    defaultValue={userData?.user_data.username}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Username"
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue={userData?.user_data.email}
                    render={({ field }) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                label="Correo electrónico"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                disabled={readOnlyState}
                            />
                        </Grid>
                    )}
                />
            </Grid>

            {editable ? (
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="password"
                        control={control}
                        // defaultValue={false}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type="password"
                                    fullWidth
                                    label="Contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="password_confirm"
                        control={control}
                        // defaultValue={false}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    type="password"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Confirmar contraseña"
                                    size="small"
                                    {...field}
                                    error={!!errors.password_confirm}
                                    helperText={
                                        errors.password_confirm?.message
                                    }
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            ) : null}

            <Divider sx={{ marginTop: '70px' }} />
            <CardActions>
                <Grid container justifyContent="flex-end" spacing={0}>
                    <Grid item>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <Stack>
                                    <Button
                                        // variant="outlined"
                                        color="error"
                                        // size="large"
                                        className="mx-4"
                                        onClick={handleCancelEdit}
                                    >
                                        cancelar
                                    </Button>
                                </Stack>
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
                                        Crear usuario
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardActions>
        </form>
    )
}

export default PersonalAccount