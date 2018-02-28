import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

import BlogPage from './BlogPage.jsx'

const Blog = () => (
    <Switch>
        <Route exact path='/bloglist' component={BlogList} />
        <Route path='/bloglist/:id' component={BlogPage} />
    </Switch>
)
export default Blog


class BlogList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }
    
    componentWillMount(){
        return fetch('/wp-json/wp/v2/posts')    //TODO  try/catch
        .then((res) => res.json())
        .then(posts => {
            this.setState({
                posts: posts,
            })
        })
    }
    
    render(){
        return (
            <div className='col-md-12 col-sm-12'>
                <ul>
                    {
                        this.state.posts.map(post =>(
                            <li key={post.id}>
                                <Link to={`/bloglist/${post.id}`}>
                                    {post.title.rendered}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
