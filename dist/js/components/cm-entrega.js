Vue.component('cm-entrega', {
    template: '#cm-entrega-template',
    data() {
        return { 
            showTable: false,
            filter: {
                lapse: 'exact',
                name: '',
                rangetype: 'diario',
                rangeMh: '',
                rangeYh: '',
                rangeMd: '',
                rangeYb: '',
                rangeTb: '',
                rangeDb: '',
                rangeTa: '',
                rangeDa: '',
                exactT: '',
                exactD: ''
            },
            entregaStore: entregaStore.data,
        }
    },
    methods: {
        toFilter() {
            this.showTable = false;
        },
        toTable() {            
            let name = this.filter.name;
            let type = this.filter.lapse;
            let dateA = '', dateB = '';
            let rtype = this.filter.rangetype;
            if(type=="exact")
                dateA = this.filter.exactD;
            else if(type=="range"){
                if(rtype=="mensual"){
                    let year_a = this.filter.rangeYd.toString().padStart(4, "0");
                    let month_a = this.filter.rangeMd.toString().padStart(2, "0");
                    let day_a = getDaysInMonth(parseInt(month_a), parseInt(year_a));

                    let year_b = this.filter.rangeYh.toString().padStart(4, "0");
                    let month_b = this.filter.rangeMh.toString().padStart(2, "0");
                    let day_b = getDaysInMonth(parseInt(month_b), parseInt(year_b));

                    dateA = year_a.concat('-',month_a,'-',day_a,' 00:00:00');
                    dateB = year_b.concat('-',month_b,'-',day_b,' 23:59:59');
                } else if(rtype=="diario"){
                    let ta = this.filter.rangeTa == '' ? '' : (" " +this.filter.rangeTa + ':00');
                    let tb = this.filter.rangeTb == '' ? '' : (" " +this.filter.rangeTb + ':00');

                    dateA = this.filter.rangeDa + ta;
                    dateB = this.filter.rangeDb + tb;
                }
            }

            let params = '';
            if(type=="exact")
                params = "fecha_entrega = '" + dateA + "'";
            else if(type=="range"){                
                params = "fecha_entrega BETWEEN '" + dateA + "' AND '" + dateB + "'";
            }

            //if(this.filter.name && this.filter.name!= '')
                //params = "ven_nombre LIKE '%" + this.filter.name.toUpperCase() + "%'";
            
            var filterParams = [];
            filterParams["CQL_FILTER"] = params;
            controlCapaStore.data.filtered.sp_entrega[0].getSource().updateParams(filterParams);

            var prom = entregaStore.methods.loadEntregas(name, type, dateA, dateB, rtype);
            prom.then( (data) => {
                this.showTable = !false;
                controlCapaStore.methods.visibleTrue(... controlCapaStore.data.filtered.sp_entrega)
            }).catch( e => { console.log(e); })
        },
        zoomPedido(latitud, longitud){
            var view = map.getView();             
            var pTo = ol.proj.get("EPSG:3857");
            
            var coord = [parseFloat(longitud), parseFloat(latitud)]; //[-75, -12]; //
            var LonLat = ol.proj.transform(coord, 'EPSG:4326', pTo)

            view.animate({
                zoom: 18,
                center: LonLat,
                duration: 500
            });
        },
        cleanFilter(){           
            this.started();
            controlCapaStore.methods.visibleFalse(... controlCapaStore.data.filtered.sp_pedidos_infm)
        },
        started(){
            var date = new Date();
            var datestring = ('0000' + date.getFullYear()).slice(-4) + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
            this.filter = {
                lapse: 'exact',
                name: '',
                rangetype: 'diario',
                rangeMh: (date.getMonth() + 1).toString().padStart(2, "0"),
                rangeYh: date.getFullYear(),
                rangeMd: date.getMonth().toString().padStart(2, "0"),
                rangeYd: date.getFullYear(),
                rangeTb: "23:59",
                rangeDb: datestring,
                rangeTa: "00:01",
                rangeDa: datestring,
                exactT: '',
                exactD: datestring
            }            
        }
    },
    computed: {
        lapseRange() {
            this.showTable = false;
        },
        totalComplete() {
            var cant_complete = 0;            
            this.entregaStore.pedidos.forEach( el => {
                if(el.cant_pedido - el.cant_entrega == 0)
                    cant_complete++;
            })
            return cant_complete;
        },        
        porcEntreg(){
            var cant_pedido = 0;
            var cant_entrega = 0;
            this.entregaStore.pedidos.forEach( el => {
                cant_pedido += el.cant_pedido;
                cant_entrega += el.cant_entrega;
            })
            return cant_entrega*100/cant_pedido;
        },
        totalUno() {
            var cant_complete = 0;            
            this.entregaStore.pedidos.forEach( el => {
                if(el.cant_entrega == 1)
                    cant_complete++;
            })
            return cant_complete;
        }, 
        totalDos() {
            var cant_complete = 0;            
            this.entregaStore.pedidos.forEach( el => {
                if(el.cant_entrega == 2)
                    cant_complete++;
            })
            return cant_complete;
        }, 
        totalDosMas() {
            var cant_complete = 0;            
            this.entregaStore.pedidos.forEach( el => {
                if(el.cant_entrega > 2)
                    cant_complete++;
            })
            return cant_complete;
        }, 
        promedioTotal() {
            var cant_complete = 0;            
            this.entregaStore.pedidos.forEach( el => {                
                cant_complete += el.cant_entrega;
            })
            var prom = Math.round(cant_complete/this.entregaStore.pedidos.length*100)/100;
            return prom;
        }, 
    },
    mounted() {
        this.started();
    }
});