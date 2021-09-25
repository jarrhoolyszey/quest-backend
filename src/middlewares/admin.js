module.exports = (req, res, next) => {
  if (!req.isAdmin)
    return res.status(401).send({ error: 'Acesso negado.' });
  
  return next();
}