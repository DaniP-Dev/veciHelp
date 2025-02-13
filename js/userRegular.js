let cerrarSesion;

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

                    // desde aqui enpiezan las tablas
                    // datos personales
                    if (userData) {
                        document.getElementById('emailUser').textContent = userData.datosPersonales.email;
                        document.getElementById('telefonoUser').textContent = userData.datosPersonales.telefono;
                        document.getElementById('conjuntoUser').textContent = userData.datosPersonales.conjuntoResidencial;
                        document.getElementById('direccionConjunto').textContent = userData.datosPersonales.direccionConjunto;
                        document.getElementById('fNacimientoUser').textContent = userData.datosPersonales.fNacimiento;

                        // historial de actividades
                        if (userData.historialActividades && userData.historialActividades.length > 0) {
                            const historialActividadesTable = document.getElementById('historialActividadesTable');
                            for (let i = 0; i < userData.historialActividades.length; i++) {
                                const actividad = userData.historialActividades[i];
                                const row = historialActividadesTable.insertRow();
                                const celdaFecha = row.insertCell(0);
                                const celdaActividad = row.insertCell(1);
                                const celdaEstado = row.insertCell(2);
                                celdaFecha.textContent = actividad.fecha;
                                celdaFecha.setAttribute('data-label', 'Fecha');
                                celdaActividad.textContent = actividad.actividad;
                                celdaActividad.setAttribute('data-label', 'Actividad');
                                celdaEstado.textContent = actividad.estado;
                                celdaEstado.setAttribute('data-label', 'Estado');
                            }
                        }
                    }
                })
                .catch(error => console.error('Error en el fetch de dataUsers.json', error));
        }

        cerrarSesion = () => {
            localStorage.removeItem('loggedInUser');
            alert('Sesión cerrada');
            window.location.href = 'login.html';
        };
    })
    .catch(error => console.error('Error en el fetch de login.json', error));
