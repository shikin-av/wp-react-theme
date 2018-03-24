import React from 'react'
import { connect } from 'react-redux'

import Grid from './Grid.jsx'
import SubCategories from './SubCategory.jsx'

//const Category = (props) => {
class Category extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categoryName: null
        }
    }

    async fetchCategoryName(category){
        try{
            return fetch('/wp-json/api/v1/categoryname/' + category)
            .then((res) => res.json())
            .then(name => {
                return name
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentDidMount(){
        const category = this.props.match.params.category
        this.fetchCategoryName(category).then(name => {
            this.setState({
                categoryName: name
            })
        })
    }

    componentDidUpdate(){
        const category = this.props.match.params.category
        this.fetchCategoryName(category).then(name => {
            if(name !== this.state.categoryName){
                this.setState({
                    categoryName: name
                })
            }
        })
    }

    render(){
        const { category, subcategory } = this.props.match.params
        return (
            <div>
                <SubCategories parentCategory={category} />
                <Grid  category={subcategory || category} categoryName={this.state.categoryName} />
            </div>
        )
    }
}
export default Category