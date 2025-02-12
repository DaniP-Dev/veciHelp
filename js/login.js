let manejarLogin;
fetch('../json/login.json')
    .then(response => response.json())
    .then(users => {
        manejarLogin = () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === '') {
                alert('Complete el campo de usuario.');
                return;
            }

            if (password === '') {
                alert('Complete el campo de contraseña.');
                return;
            }

            const user = users.find(u => u.username === username && u.password === password);
            console.log('Usuario encontrado:', user);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                if (user.role === 'admin') {
                    window.location.href = '../html/userServicio.html';
                } else {
                    window.location.href = '../html/userRegular.html';
                }
            } else {
                alert('Datos Incorrectos');
            }
        };
    })
    .catch(error => console.error('Error en el fetch', error));
