Vue.component('cm-track', {
    template: '#cm-track-template',
    data() {
        return { 
            filter:{
                fa: '',
                ta: '',
                tb: '',
                fb: '',
                name: ''
            },
            alertTrack: false
        }
    },
    methods: {
        cleanFilter(){
            this.started();
            controlCapaStore.methods.visibleFalse(... controlCapaStore.data.filtered.sp_track);
            this.alertTrack = false;
        },
        toTable(){           
            let params = '';
            let dateA='', dateB='';
            let ta = this.filter.ta == '' ? '' : (" " +this.filter.ta + ':00');
            let tb = this.filter.tb == '' ? '' : (" " +this.filter.tb + ':00');

            dateA = this.filter.fa + ta;
            dateB = this.filter.fb + tb;
            //if(type=="exact")
            //    params = "fecha_track = '" + dateA + "'";
            //else if(type=="range"){
            //}
            if(this.filter.name!= '')
                params = "rep_nombre LIKE '%" + this.filter.name.toUpperCase() + "%'";            
            if(params != '')
                params += " AND "

            params += "fecha_track BETWEEN '" + dateA + "' AND '" + dateB + "'";
            
            var filterParams = [];
            filterParams["CQL_FILTER"] = params;
            controlCapaStore.data.filtered.sp_track[0].getSource().updateParams(filterParams);

            controlCapaStore.methods.visibleTrue(... controlCapaStore.data.filtered.sp_track)
            this.alertTrack = true;
            setTimeout( () => {
                this.alertTrack = false;
            }, 4000)
            /*
                var prom = entregaStore.methods.loadEntregas(name, type, dateA, dateB, rtype);
                prom.then( (data) => {
                    this.showTable = !false;
                }).catch( e => { console.log(e); })}
            */            
        },
        started(){
            var date = new Date();
            var datestring = ('0000' + date.getFullYear()).slice(-4) + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
            this.filter = {                
                name: '',
                tb: "23:59",
                fa: datestring,
                ta: "00:01",
                fb: datestring
            }            
        }
    },
    mounted() {
        this.started();
    }
});