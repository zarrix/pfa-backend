module.exports.objSum = (obj) => {
    let sum = 0;
    for (let i in obj) {
        if( obj.hasOwnProperty( i ) ) {
            sum += parseFloat( obj[i] );
        }
    }
    return sum
}