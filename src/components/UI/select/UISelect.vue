<script setup>
import {onMounted, ref} from "vue";
import UIButton from "@/components/UI/button/UIButton.vue";
import UISelectItem from "@/components/UI/select/UISelectItem.vue";

const value = defineModel("value")

/*
* Проп options[]
*      | label - string - название поля
*      | value - string - значение поля
* */
const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    placeholder: {
        type: String,
        default: "Выберите опцию...",
    },
})

const emit = defineEmits(["toggle", "change"]);

const isSelectOpen = ref(false);

function toggleSelect() {
    isSelectOpen.value = !isSelectOpen.value;
    emit('toggle', isSelectOpen);
}

function setItem(option) {
    value.value = option;
    isSelectOpen.value = false;
    emit('change')
}

onMounted(() => {
    if (!value.value && props.options.length) {
        value.value = props.options[0];
    }
})
</script>

<template>
    <div class="relative">
        <UIButton
            class="w-full"
            :label="value?.label || placeholder"
            @click="toggleSelect"
        />

        <ul
            v-if="isSelectOpen"
            class="absolute left-0 w-46 border bg-white py-1 max-h-60 overflow-auto"
        >
            <template v-if="options && options.length">
                <li
                    v-for="option in options"
                    :key="option.value"
                >
                    <UISelectItem
                        :option="option"
                        :isActive="value.value === option.value"
                        @onSelect="setItem"
                    />
                </li>
            </template>

            <li v-else class="px-2 py-1 text-center">
                Нет опций
            </li>
        </ul>
    </div>
</template>