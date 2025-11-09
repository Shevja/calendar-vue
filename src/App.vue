<script setup>
import {computed, onMounted, ref, watch} from "vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import UIButton from "@/components/UI/button/UIButton.vue";
import {SunDim, Moon} from 'lucide-vue-next';

const isDarkMode = ref(false);

const preparedDateString = ref("2019-02-05")
const emptyDateString = ref("")

onMounted(() => {
    const themePreferred = localStorage.getItem("theme");

    if (themePreferred) {
        isDarkMode.value = themePreferred === 'dark';
    } else {
        localStorage.setItem("theme", "light");
    }
})

watch(
    isDarkMode,
    (val) => {
        localStorage.setItem("theme", val ? "dark" : "light");
    }
)
</script>

<template>
    <div
        class="min-h-screen text-stone-900 dark:bg-zinc-900 dark:text-white transition-colors duration-200"
        :class="[isDarkMode ? 'dark' : '']"
    >
        <section class="py-10">
            <div class="container m-auto px-4">
                <div class="py-2 w-full flex items-center justify-center">
                    <UIButton class="w-12 h-12 !p-0 !rounded-full" @click="isDarkMode = !isDarkMode">
                        <Moon
                            v-if="!isDarkMode"
                            class="text-stone-300 fill-zinc-900 stroke-1"
                            :size="32"
                        />
                        <SunDim
                            v-else
                            class="text-white fill-white"
                            :size="32"
                        />
                    </UIButton>
                </div>

                <div class="flex justify-center gap-4">
                    <div class="flex flex-col justify-center items-center gap-2">
                        <span class="border border-slate-300 px-2 py-0.5">{{ preparedDateString }}</span>
                        <Calendar v-model:date-string="preparedDateString"/>
                    </div>
                    <div class="flex flex-col justify-center items-center gap-2">
                        <span class="border border-slate-300 px-2 py-0.5">{{ emptyDateString }}</span>
                        <Calendar v-model:date-string="emptyDateString"/>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>