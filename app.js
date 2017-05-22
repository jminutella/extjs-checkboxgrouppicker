Ext.application({
    name: 'Fiddle',
    requires: ['CheckBoxGroupPicker'],

    launch: function () {
        const me = this;

        Ext.create('Ext.form.Panel', {
            renderTo: Ext.getBody(),
            title: 'CheckBoxGroup Picker',
            items: [{
                xtype: 'checkboxgrouppicker',
                itemId: 'statePicker',
                fieldLabel: 'State',
                parentPanel: me,
                width: 250,
                labelWidth: 35,
                value: '<Filter Not Applied>',
                checkBoxListeners: {
                    listeners: {
                        change: me.onStateChange
                    },
                },
                checkBoxCollection: [{
                    boxLabel: 'Preprocessing',
                    name: 'Preprocessing',
                    inputValue: 1
                }, {
                    boxLabel: 'Executing',
                    name: 'Executing',
                    inputValue: 2
                }, {
                    boxLabel: 'Ready',
                    name: 'Ready',
                    inputValue: 3
                }, {
                    boxLabel: 'Succeeded',
                    name: 'Succeeded',
                    inputValue: 4
                }, {
                    boxLabel: 'Failed',
                    name: 'Failed',
                    inputValue: 5
                }, {
                    boxLabel: 'Aborted',
                    name: 'Aborted',
                    inputValue: 6
                }]
            }]
        });
    },

    onStateChange: function (chkBox, newValue, oldValue) {
        let me = this,
            chkBoxGroup = chkBox.up('checkboxgroup'),
            picker = chkBoxGroup.up(),
            statePicker = picker.ownerCmp,
            selectedItems = chkBoxGroup.getValue(),
            pickerValue = '';

        // Update our selection in the combo box based off of our object keys
        pickerValue = Object.keys(selectedItems).join(', ');

        statePicker.setValue(pickerValue);
    }
});
