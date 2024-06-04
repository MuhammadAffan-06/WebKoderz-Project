import Navbar from "../Components/Navbar";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Bilawal from './bilawal.jpg'
import Saad from "./saad-hussain-rizvi.jpg"
import Shahbaz from './Shahbaz_Sharif.jpg'
import Khalid from './khalid-maqbool-siddiquie.jpg'
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Box sx={{
                marginTop: 20,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 20,
                '@media (max-width: 600px)': {
                    flexDirection: "column",
                    alignItems: "center",
                }
            }}>

                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        sx={{ height: 400 }}
                        image={Bilawal}
                        title="Bilawal"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Bilawal
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Bilawal Bhutto Zardari, the dynamic Chairman of the Pakistan Peoples Party (PPP), embodies a new
                            generation of leadership in Pakistani politics. With a vision for a progressive, inclusive Pakistan,
                            he champions democratic values, social justice, and economic empowerment. His dedication to serving
                            the people and advancing the nation's interests resonates across diverse communities, inspiring hope
                            for a brighter future.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small">See Portfolio</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        sx={{ height: 400 }}
                        image={Saad}
                        title="Saad Hussain Rizvi"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Saad Hussain Rizvi
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Saad Hussain Rizvi, as the chairman of the Tehreek-e-Labbaik Pakistan (TLP), embodies the fervor and
                            dedication of his followers. With a passionate commitment to upholding the sanctity of Islam and
                            defending the rights of the Muslim community, Rizvi has emerged as a prominent figure in Pakistan's
                            political landscape. Known for his fiery rhetoric and unwavering stance on issues concerning
                            blasphemy laws and the honor of the Prophet Muhammad, Rizvi continues to shape the discourse on
                            religious matters in the country
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small">See Portfolio</Button>
                    </CardActions>
                </Card>
            </Box>
            <Box sx={{
                marginTop: 20,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 20,
                '@media (max-width: 600px)': {
                    flexDirection: "column",
                    alignItems: "center",
                }
            }}>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        sx={{ height: 400 }}
                        image={Shahbaz}
                        title="Shahbaz Sharif"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Shahbaz Sharif
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Shahbaz Sharif, a seasoned Pakistani politician and leader of the Pakistan Muslim League-Nawaz
                            (PML-N), is renowned for his pragmatic approach to governance and development. As a former Chief
                            Minister of Punjab, Sharif spearheaded numerous initiatives aimed at improving infrastructure,
                            healthcare, and education in the province. With a focus on efficiency and progress, he has played a
                            pivotal role in shaping Punjab's socioeconomic landscape. Sharif's leadership continues to command
                            respect and influence in Pakistan's political arena.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small">See Portfolio</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        sx={{ height: 400 }}
                        image={Khalid}
                        title="Khalid"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Khalid Maqbool Siddiqui
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Khalid Maqbool Siddiqui, a prominent figure in Pakistani politics, is the leader of the Muttahida
                            Qaumi Movement-Pakistan (MQM-P). Known for his dedication to addressing urban issues and advocating
                            for the rights of Karachi's residents, Siddiqui has played a significant role in shaping the city's
                            political landscape. With a background in engineering and a commitment to public service, he
                            continues to be a key voice for the urban populace in Pakistan's political discourse.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small">See Portfolio</Button>
                    </CardActions>
                </Card>
            </Box >

        </>

    );
}

export default Portfolio