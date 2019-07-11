Vue.component('cm-import', {
    template: '#cm-import-template',
    data() {
        return { 
            importStore: importStore.data,
        }
    },
    methods: {
        update() {
            this.importStore.tablas.forEach((element, index) => {
                element.status = 1;
                var importEl = importStore.methods.saveInfo(element.rest, index);
                importEl.then( (res) => {
                    if(res.success){
                        this.importStore.tablas[index].status = 2;
                    }
                    else this.importStore.tablas[index].status = 0;
                    $('.infoLLoad').hide();
                })
                .catch( e => { 
                    console.error(e);
                    this.importStore.tablas[index].status = 0;
                })
            });
        }
    }
});