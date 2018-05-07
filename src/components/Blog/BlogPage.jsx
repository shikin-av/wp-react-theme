import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import { fetchBlogPageContent as fetchBlogPageContentApi } from '../../api'

export default class BlogPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post: null
        }
    }

    componentWillMount(){
        try{
            return fetchBlogPageContentApi(this.props.match.params.id)
            .then(post => {
                this.setState({
                    post: post,
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    render() {
        if(!this.state.post) return <div>Загрузка...</div>
        return (
            <div className='col-md-12 col-sm-12'>
                <p>Статья</p>
                <h3>{this.state.post.title.rendered}</h3>
                <div dangerouslySetInnerHTML={{ __html : this.state.post.content.rendered }}></div>
            </div>
        )
    }
}