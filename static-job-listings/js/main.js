Vue.component('filter-item', {
    template: '<li>This is a filter item</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        return() {
            jobs: []
        }
    },
    methods: {
        getJobData() {
            fetch('../data.json')
                .then(res => res.json())
                .then(data => {
                    this.jobs = data
                })
                .catch(err => console.error(err));
        }
    },
    created() {
        this.getJobData();
    }
})

