<template>
  <div class="hello">
    <div id="Desktop" v-if="!detectMob()">
      <br />
      <h1
        style="font-size:2vw;"
        align="center"
      >{{ DropConfig.config.placeholder }} Seven Day Summary</h1>
      <div align="right">
        <vue-dropdown :config="DropConfig.config" @setSelectedOption="setCountry"></vue-dropdown>
      </div>

      <div class="leftside" style="padding-top: 22px;">
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
              <tr v-for="(item, index) in SummaryArray" :key="index">{{ SummaryArray[index]}}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data"
                :key="`A-${index}`"
              >{{ SevenDayConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data[index] }}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayDeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data"
                :key="`B-${index}`"
              >{{ SevenDayDeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data[index] }}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayRecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data"
                :key="`C-${index}`"
              >{{ SevenDayRecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data[index] }}</tr>
            </td>
          </tbody>
        </table>
      </div>
      <div class="rightside" style="width: 50%;">
        <h2 align="center">Confirmed Cases VS. Time</h2>
        <canvas id="7confirmed-chart"></canvas>
      </div>
      <div class="leftside" style="padding-top: 10.8%;">
        <h2 align="center">Confirmed Deaths VS. Time</h2>
        <canvas id="7death-chart"></canvas>
      </div>
      <div class="rightside">
        <h2 align="center">Confirmed Recovered VS. Time</h2>
        <canvas id="7recovered-chart"></canvas>
      </div>
    </div>
    <div id="Mobile" v-if="detectMob()">
      <div class="hello">
        <br />
        <div align="left">
          <vue-dropdown :config="DropConfigMobile.config" @setSelectedOption="setCountry"></vue-dropdown>
        </div>
        <h1
          style="font-size:5vw;"
          align="center"
        >{{ DropConfig.config.placeholder }} Seven Day Summary</h1>
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
              <tr v-for="(item, index) in SummaryArray" :key="index">{{ SummaryArray[index]}}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data"
                :key="`A-${index}`"
              >{{ SevenDayConfirmedData.data.datasets.filter(x => x.label === 'Confirmed Cases')[0].data[index] }}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayDeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data"
                :key="`B-${index}`"
              >{{ SevenDayDeathData.data.datasets.filter(x => x.label === 'Deaths')[0].data[index] }}</tr>
            </td>
            <td align="center">
              <tr
                v-for="(item, index) in SevenDayRecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data"
                :key="`C-${index}`"
              >{{ SevenDayRecoveredData.data.datasets.filter(x => x.label === 'Recovered')[0].data[index] }}</tr>
            </td>
          </tbody>
        </table>
        <h2 align="center">Confirmed Cases VS. Time</h2>
        <canvas id="7confirmed-chart"></canvas>
        <h2 align="center">Confirmed Deaths VS. Time</h2>
        <canvas id="7death-chart"></canvas>
        <h2 align="center">Confirmed Recovered VS. Time</h2>
        <canvas id="7recovered-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script src=//unpkg.com/vue></script>
<script src=//unpkg.com/vuetrend></script>
<script lang="ts">
import { IncrimentalDateArray } from '../typescript/Universal/Date'
import { GetTodaysDate } from '../typescript/Universal/Date'
import { LoadCasesByDate } from '../typescript/Universal/DataLoader'
import { LoadDeathsByDate } from '../typescript/Universal/DataLoader'
import { LoadRecoveredByDate } from '../typescript/Universal/DataLoader'
import SevenDayConfirmedData from './typescript/7DayConfirmed'
import SevenDayDeathData from './typescript/7DayDeaths'
import SevenDayRecoveredData from './typescript/7DayRecovered'
import VueDropdown from 'vue-dynamic-dropdown'
import DropConfig from './typescript/DropConfig'
import DropConfigMobile from './typescript/DropConfigMobile'
import Chart from 'chart.js'

var seven = GetTodaysDate()
seven.setDate(seven.getDate() - 8)
var SummaryArray = IncrimentalDateArray(7, seven)
var c1: any
var c2: any
var c3: any

export default {
  name: 'mainpage',
  data: function() {
    return {
      SevenDayConfirmedData: SevenDayConfirmedData,
      SevenDayDeathData: SevenDayDeathData,
      SevenDayRecoveredData: SevenDayRecoveredData,
      SummaryArray,
      DropConfig: DropConfig,
      DropConfigMobile: DropConfigMobile
    }
  },
  async mounted() {
    SevenDayConfirmedData.data.labels = []
    SevenDayDeathData.data.labels = []
    SevenDayRecoveredData.data.labels = []
    SevenDayConfirmedData.data.labels = SummaryArray
    SevenDayDeathData.data.labels = SummaryArray
    SevenDayRecoveredData.data.labels = SummaryArray
    SevenDayConfirmedData.data.datasets.filter(
      x => x.label === 'Confirmed Cases'
    )[0].data = []
    SevenDayDeathData.data.datasets.filter(
      x => x.label === 'Deaths'
    )[0].data = []
    SevenDayRecoveredData.data.datasets.filter(
      x => x.label === 'Recovered'
    )[0].data = []
    SevenDayConfirmedData.data.datasets.filter(
      x => x.label === 'Confirmed Cases'
    )[0].data = await LoadCasesByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      SummaryArray
    )
    SevenDayDeathData.data.datasets.filter(
      x => x.label === 'Deaths'
    )[0].data = await LoadDeathsByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      SummaryArray
    )
    SevenDayRecoveredData.data.datasets.filter(
      x => x.label === 'Recovered'
    )[0].data = await LoadRecoveredByDate(
      'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
      SummaryArray
    )
    c1 = new Chart('7confirmed-chart', SevenDayConfirmedData)
    c2 = new Chart('7death-chart', SevenDayDeathData)
    c3 = new Chart('7recovered-chart', SevenDayRecoveredData)
  },
  methods: {
    setCountry(selectedOption: { value: any }, mobile: boolean) {
      DropConfig.config.placeholder = selectedOption.value
      DropConfigMobile.config.placeholder = selectedOption.value
      this.mountthis()
    },
    async mountthis() {
      SevenDayConfirmedData.data.labels = []
      SevenDayDeathData.data.labels = []
      SevenDayRecoveredData.data.labels = []
      SevenDayConfirmedData.data.labels = SummaryArray
      SevenDayDeathData.data.labels = SummaryArray
      SevenDayRecoveredData.data.labels = SummaryArray
      SevenDayConfirmedData.data.datasets.filter(
        x => x.label === 'Confirmed Cases'
      )[0].data = []
      SevenDayDeathData.data.datasets.filter(
        x => x.label === 'Deaths'
      )[0].data = []
      SevenDayRecoveredData.data.datasets.filter(
        x => x.label === 'Recovered'
      )[0].data = []
      SevenDayConfirmedData.data.datasets.filter(
        x => x.label === 'Confirmed Cases'
      )[0].data = await LoadCasesByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        SummaryArray
      )
      SevenDayDeathData.data.datasets.filter(
        x => x.label === 'Deaths'
      )[0].data = await LoadDeathsByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        SummaryArray
      )
      SevenDayRecoveredData.data.datasets.filter(
        x => x.label === 'Recovered'
      )[0].data = await LoadRecoveredByDate(
        'https://covidapi.info/api/v1/country/' + DropConfig.config.placeholder,
        SummaryArray
      )
      c1.data = SevenDayConfirmedData.data
      c1.update()
      c2.data = SevenDayDeathData.data
      c2.update()
      c3.data = SevenDayRecoveredData.data
      c3.update()
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./CSS/main.css" />
