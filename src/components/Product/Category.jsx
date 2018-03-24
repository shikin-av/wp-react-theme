import React from 'react'
import { connect } from 'react-redux'

import Grid from './Grid.jsx'
import SubCategories from './SubCategory.jsx'

//const Category = (props) => {
class Category extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categoryName: '',
            subcategoryName: ''
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
        const { category, subcategory } = this.props.match.params
        this.fetchCategoryName(category).then(name => {
            this.setState({
                categoryName: name
            })
        })
        if(subcategory){
            this.fetchCategoryName(subcategory).then(name => {
                this.setState({
                    subcategoryName: name
                })
            })
        }
    }

    componentDidUpdate(){
        const { category, subcategory } = this.props.match.params
        this.fetchCategoryName(category).then(name => {
            if(name !== this.state.categoryName){
                this.setState({
                    categoryName: name
                })
            }
            if(subcategory){
                this.fetchCategoryName(subcategory).then(name => {
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
        
    }

    render(){
        const { category, subcategory } = this.props.match.params

        /*console.log('fetch name: ', name, ' | this.state.categoryName: ', this.state.categoryName)
        console.log('this.state.subcategoryName: ', this.state.subcategoryName)
        console.log('category: ', category, ' | ', 'subcategory: ', subcategory)*/

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