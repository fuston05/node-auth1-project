module.exports= (req, res, next) => {
  if( req.session && req.session.user ){
    next();
  }else{
    res.status(401).json({Error: "You do not have access to this data, please log in"});
  }
};