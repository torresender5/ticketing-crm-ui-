import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    CardContent,
    Grid,
    Tab,
    Tabs,
    Theme,
    Typography,
} from '@material-ui/core'

// project imports
import PersonalAccount from './PersonalAccount'
import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone'
import { DefaultRootStateProps } from 'types'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none',
        },
        '& button': {
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[50],
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px',
        },
        '& button > div > span': {
            display: 'block',
        },
        '& > div > span': {
            display: 'none',
        },
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%',
    },
}))

// tabs
function TabPanel(props: {
    children: React.ReactElement
    value: number
    index: number
}) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// tabs option
const tabsOption = [
    {
        label: 'Creación de usuarios',
        icon: <PersonOutlineTwoToneIcon />,
        caption: 'datos para crear un usuario',
    },
    // {
    //     label: 'Usuarios',
    //     icon: <DescriptionTwoToneIcon />,
    //     caption: 'datos de usuarios asociados a la empresa'
    // },
    // {
    //     label: 'Representante legal',
    //     icon:<VpnKeyTwoToneIcon /> ,
    //     caption: 'datos del representante legal'
    // },
    // {
    //     label: 'Datos bancarios',
    //     icon: <CreditCardTwoToneIcon />,
    //     caption: 'datos bancarios de la empresa'
    // }
]

// ==============================|| USER PROFILE ||============================== //

interface UserProfileProps {
    userIdParam?: string
    readOnly?: boolean
}

const UserProfile = ({ userIdParam, readOnly }: UserProfileProps) => {
    const classes = useStyles()
    const customization = useSelector(
        (state: DefaultRootStateProps) => state.customization
    )
    const [value, setValue] = React.useState<number>(0)

    const handleChange = (event: React.SyntheticEvent) => {
        setValue(0)
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard sx={{ padding: '15px' }} content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    className={classes.profileTab}
                                    variant="scrollable"
                                    sx={{
                                        '& button': {
                                            borderRadius: `${customization.borderRadius}px`,
                                        },
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="inherit"
                                                    >
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography
                                                        component="div"
                                                        variant="caption"
                                                        sx={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent className={classes.cardPanels}>
                                <TabPanel value={value} index={0}>
                                    <PersonalAccount
                                        userIdParam={userIdParam}
                                        readOnly={readOnly}
                                    />
                                </TabPanel>
                                {/* <TabPanel value={value} index={1}>
                                    <UserProfile />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Payment />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <ChangePassword />
                                </TabPanel> */}
                            </CardContent>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    )
}

export default UserProfile
