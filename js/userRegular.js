let cerrarSesion;

// Fetch para login.json
fetch('../json/login.json')
    .then(response => response.json())
    .then(users => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            document.getElementById('nombreUser').textContent = user.nombre;

            // Fetch para dataUsers.json
            fetch('../json/dataUsers.json')
                .then(response => response.json())
                .then(dataUsers => {
                    const userData = dataUsers.find(u => u.username === user.username);
                    console.log('Datos de usuario:', userData);

                    // Aquí puedes manejar los datos adicionales del usuario
                    if (userData) {
                        document.getElementById('emailUser').textContent = userData.datosPersonales.email;
                        document.getElementById('telefonoUser').textContent = userData.datosPersonales.telefono;
                        document.getElementById('conjuntoUser').textContent = userData.datosPersonales.conjuntoResidencial;
                        document.getElementById('direccionConjunto').textContent = userData.datosPersonales.direccionConjunto;
                        document.getElementById('fNacimientoUser').textContent = userData.datosPersonales.fNacimiento;

                
                        // Mostrar historial de actividades en una tabla si existen
                        if (userData.historialActividades && userData.historialActividades.length > 0) {
                            const historialActividadesTable = document.getElementById('historialActividadesTable');
                            for (let i = 0; i < userData.historialActividades.length; i++) {
                                const actividad = userData.historialActividades[i];
                                const row = historialActividadesTable.insertRow();
                                const cellFecha = row.insertCell(0);
                                const cellActividad = row.insertCell(1);
                                const cellEstado = row.insertCell(2);
                                cellFecha.textContent = actividad.fecha;
                                cellActividad.textContent = actividad.actividad;
                                cellEstado.textContent = actividad.estado;
                            }
                        }
                    }
                })
                .catch(error => console.error('Error en el fetch de dataUsers', error));
        }

        cerrarSesion = () => {
            localStorage.removeItem('loggedInUser');
            alert('Sesión cerrada');
            window.location.href = 'login.html';
        };
    })
    .catch(error => console.error('Error en el fetch de login', error));
