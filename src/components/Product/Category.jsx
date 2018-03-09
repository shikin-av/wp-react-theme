import React from 'react'
import { connect } from 'react-redux'

import Grid from './Grid.jsx'

const Category = (props) => {
    const category = props.match.params.category
    if(!category){
        return <div>TODO</div>
    }
    return (
        <div>
            <Grid  category={category} count="8" />
        </div>
    )
}
export default Category