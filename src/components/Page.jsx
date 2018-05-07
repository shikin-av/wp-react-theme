import React from 'react'

import { fetchPageContent as fetchPageContentApi } from '../api'

export default class Page extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: null,
            content: null,
            prevPageSlug: null,
            //slug: null
        }
    }

    componentDidMount(){
        const { page } = this.props.match.params
        try{
            return fetchPageContentApi(page)
            .then(data => {
                this.setState({
                    title: data.post_title,
                    content: data.post_content,
                    prevPageSlug: data.post_name
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }
    componentDidUpdate(){
        const { page } = this.props.match.params
        try{
            return fetchPageContentApi(page)
            .then(data => {
                if(this.state.prevPageSlug !== data.post_name){
                    this.setState({
                        title: data.post_title,
                        content: data.post_content,
                        prevPageSlug: data.post_name
                    })
                }
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    render(){
        const { page } = this.props.match.params
        if(this.state.content){
            let content = jQuery.parseHTML(this.state.content)
            //console.log('this.state.content', content)
            return (
                <div className='container'>
                    <div className='row title'>
                        <h1>{this.state.title}</h1>
                    </div>
                    <div className='row'>
                        <div className="content" ref={(dom) => {
                            jQuery(dom).html('')
                            if(content){
                                for(let el of content){
                                    //console.log('el = ', el)
                                    //console.log('el.nodeName = ', el.nodeName)
                                    //console.log('--------------------------')
                                    if(el.nodeName == '#text'){
                                        jQuery(dom).append(`<span>${el.data}</span><br>`)
                                    }else{
                                        jQuery(dom).append(`${el.outerHTML}<br>`)
                                    }
                                }
                            }
                        }}>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(<div></div>)
        }
    }
}