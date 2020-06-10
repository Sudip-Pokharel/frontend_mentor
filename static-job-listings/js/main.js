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
                <a href="#" @click.prevent="$emit('filter-languages',language)">{{language}}</a>
            </li>
            <li v-for="(tool,index) in job.tools" :key="'tool-box'+index">
                <a href="#" @click.prevent="$emit('filter-tools',tool)">{{tool}}</a>
            </li>
        </ul>
    </li>
    `,
    props: ['job']
})

Vue.component('filter-list', {
    template: `
    <li>
        {{option}}
        <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path fill="#FFF" fill-rule="evenodd"
            d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
        </svg>
        </a>
    </li>
    `,
    props: ['option']
})

var app = new Vue({
    el: '#app',
    data() {
        return {
            jobs: [],
            filter: {
                role: '',
                level: '',
                languages: [],
                tools: []
            },
            filterOption: false,
            unique_key: 0
        }
    },
    methods: {
        roleFilter(data) {
            this.filter.role = data;
        },
        levelFilter(data) {
            this.filter.level = data;
        },
        languagesFilter(data) {
            this.filter.languages.push(data);
        },
        toolsFilter(data) {
            this.filter.tools.push(data);
        },
        clearFilter() {
            this.filter = {
                role: '',
                level: '',
                languages: [],
                tools: []
            }
        },
        getJobData() {
            fetch('../data.json')
                .then(res => res.json())
                .then(data => {
                    this.jobs = data;
                })
                .catch(err => console.error(err));
        },

    },
    created() {
        this.getJobData();
    },
    computed: {
        getFilteredJob() {
            let checkRole = true;
            let checkLevel = true;
            let checkLanguages = true;
            let checkTools = true;
            this.filterOption = false;
            return this.jobs.filter(job => {
                if (this.filter.role) {
                    this.filterOption = true;
                    checkRole = job.role == this.filter.role;
                }
                if (this.filter.level) {
                    this.filterOption = true;
                    checkLevel = job.level == this.filter.level
                }
                if (this.filter.languages.length) {
                    this.filterOption = true;
                    if (job.languages) {
                        let languageMatchCount = 0;
                        job.languages.forEach(langJob => {

                            this.filter.languages.forEach(langFilter => {
                                if (langJob == langFilter) {
                                    languageMatchCount++;
                                }
                            })

                        })
                        checkLanguages = languageMatchCount == this.filter.languages.length;
                    }
                    else {
                        checkLanguages = false;
                    }
                }
                if (this.filter.tools.length) {
                    this.filterOption = true;
                    if (job.tools) {
                        let toolMatchCount = 0;
                        job.tools.forEach(toolJob => {
                            this.filter.tools.forEach(toolFilter => {
                                if (toolJob == toolFilter) {
                                    toolMatchCount++;
                                }
                            })

                        })
                        checkTools = toolMatchCount == this.filter.tools.length;
                    }
                    else {
                        checkTools = false;
                    }
                }

                return checkRole && checkLevel && checkLanguages && checkTools;
            })
        }
    }
})

