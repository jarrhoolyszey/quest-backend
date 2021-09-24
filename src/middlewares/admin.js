module.exports = (req, res, next) => {
  if (!req.isAdmin)
    return res.status(401).send( 'Acesso negado.' );
  
  return next();
}