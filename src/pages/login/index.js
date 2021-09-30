(function (w, d, qns) {
  
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
      
      const { token, admin } = response.data;

      qns.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      w.localStorage.setItem('token', `Bearer ${token}`);
      w.location.href = w.location.origin + '/panel';

    } catch (error) {
      // err.response.data to get server message
      console.log(error);
    }
  });

})(window, document, window.qns = window.qns || {});