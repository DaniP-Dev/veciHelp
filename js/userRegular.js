let cerrarSesion;
fetch('../json/usuarios.json')
    .then(response => response.json())
    .then(users => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            document.getElementById('nombreUser').textContent = user.nombre;
        }

        cerrarSesion = () => {
            localStorage.removeItem('loggedInUser');
            alert('Sesión cerrada');
            window.location.href = 'login.html';
        };
    })
    .catch(error => console.error('Error en el fetch', error));