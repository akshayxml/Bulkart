// 404 (Page not found) error creator
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
  }
  
/*
error handling middleware:
this code will be fired off only when error object exists in the app.
err- catches errors thrown from anyware in our server or errors from the
*/
const errorHandler = (err, req, res, next) => {
    //sometimes even errors could have a statuscode of 200 so we need to change them to the 500 server error relm
    //if it's not 200 it will have it's original status code.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}
  
  export { notFound, errorHandler }