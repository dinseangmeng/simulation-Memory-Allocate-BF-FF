<script setup>
import  {ref} from 'vue'
import store from '../store';
const MemoryData=ref('')  
if(store.getters.getMemSize>0){
    store.state.memory.forEach((item)=>{
        MemoryData.value+=""+item.size+"\n"
    })
    
}
const JobData=ref('')
if(store.getters.getJobSize>0){
    
    store.state.Job.forEach((item)=>{
        JobData.value+=''+item.size+'\n'
    })
}
const updateMemory=()=> {
    store.commit('ClearMemory')
    store.commit('ToggleFirstFit',null)
    MemoryData.value.split('\n').forEach((item)=>{
        if( !isNaN(parseInt(item))){
            store.commit('addMemory',parseInt(item) | 0)
        }
    })
    
}
const updateJob=()=> {
    
    store.commit('ClearJob')
    store.commit('ToggleFirstFit',null)
    // console.log(JobData.value.split('\n'))
    JobData.value.split('\n').forEach((item)=>{
        if( !isNaN(parseInt(item))){
            store.commit('addJob',parseInt(item) | 0)
        }
    })
    
}



</script>

<template>
    <form class="form" >
        <fieldset>
            <legend>
                Input Data
                <svg @click="$store.commit('Toggle', !$store.state.isAdding)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </legend>
            <div class="InputText">
                <label for="Memory">Input Memory:</label>
                <textarea id="Memory" @change="updateMemory()" rows="10" v-model="MemoryData"></textarea>
                
            </div>
            <div class="InputText">
                <label for="Memory">Input Job:</label>
                <textarea id="Memory" rows="10" @change="updateJob()" v-model="JobData"></textarea>
                
            </div>
        </fieldset>
    </form>
    
</template>
<style scoped lang="scss">
form{
    width: 300px;
    position: absolute;
    background-color: #48cae4;
    padding: 2rem 1rem;
    right: 0;
    top: 0;
    z-index: 1000;
    fieldset{
        border: 2px solid black;
        padding: .6rem;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        legend{
            text-align: center;
            font-size: 1.7rem;
            font-family: 'Fira Sans', sans-serif;
            display: flex;
            align-items: center;
            // justify-content: space-between;
            gap: 2.5rem;
            svg{
                --size--: 1.5rem;
                cursor: pointer;
                width:var( --size--);
                height: var( --size--);
                &:hover{
                    color: red;
                    
                }
            }
        }
        .InputText{
            display: flex;
            flex-direction: column;
            gap: .8rem;
            label{
                font-size: 1.4rem;
                font-family: 'Fira Sans', sans-serif;
            }
            textarea{
                background-color: #00b4d8;
                font-family: 'Fira Sans', sans-serif;
                border: none;
                outline: none;
                border-radius: 2px;
                resize: vertical;
                font-size: 1.2rem;
            }
        }
    }
    
}
</style>