export default {
    editor: {
        label: 'Select',
        icon: 'select',
        bubble: true,
    },
    inherit: {
        type: 'ww-layout',
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        items: {
            bindable: 'repeatable',
            label: 'Choices',
            type: 'Info',
            options: {
                text: {
                    en: 'Elements to repeat',
                },
            },
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        selectType: {
            label: 'Type',
            type: 'TextSelect',
            options: {
                options: [
                    {
                        value: 'single',
                        label: 'Single',
                    },
                    {
                        value: 'multiple',
                        label: 'Multiple',
                    },
                ],
            },
            bindable: true,
            defaultValue: 'single',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multiple'],
                tooltip: 'A string value, either "single" or "multiple"',
            },
            /* wwEditor:end */
        },
        initValueSingle: {
            type: 'Text',
            label: 'Initial value (single)',
            bindable: true,
            defaultValue: null,
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'string',
                    },
                ],
                tooltip: 'A string value: \n\n`"myValue"`, or an array of values: \n\n`["myValue1", "myValue2"]`',
            },
            /* wwEditor:end */
            hidden: content => content.selectType !== 'single',
        },
        initValueMulti: {
            type: 'Array',
            label: 'Initial value (Multi)',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                ],
                tooltip: 'An array of values: \n\n`["myValue1", "myValue2"]`',
            },
            /* wwEditor:end */
            hidden: content => content.selectType !== 'multiple',
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read-only' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        canUnselect: {
            label: { en: 'Can unselect' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        forceOpenInEditor: {
            label: { en: 'Force open in editor' },
            type: 'OnOff',
            defaultValue: false,
            editorOnly: true,
        },
        loadOnScroll: {
            label: { en: 'Load on scroll' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value: \n\n`true` or `false`',
            },
            /* wwEditor:end */
        },
        dropdown: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'f0751328-1cf9-44bd-9a4b-133d93b96762',
            },
        },
        _trigger: {
            hidden: true,
            defaultValue: [],
        },
        _dropdown: {
            hidden: true,
            defaultValue: [],
        },
    },
};
