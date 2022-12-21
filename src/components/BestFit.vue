<script setup>
// import { json } from 'stream/consumers';
import {ref} from 'vue'
import store from '../store';
let Job =store.state.Job;
let memory =store.state.memory;
let memoryNotAvailable=[]
let newObj=[]
let isFinded=false
let JobNotAllocat=[];
let TmpObj=[]
let MemoryNotAllocat=[];
let MemoryAllocateCase=[]
const intToString=(num)=>{
    return num>=1000?num/1000 + "K":num;
}
const Processing=ref(null)
const Call=()=>{
    Processing.value=true
    const FindMinItem=(Memory)=>{
        let Min=Memory[0];
        for(let i=0;i<Memory.length;i++){
            if(Min.size>Memory[i].size){
                Min=Memory[i];
            }
        }
        return Min
    }
    Job.forEach((JobItem)=>{
        isFinded=false
        MemoryAllocateCase.splice(0,MemoryAllocateCase.length)
        memory.forEach((MemoryItem)=>{
            if(JobItem.size<=MemoryItem.size && !memoryNotAvailable.includes(MemoryItem.address) ){
                isFinded=true
                MemoryAllocateCase.push(MemoryItem)
            }
        })
        if(!isFinded){
            JobNotAllocat.push(JobItem)
        }else{
            let MemoryItem=FindMinItem(MemoryAllocateCase);
            if(MemoryItem!=undefined || MemoryItem!=null){
                newObj.push({
                    JobItem,
                    MemoryItem,
                })
                // console.log(MemoryItem)
                memoryNotAvailable.push(MemoryItem.address)
            }
        }
    })
    if(MemoryAllocateCase.length>0){
        memory.forEach((item)=>{
            if(!memoryNotAvailable.includes(item.address)){
                MemoryNotAllocat.push(item)
            }
        })
        MemoryNotAllocat.forEach((MemoryItem)=>{
            newObj.splice(store.getters.FindMemoryIndex(MemoryItem.address),0,{MemoryItem})
        })
    }
    
    newObj.forEach((item)=>{
        TmpObj[store.getters.FindMemoryIndex(item.MemoryItem.address)]=item;
    })
    // console.log(TmpObj)
    newObj=TmpObj
    Processing.value=false
}

Call()

</script>

<template>
    <div >
        <svg v-if="Processing" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise rotate" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <table style="margin-right: 2rem;">
            <tr>
                <th>Output Best Fit</th>
            </tr>
            <tr v-for="item in newObj">
                <td  class="outside" :style="{'--Item-size-Main--':item.MemoryItem.size, '--base-Main--':$store.state.Base,'--background-Main--':item.MemoryItem.color}">
                    <table width="100%" v-if="item.JobItem">
                        <tr>
                            <td  class="inside" :style="{'--Item-size--':item.JobItem.size, '--base--':$store.state.Base,'--background--':item.JobItem.color}">
                                {{intToString(item.JobItem.size) }}
                                
                            </td>
                        </tr>
                    </table>
                    <span v-if="item.JobItem">
                        {{intToString(item.MemoryItem.size - item.JobItem.size) }}
                        left
                        
                    </span>
                    <span v-else>
                        {{intToString(item.MemoryItem.size ) }}
                        left    
                        
                    </span>
                </td>
            </tr>
        </table>
        
        <table v-if="JobNotAllocat.length>0">
            <tr>
                <th style="color:red;">Job Not Allocate</th>
            </tr>
            <tr v-for="item in JobNotAllocat" >
                <td :style="{'--Item-size-Main--':item.size, '--base-Main--':$store.state.Base,'--background-Main--':item.color}" :title="'Address:'+item.address">{{ intToString(item.size) }} </td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
div{
    width: 100%;
    display: flex;
}
.rotate{
    animation: rotate 1.5s linear infinite; 
}
@keyframes rotate{
    to{ transform: rotate(360deg); }
}
table{
    // width: 100% !important;
    @media only screen and (max-width: 600px){
        margin: 0 !important;
    }
}
th{
    font-size: 2rem;
    font-family: 'Fira Sans', sans-serif;
}
td{
    text-align: center;
    height: calc(var(--Item-size-Main-- ) * var( --base-Main--)*1px )  ;
    border: 3px solid black;
    background-color: var(--background-Main--);
    
}
// table{
    //     border: 2px solid black;
    // }
    .outside{
        text-align: center;
        height: calc(var(--Item-size-Main-- ) * var( --base-Main--)*1px )  ;
        border: 3px solid black;
        background-color: var(--background-Main--);
        
    }
    .inside{
        width: 100%;
        text-align: center;
        height: calc(var(--Item-size-- ) * var( --base--)*1px )  ;
        border: 3px solid black;
        background-color: var(--background--);
    }
    
</style>