<template>
    <input
        ref="searchElementRef"
        name="select-search"
        :style="[searchStyles]"
        :class="['ww-select-search']"
        @input="handleInputChange"
        @keydown="handleKeyDown"
        @focus="handleSearchFocus"
        @blur="handleSearchBlur"
        :placeholder="searchPlaceholder"
    />
</template>

<script>
import { inject, onMounted, onBeforeUnmount, ref, computed, watch, nextTick } from 'vue';
/* wwEditor:start */
import useEditorHint from './editor/useEditorHint';
/* wwEditor:end */
import { debounce } from './utils';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['element-event', 'trigger-event', 'update:sidepanel-content'],
    setup(props, { emit }) {
        /* wwEditor:start */
        useEditorHint(emit);
        /* wwEditor:end */
        const { updateHasSearch, updateSearchElement, updateSearch, autoFocusSearch, focusSearch, isSearchBarFocused } = inject(
            '_wwSelect:useSearch',
            {}
        );
        const searchState = inject('_wwSelect:searchState', ref(null));
        const updateValue = inject('_wwSelect:updateValue', null);
        const dropdownMethods = inject('_wwSelect:dropdownMethods', {});
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value);
        const searchBy = computed(() => {
            return (props.content.searchBy || [])
                .filter(item => item && item.filter)
                .map(item => JSON.parse(item.filter.replace(/'/g, '"')))
                .flat();
        });

        const debouncedUpdateSearch = debounce((value, searchBy) => {
            if (updateSearch) updateSearch({ value, searchBy });
        }, 300);

        const searchStyles = computed(() => {
            const borderCss = !props.content.searchBorder
                ? {
                      border: props.content.searchBorderAll,
                  }
                : {
                      'border-top': props.content.searchBorderTop,
                      'border-right': props.content.searchBorderRight,
                      'border-bottom': props.content.searchBorderBottom,
                      'border-left': props.content.searchBorderLeft,
                  };

            return {
                width: props.content.searchWidth,
                height: props.content.searchHeight,
                'border-radius': props.content.searchBorderRadius,
                padding: props.content.searchPadding,
                margin: props.content.searchMargin,
                'background-color': props.content.searchBgColor,
                'font-family': props.content.searchFontFamily,
                'font-size': props.content.searchFontSize,
                'font-weight': props.content.searchFontWeight,
                color: props.content.searchFontColor,
                '--placeholder-color': props.content.searchPlaceholderColor,
                outline: props.content.searchOutline,
                'outline-offset': props.content.searchOutlineOffset,
                cursor: 'text',
                ...borderCss,
            };
        });

        const searchPlaceholder = computed(() => {
            return wwLib.wwLang.getText(props.content.searchPlaceholder);
        });

        // This event come from ww-input-basic => https://github.com/weweb-assets/ww-input-basic
        const handleInputChange = event => {
            debouncedUpdateSearch(event?.target?.value, searchBy);
        };

        const handleKeyDown = event => {
            if (event.key !== 'Enter') return;
            const value = event?.target?.value ?? '';
            const hasText = typeof value === 'string' && value.trim().length > 0;
            const noMatches = !Array.isArray(searchState.value?.searchMatches) || searchState.value.searchMatches.length === 0;
            if (!hasText || !noMatches || !updateValue) return;
            event.preventDefault();
            updateValue(value);
            if (dropdownMethods?.closeDropdown) dropdownMethods.closeDropdown();
            if (updateSearch) updateSearch({ ...searchState.value, value: '', searchMatches: [] });
        };

        const handleSearchFocus = () => {
            isSearchBarFocused.value = true;
        };

        const handleSearchBlur = () => {
            isSearchBarFocused.value = false;
        };

        watch(searchElement, value => {
            if (updateSearchElement) updateSearchElement(value);
        });

        onMounted(() => {
            if (updateHasSearch) updateHasSearch(true);
            if (updateSearch) updateSearch({ value: '', searchBy, searchMatches: [] });
        });

        onBeforeUnmount(() => {
            if (updateHasSearch) updateHasSearch(false);
        });

        return {
            searchElementRef,
            handleInputChange,
            handleKeyDown,
            handleSearchFocus,
            handleSearchBlur,
            searchStyles,
            searchPlaceholder,
        };
    },
};
</script>

<style scoped lang="scss">
.ww-select-search {
    &::placeholder {
        color: var(--placeholder-color);
    }
}
</style>
