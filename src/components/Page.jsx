import React from 'react'

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

    async fetchPageContent(page){
        try{
            return fetch('/wp-json/api/v1/page/' + page)
            .then((res) => res.json())
            .then(items => {
                return items
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentDidMount(){
        const { page } = this.props.match.params
        this.fetchPageContent(page).then(data => {
            this.setState({
                title: data.post_title,
                content: data.post_content,
                prevPageSlug: data.post_name
            })
        })
    }
    componentDidUpdate(){
        const { page } = this.props.match.params
        this.fetchPageContent(page).then(data => {
            if(this.state.prevPageSlug !== data.post_name){
                this.setState({
                    title: data.post_title,
                    content: data.post_content,
                    prevPageSlug: data.post_name
                })
            }
        })
    }

    render(){
        const { page } = this.props.match.params
        if(this.state.content){
            let content = jQuery.parseHTML(this.state.content)
            console.log('this.state.content', content)
            return (
                <div className='container'>
                    <div className='row'>
                        <h1>{this.state.title}</h1>
                    </div>
                    <div className='row title'>
                        <div className="content" ref={(dom) => {
                            jQuery(dom).html('')
                            for(let el of content){
                                if(el.nodeName != '#text'){
                                    jQuery(dom).append(el.outerHTML)
                                    jQuery(dom).append('<br>')
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