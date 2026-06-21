<script setup lang="ts">
import { computed } from "vue"
import type { Job } from "../stores/jobStore"

const props = defineProps<{ job: Job; index: number }>()

const tag = computed(() => String(props.index + 1).padStart(3, "0"))

const source = computed(() => {
  try {
    return new URL(props.job.url, "https://jobs.ams.at").hostname.replace(/^www\./, "")
  } catch {
    return "jobs.ams.at"
  }
})

const updated = computed(() => {
  if (!props.job.lastUpdatedAt) return null
  const [jahr, monat, tag] = props.job.lastUpdatedAt.split("-")
  return `${tag}.${monat}.${jahr}`
})
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4
           shadow-[0_0_0_1px_rgba(16,185,129,0.04)] transition active:scale-[0.99]"
  >
    <span class="absolute inset-y-0 left-0 w-1 bg-emerald-500/70"></span>

    <div class="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
      <span class="text-emerald-400">[{{ tag }}]</span>
      <div class="flex items-center gap-1.5">
        <span v-if="updated" class="text-slate-500">↻ {{ updated }}</span>
        <span class="rounded border border-slate-700 px-1.5 py-0.5 text-slate-400">
          📍 {{ job.location }}
        </span>
      </div>
    </div>

    <h2 class="text-base font-semibold leading-snug text-slate-100">
      {{ job.title }}
    </h2>

    <p class="mt-1 font-mono text-sm text-emerald-300">
      <span class="text-slate-500">company:</span> {{ job.company }}
    </p>

    <div class="mt-4 flex items-center justify-between">
      <span class="font-mono text-[11px] text-slate-500">{{ source }}</span>
      <a
        :href="job.url"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5
               font-mono text-xs font-medium text-emerald-300 transition group-active:bg-emerald-500/20"
      >
        open →
      </a>
    </div>
  </article>
</template>