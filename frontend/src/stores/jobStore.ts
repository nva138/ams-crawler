import {defineStore} from "pinia"
import {ref, watch} from "vue"

export interface Job {
    id: number,
    title: string,
    company: string,
    location: string,
    description: string | null,
    url: string,
    lastUpdatedAt: string | null;
}

export const useJobStore = defineStore("jobs", () => {
    const jobs = ref<Job[]>([]);
    const currentIndex = ref(0);
    const loading = ref<boolean>(false);

    const saved = ref<Job[]>(JSON.parse(localStorage.getItem("savedJobs") ?? "[]"));

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


    async function refresh() {
        try{
        loading.value = true;
        await fetch("/api/crawl", { method: "POST" });
        await fetchJobs();
        currentIndex.value = 0;
        }
        catch (e) {
            console.error(e)
        }
        finally {
            loading.value = false;
        }


    }
    function removeSaved(url: string) {
        saved.value = saved.value.filter(job => job.url !== url)
    }



    return { jobs, fetchJobs, currentIndex, saved, next,  saveCurrent, loading, refresh, removeSaved};
})