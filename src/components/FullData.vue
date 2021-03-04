<template>
  <div class="hello">
    <br />
    <div id="Desktop" v-if="!detectMob()">
      <h1 style="font-size:2vw;" align="center">{{ DropConfig.config.placeholder }} Data</h1>

      <div class="leftside" align="left">
        <table class="redTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmed</th>
              <th>Deaths</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            <td align="center">
              <tr v-for="(item, index) in DateArray" :key="index">{{DateArray[index]}}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in ConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data"
                :key="`A-${index}`"
              >{{ConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data[index]}}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data"
                :key="`B-${index}`"
              >{{DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data[index]}}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in RecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data"
                :key="`C-${index}`"
              >{{RecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data[index]}}</tr>
            </td>
          </tbody>
        </table>
      </div>
      <div class="rightside" align="right">
        <vue-dropdown :config="DropConfig.config" @setSelectedOption="setCountry"></vue-dropdown>

        <h2 align="center">Confirmed Cases VS. Time</h2>
        <canvas align="center" id="confirmed-chart"></canvas>
        <h2 align="center">Covid19 Deaths VS. Time</h2>
        <canvas align="center" id="death-chart"></canvas>
        <h2 align="center">Covid19 Recovered VS. Time</h2>
        <canvas align="center" id="recovered-chart"></canvas>
        <h2 align="center">Covid19 Mortality Rate VS. Time</h2>
        <canvas align="center" id="mortality-chart"></canvas>
      </div>
    </div>
    <div id="mobile" v-if="detectMob()">
      <div align="left">
        <vue-dropdown :config="DropConfigMobile.config" @setSelectedOption="setCountry"></vue-dropdown>
      </div>
      <h1 style="font-size:5vw;" align="center">{{ DropConfig.config.placeholder }} Data</h1>
      <table class="redTableMob">
        <thead>
          <tr>
            <th>Date</th>
            <th>Confirmed</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          <td align="center">
            <tr v-for="(item, index) in DateArray" :key="index">{{DateArray[index]}}</tr>
          </td>
          <td align="center">
            <tr
              v-for="(item, index) in ConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data"
              :key="`A-${index}`"
            >{{ConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data[index]}}</tr>
          </td>
          <td align="center">
            <tr
              v-for="(item, index) in DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data"
              :key="`B-${index}`"
            >{{DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data[index]}}</tr>
          </td>
          <td align="center">
            <tr
              v-for="(item, index) in RecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data"
              :key="`C-${index}`"
            >{{RecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data[index]}}</tr>
          </td>
        </tbody>
      </table>
      <h2 align="center">Confirmed Cases VS. Time</h2>
      <canvas align="center" id="confirmed-chart"></canvas>
      <h2 align="center">Covid19 Deaths VS. Time</h2>
      <canvas align="center" id="death-chart"></canvas>
      <h2 align="center">Covid19 Recovered VS. Time</h2>
      <canvas align="center" id="recovered-chart"></canvas>
      <h2 align="center">Covid19 Mortality Rate VS. Time</h2>
      <canvas align="center" id="mortality-chart"></canvas>
    </div>
  </div>
</template>

<script src=//unpkg.com/vue></script>
<script src=//unpkg.com/vuetrend></script>
<script lang="ts">
import { IncrimentalDateArray } from '../typescript/Universal/Date'
import { CalculateDifferenceBetweenDates } from '../typescript/Universal/Date'
import { GetTodaysDate } from '../typescript/Universal/Date'
import { LoadCasesByDate } from '../typescript/Universal/DataLoader'
import { LoadDeathsByDate } from '../typescript/Universal/DataLoader'
import { LoadRecoveredByDate } from '../typescript/Universal/DataLoader'
import ConfirmedData from './typescript/confirmedData'
import DeathData from './typescript/deathData'
import RecoveredData from './typescript/recoveredData'
import VueDropdown from 'vue-dynamic-dropdown'
import DropConfig from './typescript/DropConfig'
import Chart from 'chart.js'
import { IncrimentalMortalityArray } from '../typescript/Universal/DataLoader'
import mortalityData from './typescript/mortalityData'
import DropConfigMobile from './typescript/DropConfigMobile'

var StartDate = new Date()
StartDate.setMonth(0)
StartDate.setDate(21)
StartDate.setFullYear(2020)
var today = GetTodaysDate()
today.setDate(today.getDate() - 1)
var number = CalculateDifferenceBetweenDates(today, StartDate)
var DateArray = IncrimentalDateArray(number, StartDate)
var c1: any
var c2: any
var c3: any
var c4: any
var mortalityarray

export const FullData = {
  name: 'FullData',
  data() {
    return {
      ConfirmedData: ConfirmedData,
      DeathData: DeathData,
      RecoveredData: RecoveredData,
      DateArray,
      DropConfig: DropConfig,
      mortalityData: mortalityData,
      DropConfigMobile: DropConfigMobile
    }
  },
  async mounted() {
    ConfirmedData.data.labels = []
    DeathData.data.labels = []
    RecoveredData.data.labels = []
    mortalityData.data.labels = []
    ConfirmedData.data.labels = DateArray
    DeathData.data.labels = DateArray
    RecoveredData.data.labels = DateArray
    mortalityData.data.labels = DateArray
    ConfirmedData.data.datasets.filter(
      x => x.label === 'Confirmed Cases'
    )[0].data = []
    DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data = []
    RecoveredData.data.datasets.filter(
      x => x.label === 'Recovered'
    )[0].data = []
    ConfirmedData.data.datasets.filter(
      x => x.label === 'Confirmed Cases'
    )[0].data = await LoadCasesByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      DateArray
    )
    DeathData.data.datasets.filter(
      x => x.label === 'Deaths'
    )[0].data = await LoadDeathsByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      DateArray
    )
    RecoveredData.data.datasets.filter(
      x => x.label === 'Recovered'
    )[0].data = await LoadRecoveredByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      DateArray
    )
    mortalityarray = IncrimentalMortalityArray(
      DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data,
      ConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0]
        .data
    )
    mortalityData.data.datasets.filter(
      x => x.label === 'Mortality'
    )[0].data = mortalityarray

    c1 = new Chart('confirmed-chart', ConfirmedData)
    c2 = new Chart('death-chart', DeathData)
    c3 = new Chart('recovered-chart', RecoveredData)
    c4 = new Chart('mortality-chart', mortalityData)
  },
  methods: {
    setCountry(selectedOption: { value: string }) {
      DropConfig.config.placeholder = selectedOption.value
      DropConfigMobile.config.placeholder = selectedOption.value
      this.mountthis()
    },
    async mountthis() {
      ConfirmedData.data.labels = []
      DeathData.data.labels = []
      RecoveredData.data.labels = []
      mortalityData.data.labels = []
      ConfirmedData.data.labels = DateArray
      DeathData.data.labels = DateArray
      RecoveredData.data.labels = DateArray
      mortalityData.data.labels = DateArray
      ConfirmedData.data.datasets.filter(
        x => x.label === 'Confirmed Cases'
      )[0].data = []
      DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data = []
      RecoveredData.data.datasets.filter(
        x => x.label === 'Recovered'
      )[0].data = []
      ConfirmedData.data.datasets.filter(
        x => x.label === 'Confirmed Cases'
      )[0].data = await LoadCasesByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        DateArray
      )
      DeathData.data.datasets.filter(
        x => x.label === 'Deaths'
      )[0].data = await LoadDeathsByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        DateArray
      )
      RecoveredData.data.datasets.filter(
        x => x.label === 'Recovered'
      )[0].data = await LoadRecoveredByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        DateArray
      )
      mortalityarray = IncrimentalMortalityArray(
        DeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data,
        ConfirmedData.data.datasets.filter(
          x => x.label === 'Confirmed Cases'
        )[0].data
      )
      mortalityData.data.datasets.filter(
        x => x.label === 'Mortality'
      )[0].data = mortalityarray

      c1.data = ConfirmedData.data
      c1.update()
      c2.data = DeathData.data
      c2.update()
      c3.data = RecoveredData.data
      c3.update()
      c4.data = mortalityData.data
      c4.update()
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
      ]

      return toMatch.some(toMatchItem => {
        return navigator.userAgent.match(toMatchItem)
      })
    }
  },
  components: {
    VueDropdown
  }
}

export default FullData
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./CSS/main.css" />
