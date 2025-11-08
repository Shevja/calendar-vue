<script setup>
import CalendarDay from "@/components/Calendar/CalendarDay.vue";
import {DAYS_PER_WEEK} from "@/constants/date.js";
import {computed, ref} from "vue";
import {getDaysLayout, getWeekDayNames} from "@/utils/date.js";

const props = defineProps({
    selectedDay: {
        type: Date,
        default: () => new Date(),
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    weekDayNames: {
        type: Array,
        default: () => getWeekDayNames(),
    },
})

const emit = defineEmits(["onSelect"])

const days = computed(() => getDaysLayout(props.year, props.month));

function handleSelectDay(day) {
    emit("onSelect", day);
}
</script>

<template>
    <div>
        <div class="grid grid-cols-7 gap-0.5 mb-1">
            <span
                v-for="(name, index) in weekDayNames"
                :key="name"
                class="font-semibold text-center"
                :class="[
                    index === DAYS_PER_WEEK - 1 || index === DAYS_PER_WEEK - 2 ? 'text-red-600 dark:text-red-400' : '',
                    selectedDay.getDay() - 1 === index || selectedDay.getDay() === 0 && index === 6 ? 'bg-slate-200 dark:bg-zinc-800' : '',
                ]"
            >
                {{ name }}
            </span>
        </div>
        <div class="grid grid-cols-7 gap-0.5">
            <CalendarDay
                v-for="day in days"
                :key="day"
                :day-date="day"
                :is-current-month="day.getMonth() === props.month"
                :is-selected="day.toDateString() === selectedDay.toDateString()"

                @onClick="handleSelectDay"
            />
        </div>
    </div>
</template>