export default (numberOfShapes, object, ...size) => {
    let arr = [];
    let minNumOfSides = 3;
    for (let i = minNumOfSides; i < (numberOfShapes + minNumOfSides); i++)
        arr.push(object(i, size));
    return arr;
}