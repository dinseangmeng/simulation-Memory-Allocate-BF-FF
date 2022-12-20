<script setup>
// import { json } from 'stream/consumers';
// import { start } from 'repl';
import {ref} from 'vue'
import store from '../store';
let Job =store.state.Job;
let memory =store.state.memory;
let memoryAvailable=[]
let newObj=[]
let isFinded=false
let JobNotAllocat=[];
let TmpObj=[]
let MemoryNotAllocat=[];
const Base=ref(store.state.Base)
const intToString=(num)=>{
    return num/1000 + "K";
}
const Processing=ref(null)
const Call=()=>{
    Processing.value=true
    Job.forEach((JobItem)=>{
        isFinded=false
        memory.forEach((MemoryItem)=>{
            if(JobItem.size<=MemoryItem.size && !memoryAvailable.includes(MemoryItem.address) && !isFinded ){
                newObj.push({
                    JobItem,
                    MemoryItem,
                })
                memoryAvailable.push(MemoryItem.address)
                isFinded=true
                // break;
            }
        })
        if(!isFinded){
            JobNotAllocat.push(JobItem)
        }
    })
    memory.forEach((item)=>{
        if(!memoryAvailable.includes(item.address)){
            MemoryNotAllocat.push(item)
        }
    })
    MemoryNotAllocat.forEach((MemoryItem)=>{
        // console.log(store.getters.FindMemoryIndex(MemoryItem.address))
        newObj.splice(store.getters.FindMemoryIndex(MemoryItem.address),0,{MemoryItem})
    })
    newObj.forEach((item)=>{
        TmpObj[store.getters.FindMemoryIndex(item.MemoryItem.address)]=item;
    })
    // console.log(TmpObj)
    newObj=TmpObj
    Processing.value=false;
}
Call()
// console.log(MemoryNotAllocat)
// console.log(newObj)

</script>

<template>
    <div>
        <svg v-if="Processing" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise rotate" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <table style="margin-right: 2rem;">
            <tr>
                <th>Output First Fit</th>
            </tr>
            <tr v-for="item in newObj">
                <td  class="outside" :style="{'--Item-size-Main--':item.MemoryItem.size, '--base-Main--':Base,'--background-Main--':item.MemoryItem.color}">
                    <table width="100%" v-if="item.JobItem">
                        <tr>
                            <td  class="inside" :style="{'--Item-size--':item.JobItem.size, '--base--':Base,'--background--':item.JobItem.color}">
                                {{intToString(item.JobItem.size) }}</td>
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
                <tr v-for="item in JobNotAllocat">
                    <td :style="{'--Item-size-Main--':item.size, '--base-Main--':Base,'--background-Main--':item.color}" :title="'Address:'+item.address">{{ intToString(item.size) }} </td>
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
    th{
        font-size: 2rem;
        font-family: 'Fira Sans', sans-serif;
        
    }
    table{
        width: 100% !important;
        @media only screen and (max-width: 600px){
            margin: 0 !important;
        }
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