var defaultProject = {ownerId: null, name: '', description: '', sortCode: null};

var docs = new Vue({
    el: '#main',
    data: {
        alert: defaultAlert,
        hasLogin: false,
        user: null,
        showPart: 'projectList',
        projects: [],
        project: defaultProject,
        selectedProject: null,
        directoryTree: null
    },
    created: function () {
        const user = window.$cookies.get('user');
        const hasLogin = (user !== '' && user !== undefined && user !== null);
        const pathname = window.location.hash;
        this.user = hasLogin ? JSON.parse(user) : {id: 0, username: '', email: ''};
        this.hasLogin = hasLogin;
        if (hasLogin) {
            this.getProjectList();
        }
    },
    computed: {
        sortCodeState() {
            return this.project.sortCode > 0 ? null : 'invalid';
        }
    },
    methods: {
        logout: function () {
            deleteLoginCookie();
            window.location.href = '/login.html';
        },
        getProjectList: function () {
            Api.get('/projects/owner/' + this.user.id).then(function (result) {
                if (result.code === 200) {
                    if (result.data.length === 0) {
                        docs.showAlert('info', '项目清单为空');
                    } else {
                        docs.projects = result.data;
                    }
                } else {
                    docs.showAlert('warning', '获取项目清单失败');
                }
            }).catch(function (error) {
                docs.showAlert('danger', '获取项目清单出错');
            });
        },
        jump: function (target) {
            this.showPart = target;
        },
        countDownChanged: function (dismissCountDown) {
            this.alert.countDown = dismissCountDown;
        },
        showAlert: function (type, msg, secs) {
            this.alert.type = type;
            this.alert.msg = msg;
            this.alert.countDown = secs ? secs : this.alert.secs;
        },
        showProject: function () {
            this.jump('showProject');
            this.project = defaultAlert;
        },
        submitProject: function () {
            this.project.ownerId = this.user.id;
            Api.post('/projects', this.project).then(function (result) {
                if (result.code !== 200) {
                    docs.showAlert('warning', result.msg);
                } else {
                    docs.project = defaultProject;
                    docs.showAlert('success', '创建项目成功');
                    this.cancelProject();
                }
            }).catch(function (error) {
                docs.showAlert('danger', '创建项目出错');
            });
        },
        cancelProject: function () {
            this.jump('projectList');
        },
        selectProject: function () {
            this.jump('documents');
        },
        addChild: function () {
            alert('add root');
        }
    }
});