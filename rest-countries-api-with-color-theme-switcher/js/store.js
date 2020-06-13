
const allCountry = localStorage.getItem("GET_ALL_COUNTRY");

const store = new Vuex.Store({
    state: {
        allCountry: allCountry ? JSON.parse(allCountry) : []
    },
    getters: {
        getAllCountry: state => state.allCountry
    },
    mutations: {
        setAllCountry(state, payload) {
            localStorage.setItem("GET_ALL_COUNTRY", JSON.stringify(payload));
            state.allCountry = payload
        }
    },
    actions: {
        fetchAllCountry(context) {
            if (!store.getters.getAllCountry.length) {
                fetch('https://restcountries.eu/rest/v2/all')
                    .then(response => response.json())
                    .then(data => {
                        context.commit('setAllCountry', data)
                        return true;
                    })
            }
        }
    }

})