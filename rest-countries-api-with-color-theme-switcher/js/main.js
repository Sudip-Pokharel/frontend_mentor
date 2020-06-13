
// const Home = Vue.component('filter-list', {
//     template: `
//     <ul>
//         <li v-for="country in $store.getters.getAllCountry">
//             {{country.alpha3Code}}
//         </li>
//     </ul>
//     `,
//     created() {

//     }
// })

// const routes = [
//     { path: '/', name="home", component: Home },
// ]

// const router = new VueRouter({
//     routes
// })

Vue.component('header-top', {
    template: `
    <div class="container">
        <h1 class="title title__main">Where in the world?</h1>
        <input type="checkbox" id="themeChanger">
        <label for="themeChanger">
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
            <title>ionicons-v5-j</title>
            <path
                d='M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,119.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z'
                style='fill:none;stroke:#2B3945;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
            </svg>
            Dark Mode
        </label>
    </div>`,
})

Vue.component('country-item', {
    template: `
    <li class="country-list__item">
        <img :src="country.flag" :alt="country.name+ ' flag'">
        <article>
            <h2 class="title title__medium">{{country.name}}</h2>
            <p><span>Population:</span> {{country.population}}</p>
            <p><span>Region:</span> {{country.region}}</p>
            <p><span>Capital:</span> {{country.capital}}</p>
        </article>
    </li>
    `,
    props: ['country']
})

Vue.component('list-country-box', {
    template:
        `
        <div class="container">
            <div class="filter">
                <div class="input-box">
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <title>ionicons-v5-f</title>
                        <path d='M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z'
                        style='fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px' />
                        <line x1='338.29' y1='338.29' x2='448' y2='448'
                        style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                    </svg>
                    <input type="text" placeholder="Search for a country..." v-model="name">
                </div>
                <div class="select-box">
                    <span @click="toggleShowOption()" :class="showOption ? 'open' : '' ">
                        {{regionFilter ? regionFilter : 'Filter by Region'}}
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
                        <title>ionicons-v5-a</title>
                        <polyline points='112 184 256 328 400 184'
                            style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                        </svg>
                    </span>
                    <ul class="option-box">
                        <li @click="changeFilterOption(option)" v-for="(option,index) in options" :key="'filter__option'+index">{{option}}</li>
                    </ul>
                </div>
            </div>
            <ul class="country-list" v-if="countries.length">
                <country-item v-for="(country,index) in countries" :key="'each__country'+index" :country="country"/>
            </ul>
            <ul v-else class="empty-list">
                <li>Whoops, make sure it's an country name.</li>
            </ul>
        </div>`,
    data() {
        return {
            // countries: [],
            name: '',
            regionFilter: '',
            options: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
            showOption: false
        }
    },
    methods: {
        toggleShowOption() {
            this.showOption = !this.showOption;
        },
        changeFilterOption(name) {
            this.regionFilter = name;
            this.showOption = false;
        }
    },
    computed: {
        countries() {
            let checkName = true;
            let checkRegion = true;
            return this.$store.getters.getAllCountry.filter(country => {
                if (this.name !== '') {
                    checkName = country.name.toLowerCase().includes(this.name.toLowerCase());
                }
                if (this.regionFilter) {
                    checkRegion = country.region.toLowerCase() == this.regionFilter.toLowerCase();
                }

                return checkName && checkRegion;
            })

        }
    }
})


var app = new Vue({
    el: '#app',
    store,
    // router,
    created() {
        this.$store.dispatch('fetchAllCountry');
    }
})

