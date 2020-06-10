Vue.component('filter-item', {
    template: '<li>This is a filter item</li>'
})

Vue.component('list-item', {
    template: `
    <li :class="job.featured ? 'job-list__item featured' : 'job-list__item'">
        <div class="details">
        <img :src="job.logo" :alt="job.company+' Logo'">
        <div class="details__content">
            <div class="header">
                <span class="title title__small company">{{job.company}}</span>
                <span class="new" v-if="job.new">New!</span>
                <span class="featured" v-if="job.featured">Featured</span>
            </div>
            <h2 class="title title__medium">{{job.position}}</h2>
            <div class="status">
                <span class="postedAt">{{job.postedAt}}</span>
                <span class="contract">{{job.contract}}</span>
                <span class="location">{{job.location}}</span>
            </div>
        </div>
        </div>
        <ul class="categories">
            <li><a href="#" @click.prevent="$emit('filter-role',job.role)">{{job.role}}</a></li>
            <li><a href="#" @click.prevent="$emit('filter-level',job.level)">{{job.level}}</a></li>
            <li v-for="(language,index) in job.languages" :key="'language-box'+index">
                <a href="#">{{language}}</a>
            </li>
            <li v-for="(tool,index) in job.tools" :key="'tool-box'+index">
                <a href="#">{{tool}}</a>
            </li>
        </ul>
    </li>
    `,
    props: ['job']
})

var app = new Vue({
    el: '#app',
    data() {
        return {
            jobs: [],
        }
    },
    methods: {
        roleFilter(data) {
            this.jobs = this.jobs.filter(job => job.role == data);
        },
        levelFilter(data) {
            this.jobs = this.jobs.filter(job => job.level == data);
        },
        getJobData() {
            fetch('../data.json')
                .then(res => res.json())
                .then(data => {
                    this.jobs = data;
                })
                .catch(err => console.error(err));
        }
    },
    created() {
        this.getJobData();
    }
})

