
Vue.component('header-top', {
    name: 'HeaderTop',
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
    name: 'EachCountry',
    template: `
    <router-link tag="li" class="country-list__item" :to="'/country/'+country.alpha3Code">
        <img :src="country.flag" :alt="country.name+ ' flag'">
        <article>
            <h2 class="title title__medium">{{country.name}}</h2>
            <p><span>Population:</span> {{country.population}}</p>
            <p><span>Region:</span> {{country.region}}</p>
            <p><span>Capital:</span> {{country.capital}}</p>
        </article>
    </router-link>
    `,
    props: ['country']
})

const Details = Vue.component('view-details', {
    name: 'DetailView',
    template: `
    <div class="details">
        <div class="container">
            <a href="#" @click="$router.go(-1)" class="btn btn__primary back">
                <svg id="Layer" enable-background="new 0 0 64 64" height="24" viewBox="0 0 64 64" width="33"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" />
                </svg>
                Back
            </a>

            <div class="details__country" :key="'detail__wrapper'+unique_key">
                <div class="image">
                    <img :src="data.flag" :alt="data.name+' Flag'">
                </div>
                <div class="description">
                <h3 class="title title__medium">{{data.name}}</h3>
                <div class="content">
                    <div>
                    <p>Native Name: <span>{{data.nativeName}}</span> </p>
                    <p>Population: <span>{{data.population}}</span> </p>
                    <p>Region: <span>{{data.region}}</span> </p>
                    <p>Sub Region: <span>{{data.subregion}}</span> </p>
                    <p>Capital: <span>{{data.capital}}</span> </p>
                    </div>
                    <div>
                    <p>Top Level Domain: <span>{{getTopLevelDomain()}}</span> </p>
                    <p>Currencies: <span>{{getCurrencies()}}</span> </p>
                    <p>Languages <span>{{getLanguages()}}</span> </p>
                    </div>
                </div>
                <div class="border">
                    <p> Border Countries: </p>
                    <div class="btn-box">
                    <router-link class="btn btn__primary" @click="unique_key+=1"  v-for="(border,index) in data.borders" :key="'border__country'+index" :to="{name:'detail_view',params:{alpha:border}}">{{border}}</router-link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            data: {},
            unique_key: 0
        }
    },
    methods: {
        getTopLevelDomain() {
        },
        getCurrencies() {

        },
        getLanguages() {

        }
    },
    created() {
        let foundCountry = this.$store.getters.getAllCountry.find(country => country.alpha3Code == this.$route.params.alpha)
        if (foundCountry) {
            this.data = foundCountry
        }
        else {
            this.$router.push({ name: 'home' })
        }
    }
})

const Home = Vue.component('list-country-box', {
    name: 'ListCountry',
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

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/country/:alpha', name: 'detail_view', component: Details }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

var app = new Vue({
    name: "Main",
    el: '#app',
    store,
    router,
    created() {
        this.$store.dispatch('fetchAllCountry');
    }
})

