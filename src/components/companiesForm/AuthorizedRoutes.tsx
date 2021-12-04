import React from 'react'

// Redux
import {  useSelector } from 'react-redux'
import { DefaultRootStateProps, TAuthorizedRoutes } from 'types'

// material-ui
// import { makeStyles } from '@material-ui/styles'
import {
    // Grid,
    // Button,
    // TextField,
    // Theme,
    // Typography,
    // FormControlLabel,
    // Checkbox,
    // CardActions,
    // Divider,
    // MenuItem,
    // FormHelperText,
    // Switch,
} from '@material-ui/core'
// import { gridSpacing } from 'store/constant'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import { useState } from 'react';


// CONSTANTS

// style constant
// const useStyles = makeStyles((theme: Theme) => ({
//     alertIcon: {
//         height: '16px',
//         width: '16px',
//         marginRight: '5px',
//         verticalAlign: 'text-bottom',
//         marginTop: '15px',
//         marginLeft: '-15px',
//     },
//     userAvatar: {
//         height: '80px',
//         width: '80px',
//     },
//     searchControl: {
//         width: '100%',
//         paddingRight: '16px',
//         paddingLeft: '16px',
//         '& input': {
//             background: 'transparent !important',
//             paddingLeft: '5px !important',
//         },
//         '& .Mui-focused input': {
//             boxShadow: 'none',
//         },
//         [theme.breakpoints.down('lg')]: {
//             width: '250px',
//         },
//         [theme.breakpoints.down('md')]: {
//             width: '100%',
//             marginLeft: '4px',
//             background:
//                 theme.palette.mode === 'dark'
//                     ? theme.palette.dark[800]
//                     : '#fff',
//         },
//     },
//     ButtonControl: {
//         width: '50%',
//         '& input': {
//             color: ' transparent !important',
//             marginLeft: '5px',
//         },
//         [theme.breakpoints.down('md')]: {
//             background:
//                 theme.palette.mode === 'dark'
//                     ? theme.palette.dark[800]
//                     : '#ffff',
//         },
//     },
//     borderDebug: {
//         border: '1px solid red',
//     },
//     input: {
//         opacity: 0,
//         position: 'absolute',
//         zIndex: 1,
//         padding: 0.5,
//         cursor: 'pointer',
//         width: '30%',
//     },
// }))



// function createData(name, calories, fat, carbs) {
//     return { name, calories, fat, carbs  };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24),
//     createData('Ice cream sandwich', 237, 9.0, 37),
//     createData('Eclair', 262, 16.0, 24),
//     createData('Cupcake', 305, 3.7, 67),
//     createData('Gingerbread', 356, 16.0, 49),
//   ];
  


const AuthorizedRoutes = () => {

    
    
    const data = useSelector(
        ( state: DefaultRootStateProps ) => state.authorizedRoutes
    )
    const [ rowsInitial, setRowsInitial] = React.useState<Array<any>>([])
    const [ rows, setRows] = React.useState<Array<TAuthorizedRoutes>>(data)

    // const dispatch = useDispatch()

    React.useEffect(()=> {



    },[])

    React.useEffect(()=>{

        console.log('rowsInitial', rowsInitial)
        const row = rowsInitial.map(({
            stop_code,
            trans_means,
            name,
            abbreviation,
            route,
            location: {
                type,
                state,
                municipality,
            },
        })=>({
            stop_code,
            trans_means,
            name,
            abbreviation,
            route,
            location: {
                type,
                state,
                municipality,
            },
        }))
        console.log(row)
        setRowsInitial(row)
        setRows(row)
        console.log(rows)

    }, [])

    return (
        <>
        <div>
            {rowsInitial.map((row) => (
                <>
                    <h2 >{row.name}</h2>
                    <h2>{row.abbreviation}</h2>
                    <h2 >{row.route}</h2>
                    <h2 >{row.location.state}</h2>
                </>
            ))}

         </div>
        {/*<Grid item xs={12}>
         <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
            <TableContainer sx={{marginLeft: '10px',  border: 'none'}} component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell> name </TableCell>
                            <TableCell> abbreviation </TableCell>
                            <TableCell> route </TableCell>
                            <TableCell> Estado </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsInitial.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{row.name}</TableCell>
                                <TableCell>{row.abbreviation}</TableCell>
                                <TableCell >{row.route}</TableCell>
                                <TableCell >{row.location.state}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </Grid> */}
        </>
    )
}
export default AuthorizedRoutes
