import * as React from 'react';

// typechecking
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
// import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';

// create default theme
const defaultTheme = createTheme({});

// function component ToggleCustomTheme for the button 
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>
                    {/* <SvgMaterialDesign sx={{ fontSize: '20px', mr: 1 }} /> */}
                    Material Design
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}


//  Typechecking With PropTypes
ToggleCustomTheme.propTypes = {
    // An object taking on a particular shape
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {

    // this is the hook 
    const [mode, setMode] = React.useState('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);

    // create LPtheme
    const LPtheme = createTheme(getLPTheme(mode));


    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // function 
    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        // themeProvide, used to change the theme 
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>

            {/* kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline enableColorScheme />


            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />

            {/* bgcolor is also depend on the thenme */}
            <Box sx={{ bgcolor: 'background.default' }}>
                <LogoCollection />
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
                <Footer />
            </Box>

            {/* component to change the th */}
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}