const loginStore = {
    data: {
        user: {
            id_personal :"",
            id_usuario :"",
            tipo_usuario:"",
            usuario:""
        },
        userLogged: false,
        errors: []
    },
    methods: {
        login(username, password){            
            var loginPromise = new Promise((resolve, reject) => {
                let loginStatus = "";
                axios.get(host+`/log/login?userId=` + username + "&password=" + password)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.data.Result == "OK") {
                        if(response.data.data != null){
                            loginStore.data.user = response.data.data;                            
                            loginStore.data.userLogged = true;
                            resolve(response.data);
                        }
                        else{
                            reject("Usuario incorrecto");
                        }
                    }
                })
                .catch(e => {
                    reject("Error al conectarse con el servidor");
                })                
            })
            return loginPromise;
        }
    }
};