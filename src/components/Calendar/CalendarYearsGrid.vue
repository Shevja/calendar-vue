<script setup>
import UIButton from "@/components/UI/button/UIButton.vue";

const props = defineProps({
    yearsList: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['onSelect'])

const currentYear = defineModel('year')

function setMonth(year) {
    currentYear.value = year
    emit('onSelect')
}
</script>

<template>
    <div class="grid grid-cols-3 gap-0.5">
        <UIButton
            v-for="year in yearsList"
            :key="year"
            :label="year"
            :class="[
                year === currentYear
                    ? 'bg-slate-600 text-white hover:bg-slate-600 dark:!bg-zinc-300 dark:text-zinc-900'
                    : '',
            ]"
            @click="setMonth(year)"
        />
    </div>
</template>