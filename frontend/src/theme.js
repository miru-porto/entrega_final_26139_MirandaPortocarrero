import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

// Tema global de la aplicación
const theme = createTheme({
    palette: {
        primary: {
            main: purple[600],
        },
        secondary: {
            main: green[600],
        },
        background: {
            default: '#f6f4f9',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

export default theme;
