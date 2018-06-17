import React from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import { fetchPromotions as fetchPromotionsApi } from '../../api'

export default class Carousel extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            slides: []
        }
    }
    componentWillMount(){
        if(window.global.promotions){           //TODO hide to mobile devices
            this.setState({
                slides: window.global.promotions
            })
        }else{
            try{
                return fetchPromotionsApi()
                .then(items => {
                    this.setState({
                        slides: items
                    })
                })
            }catch(err){
                this.setState({
                    slides: []
                })
                console.log(`ERROR ${err.stack}`)
            }
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
                        this.state.slides.map(slide => {
                            let content = jQuery.parseHTML(slide.post_content)
                            return (
                            <Link to={slide.urlTarget} key={slide.ID}>
                            <div className={'slide' + slide.ID} 
                                style={{backgroundImage: `url(${slide.img})`, backgroundSize: 'cover'}}>
                                    <img 
                                        src={slide.img}
                                    />
                                    <div className='carousel_text'>
                                        <div className='carousel_text_block' ref={(dom) => {
                                            jQuery(dom).html('')
                                            for(let el of content){
                                                if(el.nodeName != '#text'){
                                                    jQuery(dom).append(el.outerHTML)
                                                }
                                            }
                                        }}>
                                            
                                        </div>
                                    </div>
                                
                            </div>
                            </Link>
                        )
                        })
                    }
                </Slider>
            )
        }else{
            return null
        }
    }
}