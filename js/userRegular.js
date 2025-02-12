let cerrarSesion;

fetch('../json/login.json')
    .then(response => response.json())
    .then(users => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            document.getElementById('nombreUser').textContent = user.nombre;
        }

        fetch('../json/otroArchivo.json')
            .then(response => response.json())
            .then(data => {
                console.log('Datos del segundo JSON:', data);
                // Aquí puedes agregar el código para manejar los datos del segundo JSON
            })
            .catch(error => console.error('Error en el fetch del segundo JSON', error));


        cerrarSesion = () => {
            localStorage.removeItem('loggedInUser');
            alert('Sesión cerrada');
            window.location.href = 'login.html';
        };
    })
    .catch(error => console.error('Error en el fetch', error));