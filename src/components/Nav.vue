<script setup>
</script>

<template>
    <main>
        <nav>
            <div class="Logo">
                DIN SEANGMENG
            </div>
            <div class="Link">
                <router-link class="link" :to="{name:'home'}">Home</router-link>
                <router-link class="link" :to="{name:'about'}">about</router-link>
                <button class="toggle" @click="$store.commit('Toggle', !$store.state.isAdding)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg></button>
                </div>
                
            </nav>
        </main>
    </template>
    
    <style scoped lang="scss">
    main{
        width: 100%;
        background-color: #ade8f4;
        display: flex;
        // flex-direction: ;
        justify-content: center;
        align-items: center;
        nav{
            padding: 1rem .7rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 90%;
            @media only screen and (max-width: 600px){
                // flex-direction: column;
                justify-content: center;
            }
            .Logo{
                font-size: 2rem;
                font-family: 'Fira Sans', sans-serif;
                @media only screen and (max-width: 600px){
                    // flex-direction: column;
                    display: none;
                    // justify-content: center;
                }
            }
            .Link{
                display: flex;
                align-items: center;
                gap: 2rem;
                font-size: 1.7rem;
                font-family: 'Fira Sans', sans-serif;
                a{
                    text-decoration: none;
                    color: black;
                }
                button{
                    border: none;
                    outline: none;
                    // padding: 0;
                    background-color: transparent;
                    text-align: center;
                    cursor: pointer;
                    svg{
                        --size--: 2rem;
                        width:var( --size--);
                        height: var( --size--);
                    }
                }
            }
            
        }
    }
</style>