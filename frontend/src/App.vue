<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useJobStore } from "./stores/jobStore";
import JobCard from "./components/JobCard.vue";

const jobStore = useJobStore()

const view = ref<"browse" | "saved">("browse")

const currentJob = computed(() => jobStore.jobs[jobStore.currentIndex])

const done = computed(
  () => jobStore.jobs.length > 0 && jobStore.currentIndex >= jobStore.jobs.length
)

onMounted(() => jobStore.fetchJobs())
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="mx-auto max-w-md px-4 pb-16 pt-8">
      <header class="mb-6">
        <div class="flex items-center gap-1.5">
          <span class="h-3 w-3 rounded-full bg-red-500/80"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500/80"></span>
          <span class="h-3 w-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <div class="mt-3 flex items-center justify-between">
          <h1 class="font-mono text-2xl font-bold tracking-tight text-emerald-400">
            ~/ams-jobs
          </h1>

          <button
            @click="jobStore.refresh()"
            :disabled="jobStore.loading"
            title="Neu crawlen"
            class="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800
                   text-slate-400 transition hover:border-emerald-500/50 hover:text-emerald-300
                   disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              class="h-5 w-5"
              :class="{ 'animate-spin': jobStore.loading }"
            >
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <p class="mt-1 font-mono text-xs text-slate-500">
          <span class="text-emerald-500">$</span>
          <template v-if="jobStore.loading">crawling… (~40s)</template>
          <template v-else>query --stack=fullstack --city=wien</template>
          <span class="text-slate-600">→ {{ jobStore.jobs.length }} results</span>
        </p>
      </header>

      <div class="mb-5 flex gap-2 font-mono text-xs">
        <button
          @click="view = 'browse'"
          :class="view === 'browse'
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
            : 'border-slate-800 text-slate-500'"
          class="flex-1 rounded-md border px-3 py-2 transition"
        >
          browse
        </button>
        <button
          @click="view = 'saved'"
          :class="view === 'saved'
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
            : 'border-slate-800 text-slate-500'"
          class="flex-1 rounded-md border px-3 py-2 transition"
        >
          ★ gemerkt ({{ jobStore.saved.length }})
        </button>
      </div>

      <div v-if="view === 'browse'">
        <template v-if="currentJob">
          <JobCard :job="currentJob" :index="jobStore.currentIndex" />

          <div class="mt-4 flex gap-3">
            <button
              @click="jobStore.next()"
              class="flex-1 rounded-lg border border-slate-700 bg-slate-900 py-3 font-mono text-sm
                     text-slate-400 transition active:scale-95 hover:border-slate-600"
            >
              ✕ skip
            </button>
            <button
              @click="jobStore.saveCurrent()"
              class="flex-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 py-3 font-mono text-sm
                     font-medium text-emerald-300 transition active:scale-95 hover:bg-emerald-500/20"
            >
              ★ merken
            </button>
          </div>
        </template>

        <div
          v-else-if="done"
          class="rounded-xl border border-slate-800 bg-slate-900/80 p-8 text-center font-mono text-sm text-slate-500"
        >
          <p class="text-emerald-400">// EOF</p>
          <p class="mt-2">alle {{ jobStore.jobs.length }} Jobs durchgesehen</p>
        </div>

        <p v-else class="font-mono text-sm text-slate-600">loading…</p>
      </div>

      <div v-else>
        <ul v-if="jobStore.saved.length" class="flex flex-col gap-3">
          <li v-for="(job, i) in jobStore.saved" :key="job.url">
            <JobCard :job="job" :index="i" />
          </li>
        </ul>
        <p v-else class="font-mono text-sm text-slate-600">
          noch nichts gemerkt — im <span class="text-emerald-400">browse</span>-Tab ★ drücken
        </p>
      </div>
    </div>
  </div>
</template>
