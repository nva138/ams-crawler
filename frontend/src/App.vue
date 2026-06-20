<script setup lang="ts">
import {onMounted} from "vue";
import {useJobStore} from "./stores/jobStore";
const jobStore = useJobStore()

onMounted(() => jobStore.fetchJobs())
</script>

<template>
 <h1>AMS Jobs</h1>

  <ul>
    <li v-for="job in jobStore.jobs" :key="job.url">
      {{job.title}} - {{job.company}}
    </li>
  </ul>
</template>
