const busquedaStore = {
    data: {
        proyectos: [],
        proyectossa: [],
        acciones: [],
        departamentos: [],
        provincias: [],
        distritos: [],
        intervenciones: [],
        dep_checks: [],
        provinciasInf: [],
        distritosInf: [],
        errors: []
    },
    methods: {
        loadDepartamentos() {
            axios.get(host+`/map/listardep`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    busquedaStore.data.departamentos = [];

                    response.data.data.forEach(element => {
                        busquedaStore.data.departamentos.push(element);
                    });

                    busquedaStore.data.provincias= [];
                    busquedaStore.data.distritos= [];
                    $('.searchSpacialLoad').hide();
                })
                .catch(e => {
                    busquedaStore.data.errors.push(e)
                })
        },
        loadProvincias(id) {
            axios.get(host+`/map/listarprov?id=` + id)
                .then(response => {
                    // JSON responses are automatically parsed.
                    busquedaStore.data.provincias = [];

                    response.data.data.forEach(element => {
                        busquedaStore.data.provincias.push(element);
                    });
                    
                    busquedaStore.data.distritos = [];
                    $('.searchSpacialLoad').hide();
                })
                .catch(e => {
                    busquedaStore.data.errors.push(e)
                })
        },
        loadDistritos(id) {
            axios.get(host+`/map/listardist?id=` + id)
                .then(response => {
                    // JSON responses are automatically parsed.
                    busquedaStore.data.distritos = [];

                    response.data.data.forEach(element => {
                        busquedaStore.data.distritos.push(element);
                    });

                    $('.searchSpacialLoad').hide();
                })
                .catch(e => {
                    busquedaStore.data.errors.push(e)
                })
        },
        loadProvinciaProm(id){
             var provPromise = new Promise((resolve, reject) => {
                busquedaStore.data.provinciasInf = [];
                axios.get(host+`/map/listarprov?id=` + id)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.data.success == true) {
                        if(response.data.data != null){
                            response.data.data.forEach(element => {
                                busquedaStore.data.provinciasInf.push(element);
                            });
                            resolve(response.data);
                        }
                        else{
                            reject("Error al descargar las provincias");
                        }
                    }
                })
                .catch(e => {
                    reject("Error al conectarse con el servidor");
                })                
            })
            return provPromise;
        },
        loadDistritosProm(id){
             var distPromise = new Promise((resolve, reject) => {
                busquedaStore.data.distritosInf = [];
                axios.get(host+`/map/listardist?id=` + id)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.data.success == true) {
                        if(response.data.data != null){
                            response.data.data.forEach(element => {
                                busquedaStore.data.distritosInf.push(element);
                            });
                            resolve(response.data);
                        }
                        else{
                            reject("Error al descargar los distritos");
                        }
                    }
                })
                .catch(e => {
                    reject("Error al conectarse con el servidor");
                })                
            })
            return distPromise;
        }
    }
};

//http://localhost:8080/GlgisSMP/catastro/listarsector
//http://localhost:8080/GlgisSMP/catastro/listarmanzana?id=46  id:46
//http://localhost:8080/GlgisSMP/catastro/listarlote?id=17423  id:17423