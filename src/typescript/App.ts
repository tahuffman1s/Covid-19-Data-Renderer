import axios from 'axios'
import { CovidApiResponse } from '../models/CovidApi'
import { ToMMDDYYYY } from '../typescript/Universal/Date'
import { SubtractDaysFromTodaysDate } from '../typescript/Universal/Date'
import Counter from '../typescript/Universal/Counter'
import VueDropdown from 'vue-dynamic-dropdown'
import AppDropConfig from './AppDropConfig'
var yesterday = ToMMDDYYYY(SubtractDaysFromTodaysDate(1), '/', false)
export default {
    data() {
        return {
            Counter: Counter,
            yesterday,
            AppDropConfig: AppDropConfig
        }
    },
    mounted() {
        axios
            .get<CovidApiResponse>('https://covidapi.info/api/v1/global')
            .then(response => {
                Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Cases = response.data.result.confirmed
                Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Deaths = response.data.result.deaths
                Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Recovered = response.data.result.recovered
            })
    },
    methods: {
        setPage(selectedOption: { value: any }) {
            AppDropConfig.config.placeholder = selectedOption.value
        },
        detectMob() {
            const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];

            return toMatch.some((toMatchItem) => {
                return navigator.userAgent.match(toMatchItem);
            });
        }
    },
    components: {
        VueDropdown
    }
}

