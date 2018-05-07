import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

import BlogPage from './BlogPage.jsx'
import { fetchBlogPosts as fetchBlogPostsApi } from '../../api'

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
        try{
            return fetchBlogPostsApi()
            .then(posts => {
                this.setState({
                    posts: posts,
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
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
