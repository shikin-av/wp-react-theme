import React from 'react'

import Carousel from './Carousel/Carousel.jsx'
import Grid from './Product/Grid.jsx'

const Home = () => (
    <div>
        <Carousel />
        <Grid category="popular" categoryName="Популярные" />
    </div>
)
export default Home