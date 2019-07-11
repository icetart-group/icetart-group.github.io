Vue.component('cm-configlayer', {
    template: '#cm-configlayer-template',
    data() {
        return {
            rolStore: rolStore.data,
            capaStore: capaStore.data,
            rolSelect: '',
            disabledConfL: 'disabled'
        }
    },
    methods: {
        saveConfigLayer() {
            $('.configLLoad').show();
            var idsCapa = [];
            $('#configLayer-list tr input:checked').each(function () { idsCapa.push($(this).data('layer-index')) })
            capaStore.methods.saveCapaRol(idsCapa, this.rolSelect);
        },
        changeRol() {
            $('.configLLoad').show();
            if(this.rolSelect != ""){
                this.disabledConfL = '';
                capaStore.methods.capaRol(this.rolSelect);
            }
            else{
                this.disabledConfL = 'disabled';
                capaStore.methods.created();
            }
        }
    },
    created() {
        //rolStore.methods.created();
        if (loginStore.data.userLogged == true && loginStore.data.user.tipo_usuario == "gl_administrador"){
            rolStore.methods.created();
            capaStore.methods.created();   
        }
    }
});