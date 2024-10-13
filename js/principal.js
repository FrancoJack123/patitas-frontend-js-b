window.addEventListener('load', function(){

    const buttonCerrarSession = this.document.getElementById('buttonCerrarSession');
    const msgSuccess = this.document.getElementById('msgSuccess');
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    buttonCerrarSession.addEventListener('click', function(){
        window.location.replace('logout.html');
    });
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}