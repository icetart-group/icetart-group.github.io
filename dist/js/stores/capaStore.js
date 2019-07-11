//import axios from 'axios';

const capaStore = {
    data: {
        capas: [],
        capasRol: [],
        errors: []
    },
    methods: {
        saveCapaRol(insert, tipo_usuario) {
            //axios.post(host+`/capasuser/delete/` + tipo_usuario)
            axios({
                method: 'DELETE',
                url: host+`/capasuser/delete/` + tipo_usuario
                })
                .then(response => {
                    // JSON responses are automatically parsed.
                    if(response.data.Result == "OK"){
                        insert.forEach(element => {
                            axios.post(host+`/capasuser/insert`, {
                                    id_capa: element,
                                    tipo_usuario: tipo_usuario
                                })
                                .then(response => {
                                    // JSON responses are automatically parsed.
                                    if (response.data.Result == "OK") {
                                        console.log("Capa guardada con exito");
                                    }
                                    $('.configLLoad').hide();
                                })
                                .catch(e => {
                                    capaStore.data.errors.push(e)
                                })
                        });
                        if(insert.length == 0)
                            $('.configLLoad').hide();
                    }
                })
                .catch(e => {
                    capaStore.data.errors.push(e)
                })
        },
        created() {
            axios.get(host+`/capas`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    response.data.data.forEach(element => {
                        element.checked = false;
                        capaStore.data.capas.push(element);
                    });
                    $('.configLLoad').hide();
                })
                .catch(e => {
                    capaStore.data.errors.push(e)
                })
        },
        capaRol(rol) {
            axios.get(host+`/capasuser?id=`+rol)
                .then(response => {
                    // JSON responses are automatically parsed.
                    capaStore.data.capas.forEach(capa => {
                        capa.checked = false;
                        response.data.data.forEach(element => {
                            if (capa.id_capa == element.id_capa) {
                                capa.checked = true;
                            }
                        });
                        $('.configLLoad').hide();
                        //capaStore.data.capasRol.push(element);
                    });
                })
                .catch(e => {
                    capaStore.data.errors.push(e);
                })
        },
        saveInfo(url, tipo, indice, id_capa, nombre){
            var guardarPromise = new Promise((resolve, reject) => {
                let form = new FormData();

                if(tipo == 'video'){
                    form.append('url', url);
                }
                else{
                    for( var i = 0; i < url.length; i++ ){
                        let img = url[i];
                        form.append('url[' + i + ']', img);
                    }
                }                
                form.append('tipo', tipo);
                form.append('indice', indice);
                form.append('nombre', nombre);
                form.append('id_capa', id_capa);                
                
                axios.post(host+'/url/capa/insert_upd',  form,
                    { headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(response){
                    resolve(response.data);
                }).catch(function(){
                    reject();
                });
            })
            return guardarPromise;
        }
    }
};