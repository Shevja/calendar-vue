<script setup>
const props = defineProps({
    label: [String, Number],
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['click'])
</script>

<template>
    <button
        class="flex items-center justify-center px-2 h-8 cursor-pointer rounded-xs transition-colors duration-100 bg-slate-200 text-slate-700 hover:bg-gray-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        :type="type"
        :disabled="disabled"
        @click="emit('click')"
    >
        <slot>{{ label }}</slot>
    </button>
</template>