<template>
  <div 
    class="absolute top-16 right-4 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg text-white transition-all duration-300"
  >
    <h2 class="text-lg font-bold mb-4">Simulation Controls</h2>
    <div class="space-y-4">
      <div v-for="(control, key) in controls" :key="key" class="space-y-1">
        <label :for="key" class="block text-sm font-medium">
          {{ control.label }}: {{ settings[key as keyof SimulationSettings] }}
        </label>
        <input
          :id="key"
          type="range"
          :min="control.min"
          :max="control.max"
          :step="control.step"
          v-model.number="settings[key as keyof SimulationSettings]"
          class="w-full accent-blue-500"
        />
      </div>
      <div class="space-y-1">
        <label class="block text-sm font-medium">
          Mouse Influence: {{ settings.mouseAttraction ? 'Attract' : 'Repel' }}
        </label>
        <button 
          @click="settings.mouseAttraction = !settings.mouseAttraction"
          class="w-full px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
        >
          Toggle Mouse Effect
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SimulationSettings } from '~/types/settings'

defineProps<{
  settings: SimulationSettings
  controls: ReturnType<typeof useSimulationControls>
}>()</script>