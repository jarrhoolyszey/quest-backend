(function (w, d) {
  const nickname = d.getElementById('nickname');
  const password = d.getElementById('password');
  const submit   = d.getElementById('submit-btn');

  submit.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/auth/admin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: nickname.value,
        password: password.value
      })
    })

    console.log(response);

    if (response.ok) {
      const json = await response.json();
      console.log(json);
    } else {
      console.log(response.text);
    }
  });

})(window, document);