import React from 'react'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Box, Tab, Tabs, Typography, Theme } from '@material-ui/core'

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone'
// import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone'
// import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone'
// import TableChartIcon from '@material-ui/icons/TableChart'

// import UIAccordion from './UIAccordion'
import Accordion from 'ui-component/extended/Accordion'
import SubCard from 'ui-component/cards/SubCard'

// tab content
function TabPanel(props: {
    children: React.ReactElement | string
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
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    accountTab: {
        marginBottom: '10px',
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main,
        },
        '& a > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
        },
    },
    badgeSecondary: {
        color: theme.palette.secondary.main,
        background: theme.palette.secondary.light,
        marginLeft: '10px',
    },
}))

const basicData = [
    {
        id: 'basic1',
        title: 'Zona #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        id: 'basic2',
        title: 'Zona #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        id: 'basic3',
        title: 'Zona #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
]
const basicData2 = [
    {
        id: 'basic1',
        title: 'Zona #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        id: 'basic2',
        title: 'Zona #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
]

// ================================|| UI TABS - SAMPLE ||================================ //

export default function SimpleTabs() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                className={classes.accountTab}
            >
                <Tab
                    component={Link}
                    to="#"
                    icon={
                        <PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    }
                    label="Ida"
                    {...a11yProps(0)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={
                        <RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    }
                    label="Vuelta"
                    {...a11yProps(1)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <SubCard title="Zonas">
                    <Accordion data={basicData} />
                </SubCard>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SubCard title="Zonas">
                    <Accordion data={basicData2} />
                </SubCard>
            </TabPanel>
            {/* <Fab
                color="primary"
                className="absolute top-4 right-4 z-10"
                // onClick={returnButtonAction}
                // disabled={!readOnly}
            >
                <TableChartIcon />
            </Fab> */}
        </>
    )
}
