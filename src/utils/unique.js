function unique(arr){
    let obj = {}
    for(item in arr){
        obj[arr[item]] = true
    }
    return Object.keys(obj)
}

export default unique