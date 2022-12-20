import { createStore } from 'vuex'
import uniqid from 'uniqid';
import lengBlock from '../util/lengBlock'
import colorRand from '../util/colorRan'
// var MAX=500;
// Create a new store instance.
const store = createStore({
  state :{
    MAX:500,
    useFirstFit:null,
    Base:0,
    isAdding:false,
    memory:[
        {
            address:1,
            size:15000,
            color:'#6F24D6'
        },
        
        {
            address:2,
            size:20000,
            color:'#9473BA'
        },
        {
            address:3,
            size:13000,
            color:'#91FE74'
        },
        {
            address:4,
            size:1000,
            color:'#4243DA'
        }, 


    ],
    Job:[
        {
            address:1,
            size:12000,
            color:'#C3F434'
        },
        {
            address:2,
            size:180000,
            color:'#CBE138'
        },
        {
            address:4,
            size:12000,
            color:'#B9E782'
        },
        {
            address:3,
            size:1000,
            color:'#BC88FF'
        },
    ],
    
  },
  mutations: {
    UpdateBase (state,base){
        state.Base=base;
    },
    generateBase:(state)=>{
        if(lengBlock(state.memory)>=lengBlock(state.Job)){
            let sum=0;
            store.state.memory.forEach((item)=>{
              sum+=item.size;
            })
            state.Base=state.MAX/sum;
        }else{
            let sum=0;
            store.state.Job.forEach((item)=>{
              sum+=item.size;
            })
            state.Base=state.MAX/sum;
        }
    },
    addMemory(state,Size){
        state.memory.push({
            address:uniqid(),
            size:Size,
            color:colorRand(),
        })
        if(lengBlock(state.memory)>=lengBlock(state.Job)){
            let sum=0;
            store.state.memory.forEach((item)=>{
              sum+=item.size;
            })
            console.log(sum)
            state.Base=state.MAX/sum;
        }else{
            let sum=0;
            store.state.Job.forEach((item)=>{
              sum+=item.size;
            })
            state.Base=state.MAX/sum;
        }
    },
    addJob(state,Size){
        state.Job.push({
            address:uniqid(),
            size:Size,
            color:colorRand(),
        })
        if(lengBlock(state.memory)>=lengBlock(state.Job)){
            let sum=0;
            store.state.memory.forEach((item)=>{
              sum+=item.size;
            })
            console.log(sum)
            state.Base=state.MAX/sum;
        }else{
            let sum=0;
            store.state.Job.forEach((item)=>{
              sum+=item.size;
            })
            state.Base=state.MAX/sum;
        }
    },
    ClearJob(state){
      state.Job=[]
    },
    ClearMemory(state){
      state.memory=[]
    },
    Toggle(state,value){
      state.isAdding=value
    },
    ToggleFirstFit(state,value){
      state.useFirstFit=value
    }

  },
  getters:{
    FindMemoryIndex:(state) =>(address)=>{
        // console.log(address)
        return state.memory.findIndex((item)=>item.address==address)
    },
    getJobSize(state){
        return state.Job.length
    },
    getMemSize(state){
        return state.memory.length
    }
    
    
  }
})
export default store;