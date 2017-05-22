/*
 * Custom CheckBoxGroup Picker class
 * 
 * If we ever need a picker with a checkbox group inside, create an instance from this
 * component and just pass what checkboxes you need in the checkBoxCollection property.
 * 
 * If each checkbox uses the same listeners, you could also pass in a checkBoxListeners object that contains the listeners you need that will
 * be applied to every check box.
 */
Ext.define('CheckBoxGroupPicker', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.checkboxgrouppicker',

    checkBoxCollection: null, // an array for checkbox components to use in the chk box group
    matchFieldWidth: false,
    editable: false,

    createPicker: function () {
        let me = this,
            checkBoxCollection = me.checkBoxCollection,
            checkBoxListeners = me.checkBoxListeners;

        me.picker = Ext.create('Ext.panel.Panel', {
            width: 245,
            height: 300,
            pickerField: me,
            floating: true,
            cls: 'x-menu',
            hidden: true,
            layout: 'fit',
            focusOnToFront: false,
            items: [{
                xtype: 'checkboxgroup',
                width: 110,
                height: 140,
                columns: 1,
                defaults: checkBoxListeners ? checkBoxListeners : null, // add default listeners
                items: checkBoxCollection || [] // add checkboxes here if none are provided in me.checkBoxCollection
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'button',
                    text: 'Select All',
                    handler: me.selectOrDeselectAll
                }, {
                    xtype: 'button',
                    text: 'Deselect All',
                    handler: me.selectOrDeselectAll
                }]
            }]
        });

        me.picker.ownerCt = me.up('[floating]');
        me.picker.registerWithOwnerCt();

        return me.picker;
    },

    /*
     * Select all/deselect all based on button text
     * @params {Ext.button.Button} btn - select all or deselect all btn
     */
    selectOrDeselectAll: function (btn) {
        let me = this,
            pickerPanel = btn.up('panel'),
            chkBoxGroup = pickerPanel.down('checkboxgroup'),
            allCheckBoxes = chkBoxGroup.getBoxes();

        Ext.Array.each(allCheckBoxes, function (checkbox) {
            if (btn.text === 'Select All') {
                checkbox.setValue(true);
            } else {
                checkbox.setValue(false);
            }
        });
    }
});
