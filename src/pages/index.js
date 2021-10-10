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

    const token = w.localStorage.getItem('token'); 
    if(!token) {
      console.log('não esta autenticado!');
      w.location.href = w.location.origin + '/login';
      return;
    }

    qns.api.defaults.headers.common['Authorization'] = `${token}`;
  }

  qns.logout = function () {
    const token = w.localStorage.getItem('token');

    if(token) {
      w.localStorage.removeItem('token');
      w.location.href = w.location.origin + '/login';
    }
  };

  qns.autoLogin = function () {
    const token = w.localStorage.getItem('token');

    if(token) {
      w.location.href = w.location.origin + '/crud';
    }
  }
  
})(window, document, window.qns = window.qns || {});