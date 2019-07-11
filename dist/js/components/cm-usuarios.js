Vue.component('cm-usuarios', {
    template: '#cm-usuarios-template',
    data() {
        return {
    		cuActividadStore: cuActividadStore.data,
    		actividades_show: 0,
            actividad: {},
            users: {},
    		expSearch: '',
            mes_correspondiente: '',
            indice: 1,
            message: {
    			send : false,
    			state : '',
    			value : '',
    			title : ''
    		}
        }
    },
    methods: {
        initMessage(){
                    this.message.send = false;
                this.message.state = '';
                this.message.value = '';
                this.message.title = '';
            },

        obtener_mes(){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            var fecha=new Date();
            this.mes_correspondiente =  meses[fecha.getMonth()] + "-" + fecha.getFullYear();

        },
        addActvidad() {
            cuActividadStore.methods.seleccionarUsuario("US0");
            this.actividades_show = 1;
        },
        go_back(){
            this.actividades_show = 0;
            $('.actividadLoad').show();
            this.obtener_mes();
            cuActividadStore.methods.loadUsuarios();
            this.initMessage();
        },
        selectActividad(id_psc_actividad) {
            $('#btnRegisterActividad').hide();
            $('.actividadLoad').show();
            cuActividadStore.methods.seleccionarActividad(id_psc_actividad);
            this.actividades_show = 1;
        },
        selectUsuario(id_usuario) {
            $('#btnRegisterActividad').hide();
            $('.actividadLoad').show();
            cuActividadStore.methods.seleccionarUsuario(id_usuario);
            this.actividades_show = 2;
        },
        registerUsuario() {
            $('.actividadLoad').show();
            var act = cuActividadStore.methods.registerUser();
            act.then( (exito, fallo) => {
                if(exito.success == true ){
                    $('.actividadLoad').hide();
                    this.go_back();
                    //swal("Felicidades!", "Usuario Registrado!", "success");
                }
                else if(exito.success == false){
                    $('#txt_test').val(idtema);
                    $('.actividadLoad').hide();
                }
            });
        },
        updateUsuario(id_usuario) {
            $('.actividadLoad').show();
            var act = cuActividadStore.methods.updateUsuario(id_usuario);
            act.then( (exito, fallo) => {
                if(exito.success == true ){
                    $('.actividadLoad').hide();
                    this.go_back();
                }
                else if(exito.success == false){
                    
                }
            });
        },
        deleteUsuario(id_usuario) {
            $('.actividadLoad').show();
            var act = cuActividadStore.methods.deleteUsuario(id_usuario);
            act.then((exito, fallo) =>{
                if(exito.success == true){
                    $('.actividadLoad').hide();
                    this.go_back();
                }
            });
        }
    },
    created() {
        this.initMessage();
        this.obtener_mes();
        cuActividadStore.methods.loadUsuarios();

    }
});
