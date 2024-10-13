window.addEventListener('load', function(){
    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const buttonCerrarSession = this.document.getElementById('buttonCerrarSession');
    buttonCerrarSession.addEventListener('click', function(){
        cerrarSession();
    });
});

function mostrarAlerta(mensaje) {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta() {
    msgError.innerHTML = '';
    msgError.style.display = 'none';
}

function mostrarAlertaExito(mensaje) {
    const msgExito = document.createElement('div');
    msgExito.className = 'alert alert-success text-center';
    msgExito.role = 'alert';
    msgExito.innerHTML = mensaje;
    document.body.insertBefore(msgExito, document.body.firstChild);
    setTimeout(() => {
        msgExito.style.display = 'none';
        window.location.replace('index.html');
    }, 3000);
}

async function cerrarSession() {
    const request = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
    };
    const url = 'http://localhost:8082/logout/salir';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema con el logout');
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);
        if (result.resultado) {
            mostrarAlertaExito('¡Has cerrado sesión exitosamente!');
        } else {
            mostrarAlerta(result.mensaje);
        }
    } catch (error) {
        console.log('Error: Ocurrió un problema con el logout', error);
        mostrarAlerta('Error: Ocurrió un problema con el logout');
    }
}