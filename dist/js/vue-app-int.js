//import rolStore from "../stores/rolStore"

new Vue({
    el: '#app',
    data: {
        loginStore: loginStore.data,
        infoLayerStore: infoLayerStore.data,
        username: '',
        userpassword: '',
        loginStatus: ''
    },
    methods: {
        login() {
            //loginStore.data.userLogged = true;
            this.loginStatus = "";
            var logPromise = loginStore.methods.login(this.username, this.userpassword);
            logPromise.then( (data) => {
                if(data.Result == "OK")
                    this.loginStore.userLogged = true;
            })
            .catch( e => { this.loginStatus = e; })
        },
        showLogin(){
            this.loginStore.userLogged = false;
        },
        logout() {
            //loginStore.data.userLogged = false;
            location.reload();
        }
    },
    computed: {
        inf_fotos(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'foto';
            })
        },
        inf_videos(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'video';
            })
        },
        inf_mapas(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'mapa';
            })
        },
        inf_graficos(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'grafico';
            })
        },
        inf_docs(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'documento';
            })
        },
        inf_infografias(){
            return this.infoLayerStore.infos.filter(el =>{
                return el.tipo == 'infografia';
            })
        }
    },
    created() {
        this.loginStatus = "";
    }
})