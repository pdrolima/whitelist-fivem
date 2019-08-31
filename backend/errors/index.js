// Note perfect as should be, but it works...
// You could try to extends Error, and then
// put a better error handling. I was just too lazy to do by myself.
const handleError = (err) => {
    return {
        statusCode: 500,
        body: err.message
    }    
};

module.exports = handleError;
