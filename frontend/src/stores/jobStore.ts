import {defineStore} from "pinia"
import {ref, watch} from "vue"

export interface Job {
    id: number,
    title: string,
    company: string,
    location: string,
    description: string | null,
    url: string;
}

export const useJobStore = defineStore("jobs", () => {
    const jobs = ref<Job[]>([]);
    const currentIndex = ref(0);

    // gemerkte Jobs aus localStorage laden (beim Start), sonst leer
    const saved = ref<Job[]>(JSON.parse(localStorage.getItem("savedJobs") ?? "[]"));

    // bei jeder Änderung automatisch zurück in localStorage schreiben
    watch(saved, (val) => {
        localStorage.setItem("savedJobs", JSON.stringify(val));
    }, { deep: true });

    async function fetchJobs() {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        jobs.value = data;
    }

    function next() {
        currentIndex.value += 1;
    }

    function saveCurrent(){
        const currentJob = jobs.value[currentIndex.value]
        saved.value.push(currentJob)
        next()

    }

    return { jobs, fetchJobs, currentIndex, saved, next,  saveCurrent};
})