<template >
    <div class="flex items-center justify-center w-screen h-screen">
        <details class="list-none h-56 md:w-[500px]">
            <summary class="text-5xl my-10 sm:text-5xl md:text-8xl shine select-none font-extrabold leading-10 text-white text-outline transition-all ">
                <h1 class="cursor-pointer" >K G T K P</h1>
            </summary>
            <form @submit.prevent="loginFunc" class="flex flex-col sm:flex-col md:flex-row " >
            
            <input type="email" id="id" placeholder="id" class="outline-none  bg-zinc-900 text-pink-500  text-3xl border-2 border-pink-500 md:rounded-l-full text-center w-52 sm:52 md:w-96 h-16  " />
            <input type="password" id="pw"  placeholder="passwd" class="outline-none bg-zinc-900 text-pink-500  text-3xl border-2 border-pink-500 rounded-rs-full text-center w-52 sm:52  h-16  " />
            <input type="submit" value="kaydet" class="text-pink-500 text-center text-3xl  border-2 font-extrabold border-pink-500 md:rounded-r-full cursor-pointer hover:bg-pink-500 hover:text-zinc-900 transition-all w-52 sm:52 px-2 h-16"/>
        </form>
        <p class="text-zinc-400 text-center md:relative fixed bottom-1 right-1 sm:fixed w-full sm:bottom-1 sm:right-1">hesabınız yoksa <br> mail: <strong>admin@admin.com</strong> şifre: <strong>admin123</strong></p>
        </details>
    </div>

</template>

<script setup>
    import {db} from '../../firebase'
    import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged } from "firebase/auth";
    import { useRouter } from 'vue-router';

    const router = useRouter()

    
    const loginFunc = ()=>{
        const id = document.querySelector("#id").value
        const pw = document.querySelector("#pw").value
        const auth = getAuth();

        
        signInWithEmailAndPassword(auth, id, pw)
            .then((userCredential) => {
         const user = userCredential.user;
         router.push("/feed")
         console.log('userCredential', userCredential)
         console.log('user ', user.uid )
         console.log('auth ', auth)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        
    }



</script>
