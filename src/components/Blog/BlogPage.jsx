import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

export default class BlogPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post: null
        }
    }

    componentWillMount(){        
        return fetch('/wp-json/wp/v2/posts/' + this.props.match.params.id)
        .then((res) => res.json())
        .then(post => {
            this.setState({
                post: post,
            })
        })
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