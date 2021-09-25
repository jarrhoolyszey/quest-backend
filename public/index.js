(function (w, d, qns) {
  qns.api = axios.create({
    baseURL: window.location.origin,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
})(window, document, window.qns = window.qns || {});