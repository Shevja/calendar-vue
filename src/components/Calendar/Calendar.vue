<script setup>
import {computed, ref} from "vue";
import {
    fixWeekIndex,
    getMonthNames,
    getWeekDayNames,
    getYearsList,
    createDateString,
    parseDateString
} from "@/utils/date.js";
import UIButton from "@/components/UI/button/UIButton.vue";
import CalendarYearsGrid from "@/components/Calendar/CalendarYearsGrid.vue";
import CalendarMonthsGrid from "@/components/Calendar/CalendarMonthsGrid.vue";
import CalendarGridDays from "@/components/Calendar/CalendarDaysGrid.vue";
import {CALENDAR_MODES} from "@/constants/calendar.js";
import {LOCALE} from "@/constants/locale.js";

const dateString = defineModel("dateString");
// Если dateString пустой то установить текущую дату
dateString.value = dateString.value || createDateString(new Date());

const locale = ref(LOCALE.RU.code);
const chooseMode = ref(CALENDAR_MODES.DAY)
const selectedDay = ref(parseDateString(dateString.value));

const currentMonth = ref(selectedDay.value.getMonth())
const currentYear = ref(selectedDay.value.getFullYear())

const yearsList = computed(() => getYearsList())
const monthNames = computed(() => getMonthNames(locale.value))
const weekDayNames = computed(() => getWeekDayNames(locale.value))

const localeBtnLabel = computed(() => locale.value === LOCALE.RU.code ? LOCALE.EN.label : LOCALE.RU.label)

const dayBtnLabel = computed(() => {
    const weekDayNameIndex = fixWeekIndex(selectedDay.value.getDay())
    const weekDayName = weekDayNames.value[weekDayNameIndex]
    const date = selectedDay.value.getDate();
    return `${weekDayName}, ${date}`
})

function toggleLocale() {
    locale.value = locale.value === LOCALE.RU.code ? LOCALE.EN.code : LOCALE.RU.code;
}

function setDay(dayDate) {
    selectedDay.value = dayDate;
    dateString.value = createDateString(selectedDay.value);
}
</script>

<template>
    <div class="min-w-96 min-h-80">
        <div class="mb-4">
            <UIButton
                :label="localeBtnLabel"
                @click="toggleLocale"
            />
        </div>
        <div>
            <div class="mb-1">
                <CalendarYearsGrid
                    v-if="chooseMode === CALENDAR_MODES.YEAR"
                    v-model:year="currentYear"
                    :years-list="yearsList"
                    @onSelect="chooseMode = CALENDAR_MODES.MONTH"
                />
                <UIButton
                    v-else
                    class="w-full"
                    :label="currentYear"
                    @click="chooseMode = CALENDAR_MODES.YEAR"
                />
            </div>
            <div class="mb-1">
                <CalendarMonthsGrid
                    v-if="chooseMode === CALENDAR_MODES.MONTH"
                    v-model:month="currentMonth"
                    :month-names="monthNames"
                    @onSelect="chooseMode = CALENDAR_MODES.DAY"
                />
                <UIButton
                    v-else
                    class="w-full"
                    :label="monthNames[currentMonth]"
                    @click="chooseMode = CALENDAR_MODES.MONTH"
                />
            </div>
            <div>
                <CalendarGridDays
                    v-if="chooseMode === CALENDAR_MODES.DAY"
                    :selectedDay="selectedDay"
                    :month="currentMonth"
                    :year="currentYear"
                    :week-day-names="weekDayNames"
                    @on-select="setDay"
                />
                <UIButton
                    v-else
                    class="w-full mb-2"
                    :label="dayBtnLabel"
                    @click="chooseMode = CALENDAR_MODES.DAY"
                />
            </div>
        </div>
    </div>
</template>