//import axios from 'axios';

const importStore = {
    data: {
        tablas: [
            {
                status : 3,
                name : 'Cliente',
                rest: 'cliente',
                check: true,
            },
            {
                status : 3,
                name : 'Cliente por vendedor',
                rest: 'clientevendedor'
            },
            {
                status : 3,
                name : 'Pedido',
                rest: 'pedido'
            },
            {
                status : 3,
                name : 'Detalles de pedido',
                rest: 'detallepedido'
            },
            {
                status : 3,
                name : 'Dirección',
                rest: 'direccionadicional'
            },
            {
                status : 3,
                name : 'Documentos',
                rest: 'documento'
            },
            {
                status : 3,
                name : 'Estadistica',
                rest: 'estadisticaventa'
            },
            {
                status : 3,
                name : 'Forma de pago',
                rest: 'formapago'
            },
            {
                status : 3,
                name : 'Producto',
                rest: 'producto'
            },
            {
                status : 3,
                name : 'Precio por cliente',
                rest: 'preciocliente'
            },
            {
                status : 3,
                name : 'Estado de cliente',
                rest: 'statuscliente'
            },
            {
                status : 3,
                name : 'Estado de pedido',
                rest: 'statuspedido'
            },
            {
                status : 3,
                name : 'Unidades',
                rest: 'unidadproducto'
            },
            {
                status : 3,
                name : 'Vendedor',
                rest: 'vendedor'
            }
        ],
        capasRol: [],
        errors: []
    },
    methods: {        
        saveInfo(url, indice){
            var sqlPromise = new Promise((resolve, reject) => {                         
                                
                axios.get(host+`/sql/`+url)
                .then(response => {
                    // JSON responses are automatically parsed.
                    var res = {data: response.data, index: indice};
                    resolve(response.data);
                })
                .catch(e => {       
                    importStore.data.errors.push(e)
                    reject(e);
                })
            })
            return sqlPromise;
        }
    }
};