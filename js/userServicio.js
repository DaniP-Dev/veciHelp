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

                        // Mostrar servicios en una tabla si existen
                        if (userData.servicios && userData.servicios.length > 0) {
                            const serviciosTable = document.getElementById('serviciosTable');
                            for (let i = 0; i < userData.servicios.length; i++) {
                                const servicio = userData.servicios[i];
                                const row = serviciosTable.insertRow();
                                const cellTipo = row.insertCell(0);
                                const cellDescripcion = row.insertCell(1);
                                const cellTarifa = row.insertCell(2);
                                cellTipo.textContent = servicio.tipo;
                                cellDescripcion.textContent = servicio.descripcion;
                                cellTarifa.textContent = servicio.tarifa;
                            }
                        }

                        // Mostrar historial de servicios en una tabla si existen
                        if (userData.historialServicios && userData.historialServicios.length > 0) {
                            const historialServiciosTable = document.getElementById('historialServiciosTable');
                            for (let i = 0; i < userData.historialServicios.length; i++) {
                                const historial = userData.historialServicios[i];
                                const row = historialServiciosTable.insertRow();
                                const cellFecha = row.insertCell(0);
                                const cellCliente = row.insertCell(1);
                                const cellServicio = row.insertCell(2);
                                const cellCalificacion = row.insertCell(3);
                                cellFecha.textContent = historial.fecha;
                                cellCliente.textContent = historial.cliente;
                                cellServicio.textContent = historial.servicio;
                                cellCalificacion.textContent = historial.calificacion;
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
