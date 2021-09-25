(function (w, d, qns) {

  // Instancia do axios para requições HTTP
  qns.api = axios.create({
    baseURL: window.location.origin,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Verifica se existe um token no localStorage
  qns.verifyToken =  function () {
    if(!w.localStorage.getItem('token')) {
      console.log('não esta autenticado!');
      w.location.href = w.location.origin + '/login';
    }
  }
  
})(window, document, window.qns = window.qns || {});