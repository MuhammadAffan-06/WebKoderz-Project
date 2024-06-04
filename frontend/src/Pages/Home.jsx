import React from 'react';
import Navbar from '../Components/Navbar';
import Chess from './chess.jpeg';
import Hero from './hero-image.jpg'

const Home = () => {
    return (
        <>
            <Navbar />
            <section style={{ textAlign: 'center', padding: '14px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <div style={{ marginTop: '20px' }}>
                        <img src={Chess} alt="image not loaded yet" style={{ borderRadius: '16px', width: '100%', maxWidth: '500px', display: 'block', margin: 'auto' }} />
                    </div>
                    <div style={{ fontFamily: 'Inter Tight', textAlign: 'center', margin: 'auto' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Unleash the Drama</h1>
                        <p style={{ marginTop: '20px', fontSize: '1rem' }}>Step into the world of political intrigue and scandal with our exclusive leader profiles.</p>
                        <p style={{ marginTop: '20px', fontSize: '1rem' }}>From cunning strategies to unexpected scandals, these leaders will keep you on the edge of your seat.</p>
                        <p style={{ marginTop: '20px', fontSize: '1rem' }}>Get ready to be amazed, shocked, and entertained by the larger-than-life personalities of our featured politicians.</p>
                    </div>
                </div>
            </section>
            <section style={{ padding: '20px', marginTop: '50px', fontFamily: 'system-ui' }}>
                <div style={{ margin: '10px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <img src={Hero} alt="no picture" style={{ borderRadius: '16px', width: '100%', maxWidth: '500px', display: 'block', margin: 'auto' }} />
                    </div>
                    <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center' }}>
                        <h1>Who are we?</h1>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '1rem', textAlign: 'center' }}>
                        <p>We are the ultimate hub for all things political, where power meets personality.</p>
                        <p>Get ready to dive into the intriguing lives of the world's most influential leaders.</p>
                        <p>Join us on a rollercoaster ride through the highs and lows of political fame.</p>
                    </div>
                </div>
            </section>



        </>
    );
}

export default Home;
