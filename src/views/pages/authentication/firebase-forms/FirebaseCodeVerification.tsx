import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Grid, TextField, Theme } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    loginInput: {
        ...theme.typography.customInput,
        '& > div > input': {
            padding: '16px !important',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                padding: '12px !important'
            }
        }
    }
}));

// =======================|| FIREBASE - CODE VERIFICATION ||======================= //

const FirebaseCodeVerification = () => {
    const classes = useStyles();

    const [code, setCode] = React.useState({
        code1: '',
        code2: '',
        code3: '',
        code4: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, name: string) => {
        const re = /^[0-9\b]+$/;
        if (event.target?.value.length < 2 && (event.target?.value === '' || re.test(event.target?.value))) {
            setCode({ ...code, [name]: event.target?.value });
        }
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname1"
                        type="text"
                        value={code.code1}
                        className={classes.loginInput}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code1')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname2"
                        type="text"
                        value={code.code2}
                        className={classes.loginInput}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code2')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname3"
                        type="text"
                        value={code.code3}
                        className={classes.loginInput}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code3')}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="fname4"
                        type="text"
                        value={code.code4}
                        className={classes.loginInput}
                        placeholder="9"
                        onChange={(e) => handleChange(e, 'code4')}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                        Continue
                    </Button>
                </AnimateButton>
            </Box>
        </>
    );
};

export default FirebaseCodeVerification;
