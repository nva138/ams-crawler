import {defineStore} from "pinia"
import {ref} from "vue"

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

    async function fetchJobs() {
        const response = await fetch("http://localhost:8081/api/jobs");
        const data = await response.json();
        jobs.value = data;
    }

    return { jobs, fetchJobs };
})