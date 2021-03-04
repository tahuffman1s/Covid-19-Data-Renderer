<template>
  <div id="app">
    <img id="banner" alt="banner" src="./assets/fb.png" />
    <img id="logo" alt="logo" src="./assets/logo.png" />
    <br />
    <br />
    <br />
    <my-component v-if="!detectMob()">
      <div id="infected">
        Data Date: {{ yesterday }} Infected: {{ Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Cases }} Deaths:
        {{ Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Deaths }} Recovered: {{ Counter.data.datasets.filter(x => x.label === "Counter")[0].data.Recovered }}
      </div>
    </my-component>
    <div
      id="nav"
      style="float: top-left;  position: absolute; text-decoration: none; top: 2%;padding-left: 10%;"
      v-if="!detectMob()"
    >
      <router-link
        style="text-decoration: none;"
        :to="AppDropConfig.config.options.filter(x => x.label === AppDropConfig.config.placeholder)[0].location"
      >
        <vue-dropdown :config="AppDropConfig.config" @setSelectedOption="setPage"></vue-dropdown>
      </router-link>
    </div>
    <div
      id="nav"
      v-if="detectMob()"
      style="float: right;  position: absolute; text-decoration: none; top: 2%; right: 0%;"
    >
      <router-link
        style="text-decoration: none;"
        :to="AppDropConfig.config.options.filter(x => x.label === AppDropConfig.config.placeholder)[0].location"
      >
        <vue-dropdown :config="AppDropConfig.config" @setSelectedOption="setPage"></vue-dropdown>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style src="./CSS/App.css" />

<script lang="ts" src="./typescript/App.ts" />
