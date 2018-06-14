import React from 'react'
import { connect } from 'react-redux'

import Grid from './Grid.jsx'
import SubCategories from './SubCategory.jsx'
import { fetchCategoryName as fetchCategoryNameApi } from '../../api'

class Category extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categoryName: '',
            subcategoryName: ''
        }
    }

    componentDidMount(){
        const { category, subcategory } = this.props.match.params
        try{
            return fetchCategoryNameApi(category)
            .then(name => {
                this.setState({
                    categoryName: name
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
        
        if(subcategory){
            return fetchCategoryNameApi(subcategory)
            .then(name => {
                this.setState({
                    subcategoryName: name
                })
            })
        }
    }

    componentDidUpdate(){
        const { category, subcategory } = this.props.match.params

        try{
            return fetchCategoryNameApi(category)
            .then(name => {
                if(name !== this.state.categoryName){
                    this.setState({
                        categoryName: name
                    })
                }
                if(subcategory){
                    return fetchCategoryNameApi(subcategory)
                    .then(name => {
                        if(name !== this.state.subcategoryName){
                            this.setState({
                                subcategoryName: name
                            })
                        }
                    })
                }else{
                    this.state.subcategoryName = ''
                }
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
        
        
    }

    render(){
        const { category, subcategory } = this.props.match.params
        return (
            <div>
                <SubCategories parentCategory={category} />
                <Grid  category={subcategory || category} categoryName={
                    subcategory && this.state.subcategoryName ? `${this.state.categoryName} ${this.state.subcategoryName}` : `${this.state.categoryName}`
                }/>
            </div>
        )
    }
}
export default Category