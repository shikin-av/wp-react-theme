import React from 'react'
import { connect } from 'react-redux'

import Grid from './Grid.jsx'
import SubCategory from './SubCategory.jsx'

const Category = (props) => {
    const category = props.match.params.category
    if(!category){
        return <div>TODO</div>
    }
    return (
        <div>
            <SubCategory />
            <Grid  category={category} count='8' categoryName='Название категории' />
        </div>
    )
}
export default Category