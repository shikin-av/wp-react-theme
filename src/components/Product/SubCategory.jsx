import React from 'react'
import {Link} from 'react-router-dom'

import { fetchSubcategories as fetchSubcategoriesApi } from '../../api'

class SubCategories extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: [],
            prevParentCategory: null
        }
    }

    componentDidMount(){
        const { parentCategory } = this.props
        try{
            return fetchSubcategoriesApi(parentCategory)
            .then(categories => {
                this.setState({
                    categories: categories
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentDidUpdate(){
        const { parentCategory } = this.props
        if(parentCategory !== this.state.prevParentCategory){
            try{
                return fetchSubcategoriesApi(parentCategory)
                .then(categories => {
                    this.setState({
                        prevParentCategory: parentCategory,
                        categories: categories
                    })
                })
            }catch(err){
                console.log(`ERROR ${err.stack}`)
            }
        }
    }

    render(){
        const { parentCategory } = this.props
        return (
            <nav id='subcategory' className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='' id='subcategoryNav'>
                    <ul className='navbar-nav'>
                        {
                            this.state.categories.map(cat => {
                                return (
                                    <li 
                                        className='nav-item' 
                                        key={cat.term_id}
                                    >
                                        <Link className='nav-link' to={`/category/${parentCategory}/${cat.slug}`}>{cat.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}
export default SubCategories