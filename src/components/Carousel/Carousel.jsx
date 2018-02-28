import React from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

export default class Carousel extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            slides: []
        }
    }
    // https://github.com/akiran/react-slick    
    componentWillMount(){
        if(window.global.promotions){           //TODO Не показывать на мобилках
            this.setState({
                slides: window.global.promotions
            })
        }else{
            /*console.log('Carousel componentWillMount: Fetch')
            return fetch('/wp-json/wp/v2/promotions')
            .then((res) => res.json())
            .then(items => {
                this.setState({
                    slides: items
                })
            })*/
            this.setState({
                slides: []
            })
        }
    }

    render(){
        const settings = {
            dots: false,
            arrows: true,
            draggable: true,
            lazyLoad: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }        
        if(this.state.slides instanceof Array && this.state.slides.lenght !== 0){
            return (
                <Slider {...settings}>
                    {
                        this.state.slides.map(slide => (
                            <div key={slide.ID}>
                                <Link to={slide.urlTarget}>
                                    <img 
                                        src={slide.img} 
                                        alt=""
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </Slider>
            )
        }else{
            return null
        }
    }
}