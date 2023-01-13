import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import AlbumIcon from "@mui/icons-material/Album";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import albumImg from "../img/gg.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ABC-Entertainments
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LandingPage() {
  const [Albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/AlbumManager');
  } 

  //Get All Albums
  const GetAllAlbums = async () => {
    await axios
      .get("http://localhost:8080/api/v1/album/")
      .then((res) => {
        if (res.data.success) {
          const allAlbums = res.data.albums;
          setAlbums(allAlbums);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    GetAllAlbums();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{background:"#28282B"}}>
        <Toolbar>
          <AlbumIcon sx={{ mr: 3 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ABC Entertainments
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Music Albums
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              To remake our greatest albums list, we tabulated Top 50 Albums
              lists from more than 300 artists, producers, critics,
              music-industry figures.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                onClick={handleClick}
                style={{
                  background: "black",
                  color: "white",
                  fontSize: "15px",
                  backdropFilter: ` blur(20px)`,
                  borderRadius: "15px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                variant="contained"
              >
                Manage Albums
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Albums.map((Album) => (
              <Grid item key={Album._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  style={{
                    background: "hsla(0, 0%, 100%, 0.8)",
                    backdropFilter: ` blur(20px)`,
                    borderRadius: "15px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "0%",
                    }}
                    image={albumImg}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <center>{Album.title}</center>
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Artist</span> -{" "}
                      {Album.artist}
                      <br />
                      <span style={{ fontWeight: "bold" }}>Genre</span> -{" "}
                      {Album.genre}
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        Release Date
                      </span> - {Album.releaseDate}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          ABC Entertainments
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          All right reserved
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
