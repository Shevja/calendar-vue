<script setup>
import {ref} from "vue";

const props = defineProps({
    dayDate: {
        type: Date,
        required: true,
    },
    isCurrentMonth: {
        type: Boolean,
        default: true,
    },
    isSelected: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['onClick'])

const isWeekend = ref(props.dayDate.getDay() === 0 || props.dayDate.getDay() === 6)

function onClick() {
    emit('onClick', props.dayDate)
}
</script>

<template>
    <div
        class="h-8 p-1 flex items-center justify-center rounded-xs transition-colors duration-100"
        :class="[
            isCurrentMonth
                ? isSelected
                    ? 'bg-slate-600 text-white hover:cursor-default font-semibold dark:bg-zinc-300 dark:text-zinc-700'
                    : [
                        'bg-slate-200 hover:bg-slate-300 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700',
                        isWeekend ? 'text-red-600 font-semibold dark:text-red-400' : 'text-slate-700dark:text-zinc-200'
                    ]
                : isSelected
                    ? [
                        'bg-slate-200/75 cursor-default font-bold',
                        isWeekend ? 'text-red-600 font-semibold' : 'text-slate-400'
                    ]
                    : [
                        'bg-slate-100 cursor-default dark:bg-zinc-500',
                        isWeekend ? 'text-red-400 font-semibold dark:text-red-300' : 'text-slate-400 dark:text-gray-400'
                    ]
        ]"
        @click="isCurrentMonth && onClick()"
    >
        {{ dayDate.getDate() }}
    </div>
</template>