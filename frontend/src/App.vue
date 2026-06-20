<script setup lang="ts">
import {onMounted} from "vue";
import {useJobStore} from "./stores/jobStore";
import JobCard from "./components/JobCard.vue";
const jobStore = useJobStore()

onMounted(() => jobStore.fetchJobs())
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="mx-auto max-w-md px-4 pb-16 pt-8">
      <!-- Terminal-Header -->
      <header class="mb-6">
        <div class="flex items-center gap-1.5">
          <span class="h-3 w-3 rounded-full bg-red-500/80"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500/80"></span>
          <span class="h-3 w-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <h1 class="mt-3 font-mono text-2xl font-bold tracking-tight text-emerald-400">
          ~/ams-jobs
        </h1>
        <p class="mt-1 font-mono text-xs text-slate-500">
          <span class="text-emerald-500">$</span> query --stack=fullstack --city=wien
          <span class="text-slate-600">→ {{ jobStore.jobs.length }} results</span>
        </p>
      </header>

      <ul class="flex flex-col gap-3">
        <li v-for="(job, i) in jobStore.jobs" :key="job.url">
          <JobCard :job="job" :index="i" />
        </li>
      </ul>
    </div>
  </div>
</template>
