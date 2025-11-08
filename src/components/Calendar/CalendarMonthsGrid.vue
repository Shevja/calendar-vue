<script setup>
import UIButton from "@/components/UI/button/UIButton.vue";

const props = defineProps({
    monthNames: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['onSelect'])

const currentMonth = defineModel('month')

function setMonth(index) {
    currentMonth.value = index
    emit('onSelect')
}
</script>

<template>
    <div class="grid grid-cols-3 gap-0.5">
        <UIButton
            v-for="(monthName, index) in monthNames"
            :key="monthName"
            :label="monthName"
            :class="[
                index === currentMonth
                ? 'bg-slate-600 text-white hover:bg-slate-600 dark:!bg-zinc-300 dark:text-zinc-900'
                : '',
            ]"
            @click="setMonth(index)"
        />
    </div>
</template>