const cuActividadStore = {
    data: {
        usuarios: [],
        select_usuarios: [],
        users: [],
        errors: [],
        count: 0,
        data_reset: [
        {
            id_usuario: "",
            usuario: "",
            contrasena: "",
            id_personal: "",
            tipo_usuario: ""
       }
    ]


    },
    methods: {
        loadUsuarios() {
           axios.get(host+'/listar/usuarios')
                .then(response => {
                    // JSON responses are automatically parsed.
                    cuActividadStore.data.users = [];
                    response.data.data.forEach(data => {
                        cuActividadStore.data.users.push(data);
                        //console.log("Usuarios Cargados");
                    });
                    $('.actividadLoad').hide();
                })
                .catch(e => {
                    cuActividadStore.data.errors.push(e)
                })
        },
        //CONTROL DE USUARIO
        seleccionarUsuario(id_usuario) {       
         // console.log("Codigo de usuario ----> "+ id_usuario);
            axios.get(host+'/listar/usuariosbyid?id_usuario='+id_usuario)
                 .then(response => {
                    if (response.data.data.length > 0) {
                        cuActividadStore.data.select_usuarios = response.data.data[0];
                        cuActividadStore.data.select_usuarios.contrasena = '';
                      //console.log("IF"+cuActividadStore.data.select_usuarios);
                    }else{
                      cuActividadStore.data.select_usuarios = [];
                     // console.log("ELSE"+cuActividadStore.data.select_usuarios);
                    }
                    $('.actividadLoad').hide();
                })
                .catch(e => {
                    cuActividadStore.data.errors.push(e)
                })
        },
        registerUser() {
           var guardarPromise = new Promise((resolve, reject) => {
            let form = new FormData();
            var f = new Date();

             var send_usuario = $.extend({}, cuActividadStore.data.select_usuarios);
             delete send_usuario.id_usuario;
             //console.log(send_usuario);
             axios.post(host+ '/usuario/insertar', send_usuario)
              .then(function(response) {
                if (response.data.success == true) {
                    console.log('GUARDO USUARIO!!!');
                }
                resolve(response.data);
              })
              .catch(function(){
                reject();
                console.log('FAILURE!!');
              });

           })
           return guardarPromise;
        },

        updateUsuario(id_usuario){
           var actuaPromise = new Promise((resolve, reject) => {     
             var send_usuario = $.extend({}, cuActividadStore.data.select_usuarios);
                 //console.log(send_usuario);
                 axios.post(host+ '/usuario/actualizar', send_usuario)
                 .then(function(response) {
                   if (response.data.success == true) {
                      console.log('ACTUALIZO EL USUARIO!!!');
                   }
                  resolve(response.data);
                })
                .catch(function(){
                  reject();
                  console.log('FAILURE!!');
                });
           })
           return actuaPromise;
        },

        deleteUsuario(id_usuario) {
          var deletePromise = new Promise((resolve, reject) => {
           axios.get(host+'/usuario/eliminar?id_usuario='+id_usuario)
                 .then(response => {
                    //console.log(response);
                    if (response.data.Error == false) {
                      console.log("Usuario eliminado con exito");
                      resolve(response.data);
                    }else {
                      console.log("No se elimino el usuario");
                    }
                    $('.actividadLoad').hide();
                })
                .catch(e => {
                  reject();
                  cuActividadStore.data.errors.push(e)
                  console.log(this.errors);
                })
            });
            return deletePromise;
        }

    }
};
