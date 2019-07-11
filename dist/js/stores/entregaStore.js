const entregaStore = {
    data: {
        pedidos: [],
        errors: []
    },
    methods: {        
        loadEntregas(name, type, dateA, dateB, rtype) {
            var params = '?name='.concat(name,'&type=',type,'&dateA=',dateA,'&dateB=',dateB,'&rtype=',rtype);
            //if(max) { params += '&max='+max; }
            //if(min) { params += '&min='+min; }
            
            var provPromise = new Promise((resolve, reject) => {
                axios.get(host+`/entrega/listar`+params)
                .then(response => {
                    // JSON responses are automatically parsed.
                    entregaStore.data.pedidos = [];

                    response.data.data.forEach(element => {
                        entregaStore.data.pedidos.push(element);
                    });
                    $('.pedidoLoad').hide();
                    resolve(response.data);
                })
                .catch(e => {
                    entregaStore.data.errors.push(e);
                    console.error(e);
                    reject("Error");
                    $('.pedidoLoad').hide();
                })
            })
            return provPromise;
        }
    }
};