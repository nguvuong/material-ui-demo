import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

// style
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


// hide on scroll
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';


const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    // multiplied by 10 for more rounded 
    borderRadius: theme.shape.borderRadius*10,
    // fade was renamed to alpha to better describe its functionality.
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

// i added hide on scroll behavior 
function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };


function AppAppBar({ mode, toggleColorMode, props }) {
    // boolean for the drawer 
  const [open, setOpen] = React.useState(false);

    // toggleDrawer take boolean params
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    //   scrollToSection function 
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    //  i changed the offset from 128 to 0
    const offset = 0;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  
  return (
    <div>
      <HideOnScroll {...props}>
            {/* done app bar  */}
            <AppBar
            position="fixed"
            sx={{
            boxShadow: 0,
            // color
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
            }}
        >
            <Container maxWidth="lg">
                {/*  toolbar for what? */}
            <Toolbar
                // ??? for the font
                variant="regular"

                // theme? 
                sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                // BORDER
                borderRadius: '999px',
                bgcolor:
                    theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 40,
                border: '1px solid',
                borderColor: 'divider',
                // boxShadow?
                boxShadow:
                    theme.palette.mode === 'light'
                    ? `6px 6px 17px -3px #1255FF, -6px -6px 17px -3px #FF00F3;`
                    : '2px 2px 27px 1px rgba(97,179,255,0.5)',
                })}
            >

                {/* responsive for large devices  */}
                <Box

                // logo exists in any devices
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',

                    // hmmmm
                    ml: '-18px',
                    px: 0,
                }}
                >
                    {/* logo */}
                <img
                    src={
                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                    }
                    style={logoStyle}
                    alt="logo of sitemark"
                />
                {/* sx: responsive  */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    {/* features */}
                    <MenuItem
                    onClick={() => scrollToSection('features')}
                    sx={{ py: '6px', px: '12px' }}
                    >
                    <Typography variant="body2" color="text.primary">
                        Features
                    </Typography>
                    </MenuItem>

                    {/* Testimonials */}
                    <MenuItem
                    onClick={() => scrollToSection('testimonials')}
                    sx={{ py: '6px', px: '12px' }}
                    >
                    <Typography variant="body2" color="text.primary">
                        Testimonials
                    </Typography>
                    </MenuItem>

                    {/* Highlights */}
                    <MenuItem
                    onClick={() => scrollToSection('highlights')}
                    sx={{ py: '6px', px: '12px' }}
                    >
                    <Typography variant="body2" color="text.primary">
                        Highlights
                    </Typography>
                    </MenuItem>

                    {/* Pricing */}
                    <MenuItem
                    onClick={() => scrollToSection('pricing')}
                    sx={{ py: '6px', px: '12px' }}
                    >
                    <Typography variant="body2" color="text.primary">
                        Pricing
                    </Typography>
                    </MenuItem>

                    {/* FAQ */}
                    <MenuItem
                    onClick={() => scrollToSection('faq')}
                    sx={{ py: '6px', px: '12px' }}
                    >
                    <Typography variant="body2" color="text.primary">
                        FAQ
                    </Typography>
                    </MenuItem>
                </Box>
                </Box>
                
                <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                }}
                >

                    {/* dark and light mode  */}

                    <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-in/"
                    target="_blank"
                >
                    Sign in
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-up/"
                    target="_blank"
                >
                    Sign up
                </Button>
              
                </Box>

                {/* responsive for sm and md devices */}
                <Box sx={{ display: { sm: '', md: 'none' } }}>
                <Button
                    variant="text"
                    color="primary"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ minWidth: '30px', p: '4px' }}
                >
                    <MenuIcon />
                </Button>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>

                    {/* box */}
                    <Box
                    sx={{
                        minWidth: '60dvw',
                        p: 2,
                        backgroundColor: 'background.paper',
                        flexGrow: 1,
                    }}
                    >
                    <Box
                        sx={{
                        display: 'flex',
                        // columns 
                        flexDirection: 'column',
                        alignItems: 'end',
                        flexGrow: 1,
                        }}
                    >
                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                    </Box>
                    <MenuItem onClick={() => scrollToSection('features')}>
                        Features
                    </MenuItem>
                    <MenuItem onClick={() => scrollToSection('testimonials')}>
                        Testimonials
                    </MenuItem>
                    <MenuItem onClick={() => scrollToSection('highlights')}>
                        Highlights
                    </MenuItem>
                    <MenuItem onClick={() => scrollToSection('pricing')}>
                        Pricing
                    </MenuItem>
                    <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                    <Divider />
                    <MenuItem>
                        <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-up/"
                        target="_blank"
                        sx={{ width: '100%' }}
                        >
                        Sign up
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button
                        color="primary"
                        variant="outlined"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-in/"
                        target="_blank"
                        sx={{ width: '100%' }}
                        >
                        Sign in
                        </Button>
                    </MenuItem>

                    </Box>
                </Drawer>
                </Box>
                
            </Toolbar>
            </Container>
            </AppBar>
            </HideOnScroll>
  
    </div>
  );
}

// type checking
AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;