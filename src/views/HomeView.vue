<script setup>
import {ref} from 'vue'
import MemoryVue from "../components/Memory.vue"
import JobVue from "../components/Job.vue";
import FirstFitVue from "../components/FirstFit.vue";
import BestFitVue from '../components/BestFit.vue';
import InputVue from '../components/Input.vue';
import store from '../store';
// console.log(base())
// import {ref} from 'vue' 
const useFirstFit=ref(null)
</script>

<template>
  <main>
    <div>
      <MemoryVue v-if="$store.state.memory!=null && $store.getters.getMemSize>0" />
      <JobVue v-if="$store.state.Job!=null && $store.getters.getJobSize>0"/>

      <div >
        <h1 v-if="$store.getters.getJobSize<=0">Invalid JOB</h1>
        <h1 v-if="$store.getters.getMemSize<=0">Invalid Memory</h1>
      </div>
      <div v-if="$store.getters.getMemSize>0 && $store.getters.getJobSize>0" id="Option"> 
        <div class="arrow" v-if="$store.getters.getMemSize>0 && $store.getters.getJobSize>0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
        <button @click="$store.commit('ToggleFirstFit',true)">First Fit</button>
        <button @click="$store.commit('ToggleFirstFit',false)">Best Fit</button>
      </div>
      <FirstFitVue v-if="$store.state.useFirstFit && $store.state.useFirstFit!=null && $store.getters.getMemSize>0 && $store.getters.getJobSize>0" />
      <BestFitVue v-if="!$store.state.useFirstFit && $store.state.useFirstFit!=null && $store.getters.getMemSize>0 && $store.getters.getJobSize>0"/>
      <InputVue v-if="$store.state.isAdding"/>
    </div>
    
  </main>
</template>

<style scoped lang="scss">
main{
  width: 100%;
  display: flex;
  justify-content: center;
  div{
    padding: 1.7rem 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    align-items: flex-start;
    @media only screen and (max-width: 600px){
      // flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    #Option{
      display: flex;
      justify-content: center;
      height: 500px;
      flex-direction: column;
      gap: .7rem;
      button{
        padding: .5rem 1.3rem;
        border: none;
        cursor: pointer;
        border-radius: 3px;
        outline: none;
        background: #0077b6;
        color: white;
        font-family: 'Fira Sans', sans-serif;
        font-size: 1.3rem;
      }
      .arrow{
      height: 80vh;
      display: flex;
      align-items: center;
      // font-size: 1;
      svg{
        --size--: 4rem;
        width:var( --size--);
        height: var( --size--);
        // aspect-ratio: 1/1;
        @media only screen and (max-width: 600px){
          // flex-direction: column;
          rotate: 90deg;
        }
      }
    }
    }

  }
}
</style>