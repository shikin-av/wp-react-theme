import React from 'react'
import {Link} from 'react-router-dom'

class SubCategories extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: [],
            prevParentCategory: null
        }
    }

    async fetchCategories(parentCategory){
        try{
            return fetch('/wp-json/api/v1/subcategories/' + parentCategory)
            .then((res) => res.json())
            .then(items => {
                return items
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentDidMount(){
        const { parentCategory } = this.props
        this.fetchCategories(parentCategory).then(categories => {
            this.setState({
                categories: categories
            })
        })
    }

    componentDidUpdate(){
        const { parentCategory } = this.props
        if(parentCategory !== this.state.prevParentCategory){
            this.fetchCategories(parentCategory).then(categories => {
                this.setState({
                    prevParentCategory: parentCategory,
                    categories: categories
                })
            })
        }
    }

    render(){
        const { parentCategory } = this.props
        return (
            <nav id='subcategory' className='navbar navbar-expand-lg navbar-light bg-light'>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#subcategoryNav' 
                    aria-controls='subcategoryNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='subcategoryNav'>
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