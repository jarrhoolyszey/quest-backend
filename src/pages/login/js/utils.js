(function (w, d, qns) {

  w.addEventListener('load', () => {
    qns.autoLogin();
  })


  const nickname = d.getElementById('nickname');
  const password = d.getElementById('password');
  const submit   = d.getElementById('submit-btn');

  submit.addEventListener('click', async (e) => {    
    e.preventDefault();
    
    try {
      const response = await qns.api.post('auth/admin', {
        nickname: nickname.value,
        password: password.value,
      });
      
      if( response.status == 200) {
        console.log(response);
        const { token, admin } = response.data;

        qns.api.defaults.headers.common['Authorization'] = `${token}`;
        w.localStorage.setItem('token', `Bearer ${token}`);
        w.location.href = w.location.origin + '/crud';
      } else {
        console.log(err.response.data)
      }

    } catch (error) {
      // err.response.data to get server message
      console.log(error.response.data);
    }
  });
  
})(window, document, window.qns = window.qns || {});