// material-ui
// import { Divider, Grid, Typography } from '@material-ui/core'

// project imports
// import SubCard from 'ui-component/cards/SubCard'
import Accordion from 'ui-component/extended/Accordion'
// import MainCard from 'ui-component/cards/MainCard'
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
// import { gridSpacing } from 'store/constant'

// assets
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
// import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone'
// import DomainTwoToneIcon from '@material-ui/icons/DomainTwoTone'
// import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone'

// accordion data
const basicData = [
    {
        id: 'basic1',
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        id: 'basic2',
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        id: 'basic3',
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
]

// =============================|| UI ACCORDION ||============================= //

const UIAccordion = () => <Accordion data={basicData} />

export default UIAccordion
