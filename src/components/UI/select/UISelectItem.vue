<script setup>
const props = defineProps({
    option: {
        type: Object,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['onSelect'])
</script>

<template>
    <button
        class="px-2 py-1 w-full text-left cursor-pointer"
        :class="[
            isActive
                ? 'bg-gray-200 cursor-default'
                : 'hover:bg-gray-100',
            isDisabled
                ? 'bg-gray-50'
                : ''
        ]"
        @click="!isActive && !isDisabled && emit('onSelect', option)"
    >
        {{ option.label }}
    </button>
</template>