const infoLayerStore = {
    data: {
        infos: [],
        registros: [],
        errors: []
    },
    methods: {
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
        },
        getLayerinfo(id_capa, indice){
            var infoPromise = new Promise((resolve, reject) => {
                infoLayerStore.data.infos = [];
                axios.get(host+`/url/capa/by?id_capa=`+id_capa+`&indice=`+indice)
                .then(response => {
                    // JSON responses are automatically parsed.
                    response.data.data.forEach(element => {
                        infoLayerStore.data.infos.push(element);
                    });
                    resolve(response.data.data);
                })
                .catch(e => {
                    infoLayerStore.data.errors.push(e);
                    reject(response.data);
                })
            })
            return infoPromise;
        },
        getLayersinfo(id_capa, indice){
            var infoPromise = new Promise((resolve, reject) => {
                infoLayerStore.data.registros = [];
                axios.get(host+`/url/capa`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    response.data.data.forEach(element => {
                        infoLayerStore.data.registros.push(element);
                    });                    
                    $('.infoLLoad').hide();
                    resolve(response.data.data);
                })
                .catch(e => {
                    infoLayerStore.data.errors.push(e);
                    reject();
                })
            })
            return infoPromise;
        },
        deleteInfo(id){
            var infoPromise = new Promise((resolve, reject) => {
                axios({
                    method: 'DELETE',
                    url: host+`/url/capa/eliminar?id_url_capa=` + id
                    })
                .then(response => {
                    resolve();
                })
                .catch(e => {
                    infoLayerStore.data.errors.push(e);
                    reject();
                })
            })
            return infoPromise;
        }
    }
};