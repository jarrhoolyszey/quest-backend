const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader)
    return res.status(401).send( 'No token provided' );

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send( 'Token error.' );
  
  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send( 'Token malformatted' );

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send( 'Token invalid.' );

    req.id = decoded.id;
    req.isAdmin = decoded.isAdmin;
    
    return next();
  });
}