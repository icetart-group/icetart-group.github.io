Vue.component('cm-pedido', {
    template: '#cm-pedido-template',
    data() {
        return { 
            showTable: false,
            pedidosStore: pedidosStore.data,
            filter: {
                name: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
            }
        }
    },
    methods: {
        toFilter() {
            this.showTable = false;
        },
        applyFilter(){
            $('.pedidoLoad').show();

            var maxTimestamp = null, minTimestamp = null, nombre = '', pmax = '', pmin = '';

            let ta = this.filter.startTime == '' ? '' : (" " +this.filter.startTime + ':00');
            let tb = this.filter.endTime == '' ? '' : (" " +this.filter.endTime + ':00');

            if(this.filter.endDate && this.filter.endDate != ''){
                maxTimestamp = this.filter.endDate + tb;
                pmax = "ped_fechapedido <= '"+maxTimestamp+"'";
            }
            if(this.filter.startDate && this.filter.startDate != ''){
                minTimestamp = this.filter.startDate +ta;
                pmin = "ped_fechapedido >= '"+minTimestamp+"'";;
            }
            
            var pedPromise = pedidosStore.methods.loadPedidos(this.filter.name, maxTimestamp, minTimestamp);
			pedPromise.then( (data) => {
                this.showTable = true;
			})
            .catch( e => { console.log(e); })
            
            var params = '';
            if(this.filter.name && this.filter.name!= '')
                params = "ven_nombre LIKE '%" + this.filter.name.toUpperCase() + "%'";

            if(params != '' && pmax != '')
                params += 'AND ';
            params += pmax;

            if(params != '' && pmin != '')
                params += 'AND ';
            params += pmin;

            var filterParams = [];
            filterParams["CQL_FILTER"] = params;
            
            //controlCapaStore.data.capaMap[5].capa.getSource().updateParams(filterParams);
            controlCapaStore.data.filtered.sp_pedidos_infm[0].getSource().updateParams(filterParams);
            controlCapaStore.methods.visibleTrue(... controlCapaStore.data.filtered.sp_pedidos_infm)

            /*
                &viewparams=low:2000000;high:5000000
                controlCapaStore.data.capaMap[0].capa.getSource().updateParams(filterParams);
            */
        },
        cleanFilter(){
            var date = new Date();
            var datestring = ('0000' + date.getFullYear()).slice(-4) + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
            this.filter = {
                name: '',
                startDate: datestring,
                startTime: '00:01',
                endDate: datestring,
                endTime: '23:59',
            };
            controlCapaStore.methods.visibleFalse(... controlCapaStore.data.filtered.sp_pedidos_infm)
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
        }
    },
    mounted() {
        this.cleanFilter();
    }
});