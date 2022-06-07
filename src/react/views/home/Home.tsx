import {
  Box, Grid, ThemeProvider, Divider, List, ListItem, ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import {
  FaCheck, FaMailBulk, FaPhoneAlt, SiFacebook, SiGithub, SiLinkedin,
} from 'react-icons/all';
import ReactPlayer from 'react-player';

import { empreinttTheme, EmpreinttThemeType } from 'react/ui/branding/theme';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    flexGrow: 1,
    lineHeight: '1.3',
  },
  video: {
    width: '100%',
    margin: 'auto',
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6be0f',
    // height: '15vh',
    padding: '3%',
    textAlign: 'center',
    clipPath: 'polygon(0 0, 100% 0%, 100% 82%, 66% 83%, 50% 100%, 32% 82%, 0 81%)',
    color: empreinttTheme.palette.common.white,
    fontSize: 30,
  },
  offres: {
    padding: '80px 10%',
    // border: '1px solid black',
  },
  offre: {
    margin: '45px auto',
  },
  titre1: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '50px',
  },
  titre2: {
    marginBottom: '10px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  text1: {
    width: '70%',
    fontSize: '20px',

  },
  agences: {
    padding: '60px 10%',
    backgroundColor: '#192643',
  },
  agence: {
    margin: '45px auto',
  },
  ul: {
    listStyle: 'none',
  },
  testimonials: {
    padding: '60px 10%',
    backgroundColor: '#f6be0f',
  },
  testimoni: {
    backgroundColor: '#ffffff',
    padding: '10%',
    border: '1px solid #fff',
    borderRadius: '8px',
    color: '#000',
    textAlign: 'center',
    fontSize: '20px',
  },
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '30px 10%',
    backgroundColor: '#192643',
    color: '#fff',
    fontSize: '20px',
    textAlign: 'center',
  },
  socials: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
    maxWidth: 200,
    margin: '10px auto',
    cursor: 'pointer',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={empreinttTheme}>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.video} color="primary">
              <ReactPlayer url="https://www.youtube.com/watch?v=Xoz31I1FuiY" width="100%" height="80vh" />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.banner}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit cimus ipsum ut aperiam!
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.offres}>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} lg={4}>
            <Box className={classes.offre}>
              <div className={classes.titre2}>Lorem aperiam</div>
              <div className={classes.text1}>
                quasi vero aut ab accusamus officiis incidunt sed obcaecati adipisci perferendis consequatur.
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container className={classes.agences}>
          <Grid item xs={12}>
            <Box className={classes.titre1}>Lorem Ipsumadtum dolor</Box>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.titre2} color="#f6be0f">Lorem Ipsumadtum dolor</Box>
              <Divider />
              <Box className="" color="#fff">
                <List component="nav" className={classes.root} aria-label="contacts">
                  <ListItem button>
                    <ListItemIcon>
                      <FaPhoneAlt style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="03 20 74 76 53" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaMailBulk style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="agence@empreintt.fr" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaCheck style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Du lundi au vendredi" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.titre2} color="#f6be0f">Lorem Ipsumadtum dolor</Box>
              <Divider />
              <Box className="" color="#fff">
                <List component="nav" className={classes.root} aria-label="contacts">
                  <ListItem button>
                    <ListItemIcon>
                      <FaPhoneAlt style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="03 20 74 76 53" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaMailBulk style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="agence@empreintt.fr" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaCheck style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Du lundi au vendredi" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.titre2} color="#f6be0f">Lorem Ipsumadtum dolor</Box>
              <Divider />
              <Box className="" color="#fff">
                <List component="nav" className={classes.root} aria-label="contacts">
                  <ListItem button>
                    <ListItemIcon>
                      <FaPhoneAlt style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="03 20 74 76 53" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaMailBulk style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="agence@empreintt.fr" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <FaCheck style={{ color: `${empreinttTheme.palette.common}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Du lundi au vendredi" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.testimonials}>
          <Grid item xs={12}>
            <Box className={classes.titre1}>Ils nous ont fait confiance</Box>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.testimoni} color="#fff">
                <Box>
                  « Agence très professionnelle et surtout très réactive.
                  Je recommande à tout le monde de contacter Empreintt pour vos besoins. Je l'ai fait et je n'ai pas été déçu. »
                </Box>
                <Box className={classes.titre2} color="#000">Julien R</Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.testimoni} color="#fff">
                <Box>
                  « Agence très professionnelle et surtout très réactive.
                  Je recommande à tout le monde de contacter Empreintt pour vos besoins. Je l'ai fait et je n'ai pas été déçu. »
                </Box>
                <Box className={classes.titre2} color="#000">Julien R</Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={3} className={classes.agence}>
              <Box className={classes.testimoni} color="#fff">
                <Box>
                  « Agence très professionnelle et surtout très réactive.
                  Je recommande à tout le monde de contacter Empreintt pour vos besoins. Je l'ai fait et je n'ai pas été déçu. »
                </Box>
                <Box className={classes.titre2} color="#000">Julien R</Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.footer}>
          <Box margin="10px auto">© 2022 Empreintt. All rights reserved.</Box>
          <Box margin="10px auto">18 visitors yet.</Box>
          <Box width="100%" margin="15px auto">
            <Divider />
          </Box>
          <Box className={classes.socials}>
            <SiGithub size={30} />
            <SiLinkedin size={30} />
            <SiFacebook size={30} />
          </Box>
        </Grid>
      </ThemeProvider>
    </div>
  );
};
// ReactDOM.render(<Home />, document.getElementById('root'));

export default memo(Home);
