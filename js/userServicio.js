document.addEventListener('DOMContentLoaded', () => {
    let cerrarSesion;

    // Verificar si hay un usuario logueado en localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        // Si no hay usuario logueado, redirigir a la página de login
        window.location.href = '../html/login.html';
    } else {
        // Si hay usuario logueado, continuar con el fetch de datos
        fetch('../json/login.json')
            .then(response => response.json())
            .then(users => {
                const user = JSON.parse(localStorage.getItem('loggedInUser'));
                if (user) {
                    document.getElementById('nombreUser').textContent = user.nombre;
                }

                fetch('../json/dataUsers.json')
                    .then(response => response.json())
                    .then(dataUsers => {
                        const userData = dataUsers.find(u => u.username === user.username);

                        // desde aqui enpiezan las tablas
                        // datos personales
                        if (userData) {
                            document.getElementById('emailUser').textContent = userData.datosPersonales.email;
                            document.getElementById('telefonoUser').textContent = userData.datosPersonales.telefono;
                            document.getElementById('conjuntoUser').textContent = userData.datosPersonales.conjuntoResidencial;
                            document.getElementById('direccionConjunto').textContent = userData.datosPersonales.direccionConjunto;
                            document.getElementById('fNacimientoUser').textContent = userData.datosPersonales.fNacimiento;

                            // servicios
                            if (userData.servicios && userData.servicios.length > 0) {
                                const serviciosTable = document.getElementById('serviciosTable')
                                for (let i = 0; i < userData.servicios.length; i++) {
                                    const servicio = userData.servicios[i];
                                    const row = serviciosTable.insertRow();
                                    const celdaTipo = row.insertCell(0);
                                    const celdaDescripcion = row.insertCell(1);
                                    const celdaTarifa = row.insertCell(2);
                                    celdaTipo.textContent = servicio.tipo;
                                    celdaTipo.setAttribute('data-label', 'Tipo');
                                    celdaDescripcion.textContent = servicio.descripcion;
                                    celdaDescripcion.setAttribute('data-label', 'Descripción');
                                    celdaTarifa.textContent = servicio.tarifa;
                                    celdaTarifa.setAttribute('data-label', 'Tarifa');
                                }
                            }

                            //  historial de servicios
                            if (userData.historialServicios && userData.historialServicios.length > 0) {
                                const historialServiciosTable = document.getElementById('historialServiciosTable')
                                for (let i = 0; i < userData.historialServicios.length; i++) {
                                    const historial = userData.historialServicios[i];
                                    const row = historialServiciosTable.insertRow();
                                    const celdaFecha = row.insertCell(0);
                                    const celdaCliente = row.insertCell(1);
                                    const celdaServicio = row.insertCell(2);
                                    const celdaCalificacion = row.insertCell(3);
                                    celdaFecha.textContent = historial.fecha;
                                    celdaFecha.setAttribute('data-label', 'Fecha');
                                    celdaCliente.textContent = historial.cliente;
                                    celdaCliente.setAttribute('data-label', 'Cliente');
                                    celdaServicio.textContent = historial.servicio;
                                    celdaServicio.setAttribute('data-label', 'Servicio');
                                    celdaCalificacion.textContent = historial.calificacion;
                                    celdaCalificacion.setAttribute('data-label', 'Calificación');
                                }
                            }
                        }
                    })
                    .catch(error => console.error('Error en el fetch de dataUsers.json', error));

                cerrarSesion = () => {
                    localStorage.removeItem('loggedInUser');
                    alert('Sesión cerrada');
                    window.location.href = 'login.html';
                };
            })
            .catch(error => console.error('Error en el fetch de login.json', error));
    }
});