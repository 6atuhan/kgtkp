<template>

<h1 @click="goHome" class="text-5xl cursor-pointer  select-none text-center font-extrabold leading-10 text-white my-16 sm:my-16 text-outline md:fixed md:top-2 md:left-2 md:my-0 ">K G T K P</h1>


        <div class="md:mt-16 text-5xl select-none text-center font-extrabold leading-10 text-white"><p class="after:content-['kg'] after:text-xs after:text-gray-400 ">{{currentWeight.weight}}</p> </div>

    <div class="flex items-center flex-col justify-center my-16">

        <form @submit.prevent="addWeight"  >
            
            <input type="number" step="0.01" v-model="weightInput" placeholder="......kg" class="outline-none bg-zinc-900 text-pink-500  text-3xl border-2 border-pink-500 rounded-l-full text-center  w-40 h-16  " />
            <input type="submit" value="kaydet" class="text-pink-500 text-center text-3xl  border-2 font-extrabold border-pink-500 rounded-r-full cursor-pointer hover:bg-pink-500 hover:text-zinc-900 transition-all w-40 h-16"/>
        </form>
    </div>
    <div v-if="weights && weights.length>0" class="text-white">
        <h1 class="text-center">Son 7 kilo kayıt.</h1>
        <div class="canvas-box md:w-2/3 m-auto ">
            <canvas ref="weightChartEl"></canvas>
        </div>
        <div>
            <h1 class="font-bold border-b-2 border-pink-500 mt-4 text-center">Geçmiş kayıtlı kilolar.</h1>
            <div class="w-full h-40  overflow-auto">
                <ul>
                <li v-for="weight,index in weights" :key="weight" class="flex justify-between px-10 sm:px-10 md:px-52 py-3 even:bg-zinc-800 ">
                    <div class="flex gap-4">
                        <h1 @click="deleteWeight(weight.id)" class="w-8 h-8 text-center border-red-600 border-2 cursor-pointer hover:bg-red-900 transition-all">X</h1>
                        <span class="opacity-50">#{{index+1}}</span>
                    </div>                    
                    <span class="font-extrabold">{{weight.weight}} kg </span>
                    <span>{{new Date(weight.date).toLocaleDateString() }}</span>
                </li>
            </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
    import {ref,shallowRef, computed,onMounted, watch, nextTick} from "vue"
    import Chart from "chart.js/auto"
    import {db} from '../../firebase'
    import {collection,  onSnapshot  ,addDoc,deleteDoc, doc } from 'firebase/firestore'
    import { useRouter } from 'vue-router';
    import { getAuth ,signOut} from "firebase/auth";
const router = useRouter()


const goHome = ()=>{
    signOut(auth).then(() => {
        router.push("/")
  // Sign-out successful.
    }).catch((error) => {
  // An error happened.
    });
}

const auth=getAuth()
const currentUser = auth.currentUser; 
const weights = ref([])
const weightChartEl = ref(null)
const weightChart = shallowRef(null)
const weightInput= ref()
const collectionName = ref(auth.lastNotifiedUid)
const q = collection(db, collectionName.value)



    const currentWeight=computed(()=>{
        return weights.value.sort((a,b)=>b.date-a.date)[0] || {weight:0}
    })


    const addWeight=()=>{
        addDoc(q,{
            weight: weightInput.value,
            date: new Date().getTime()
        })
        
    }
    const deleteWeight=(id)=>{
        deleteDoc(doc(q, id));
    }

    onMounted(()=>{

        onSnapshot(q, (querySnapshot) => {
                const kilolarımız = [];
                querySnapshot.forEach((doc) => {
                    const cekilenVeri = {
                        id: doc.id,
                        weight: doc.data().weight,
                        date: doc.data().date,
                    }
                    kilolarımız.push(cekilenVeri)
                });
                weights.value=kilolarımız     
            })
    })

    watch(weights, newWeights=>{
        const ws=[...newWeights]

        if(weightChart.value){
            weightChart.value.data.labels=ws.sort((a,b)=> a.date - b.date).map(w=> new Date(w.date).toLocaleDateString()).slice(-7)
            weightChart.value.data.datasets[0].data=ws.sort((a,b)=> a.date - b.date).map(w=> w.weight).slice(-7)
            weightChart.value.update()
            return
        }

        nextTick(()=>{
            weightChart.value=new Chart(weightChartEl.value.getContext('2d'),{
                type:"line",
                data:{
                    labels:ws.sort((a,b)=> a.date - b.date).map(w=> new Date(w.date).toLocaleDateString()),
                    datasets:[
                        {
                            label:"kilo",
                            data: ws.sort((a,b)=> a.date - b.date).map(w=> w.weight),
                            backgroundColor:"rgba(255, 0, 132, 0.2)",
                            borderColor:"rgb(255, 0, 132 )",
                            borderWidth:1,
                            fill:true,

                        }
                    ]
                },
                options:{
                    responsive:true,
                    maintainAspectRatio:false
                }
            })
        })
    },{deep:true})
</script>




