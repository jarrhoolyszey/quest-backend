(function (w,d, qns){
  const nickname = d.getElementsByName('nickname')[0];
  const pswd = d.getElementsByName('password')[0];
  const confirmPswd = d.getElementsByName('confirm-password')[0];
  const submit = d.getElementById('register-btn');
  const log = d.getElementById('log-txt');
  
  log.innerHTML = "";
  nickname.focus();

  function setLogMessage(msg) {
    log.innerHTML = msg;

    let timer = setTimeout(() => {
      log.innerHTML = "";
    }, 5000);
  }

  function validate() {
    if( pswd.value !== confirmPswd.value ) {
      setLogMessage("Senhas não conferem");
      confirmPswd.focus();
      return false;
    }

    return true;
  }

  submit.addEventListener('click', async e => {
    e.preventDefault();

    if(validate()) {
      const res = await qns.api.post('/users', {
        nickname: nickname.value,
        password: pswd.value,
      });

      console.log(res);

      if (res.status == 200) { 
        setLogMessage(res.data);
        nickname.value = "";
        pswd.value = "";
        confirmPswd.value = "";
      }
    } 
    
  });

})(window, document, window.qns);