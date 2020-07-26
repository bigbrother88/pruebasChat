var provider;
var bool_sesion_correo = false;

//con proveedor de google
$('#sesionGoogle').click(function(){
    $('#contenedor_inicio_correo').hide();
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result){
            console.log("mostrar user");
            console.log(result.user);
            console.log("Almaceno en firebase");
            almacenaDatos(result.user);
            console.log("Almaceno en firebase ok");
        });
});
//con proveedor de facebook
$('#sesionFacebook').click(function(){
    $('#contenedor_inicio_correo').hide();
    provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result){
            console.log("mostrar user");
            console.log(result.user);
            console.log("Almaceno en firebase");
            almacenaDatos(result.user);
            console.log("Almaceno en firebase ok");
        });
});
//con correo
$('#sesionCorreo').click(function(){
    if($('#contenedor_inicio_correo').is(':visible')){
        $('#contenedor_inicio_correo').hide();
    } else {        
        $('#contenedor_inicio_correo').show(); 
        $('#Contenedor_login').show();
        $('#Contenedor_registro').hide();
    }
});
$('#boton_tipo_sesion').change(function(){
    if($('#boton_tipo_sesion').is(':checked')){
        $('#Contenedor_login').hide();
        $('#Contenedor_registro').show();
    } else {
        $('#Contenedor_login').show();
        $('#Contenedor_registro').hide();
    }
});
$('#boton_registro').click(function(){
    var email = $('#text_registro_correo').val();
    var pass = $('#text_registro_contrasena').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      })
      .then(function () {
        //verificar();
        $('#Contenedor_login').show();
        $('#Contenedor_registro').hide();
        $('#boton_tipo_sesion').bootstrapToggle('off');
        $('#text_login_correo').val(email);
        alert("Se registro correo correctamente");
      });
});
$('#boton_login').click(function(){
      var email = $('#text_login_correo').val();
      var pass = $('#text_login_contrasena').val();
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        })
        .then(function(){
            alert("Se inicio acceso correctamente");
        });
});
//llamar pagina nueva
function abrirPagina() {
    
}
//verificar email
function verificarEmail() {
    
}
//cerrar sesion
function cerrarSesion() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });   
}
//guardado de datos automatico
function almacenaDatos(user){
    var nombreBaseDatos = "datosUsuario";
    var datosDelUsuario = {
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL,
        numero: user.phoneNumber,
        uid: user.uid
    };
    var fireBD = firebase.database();
    //var referencia = fireBD.ref(nombreBaseDatos+user.uid);
    //referencia.push(datosDelUsuario);
    var referencia = fireBD.ref(nombreBaseDatos);
    referencia.child(user.uid).set(datosDelUsuario);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    }
  });
/*
firebase.database().ref("datosInicioDeSesion")
    .on("child_added",function(s){
        var user = s.val();
        //$('#principal').append("<img width='150px' src='" + user.foto+"'/>");
        $('#principal').append("<p>"+ user.email + "</p>");
});
*/