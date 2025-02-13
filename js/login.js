let manejarLogin;
fetch('../json/login.json')
    .then(response => response.json())
    .then(usuarios => {
        manejarLogin = () => {
            const nombreUsuario = document.getElementById('username').value;
            const contrasena = document.getElementById('password').value;

            if (nombreUsuario === '') {
                alert('Complete el campo de usuario.');
                return;
            }

            if (contrasena === '') {
                alert('Complete el campo de contraseña.');
                return;
            }

            const usuario = usuarios.find(u => u.username === nombreUsuario && u.password === contrasena);

            if (usuario) {
                localStorage.removeItem('loggedInUser');
                localStorage.setItem('loggedInUser', JSON.stringify(usuario));

                if (usuario.role === 'admin') {
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

const mostrarPassword = () => {
    const passwordField = document.getElementById('password');
    passwordField.setAttribute('type', 'text');

    setTimeout(() => {
        passwordField.setAttribute('type', 'password');
    }, 2000); // La contraseña será visible por 2 segundos
};

document.getElementById('mensaje').textContent = "user1 | user2 | user3 | user4 | user5";
document.getElementById('mensaje2').textContent = "pass1 | pass2 | pass3 | pass4 | pass5";
