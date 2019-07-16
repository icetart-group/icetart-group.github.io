//import rolStore from "../stores/rolStore"

new Vue({
    el: '#app',
    data: {
        loginStore: loginStore.data,
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
        
    },
    created() {
        this.loginStatus = "";
    }
})

Vue.filter('formatTimestamp', function (timestamp) {
    return timestamp.substr(8, 2)  + "-" + timestamp.substr(5, 2) + "-" + timestamp.substr(0, 4);
})
Vue.filter('timestampDate', function (timestamp) {
    var d = new Date(timestamp);
    var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var date = "".concat( d.getDate() ,'/', months[d.getMonth()], '/', d.getFullYear());
    return date;
})
Vue.filter('timestampTime', function (timestamp) {
    var time = new Date(timestamp).toLocaleTimeString();
    return time.substr(0,5);
})
