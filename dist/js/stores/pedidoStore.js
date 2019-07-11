const pedidosStore = {
    data: {        
        pedidos: [],
        errors: []
    },
    methods: {
        loadPedidos(name, max, min) {
            var params = '?name='+name;
            if(max) { params += '&max='+max; }
            if(min) { params += '&min='+min; }
            
            var provPromise = new Promise((resolve, reject) => {
                axios.get(host+`/pedido/listar`+params)
                .then(response => {
                    // JSON responses are automatically parsed.
                    pedidosStore.data.pedidos = [];

                    response.data.data.forEach(element => {
                        pedidosStore.data.pedidos.push(element);
                    });
                    $('.pedidoLoad').hide();
                    resolve(response.data);
                })
                .catch(e => {
                    pedidosStore.data.errors.push(e);
                    console.error(e);
                    reject("Error");
                    $('.pedidoLoad').hide();
                })
            })
            return provPromise;
        }
    }
};