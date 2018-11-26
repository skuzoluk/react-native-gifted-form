import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
} from 'react-native';
import GiftedFormManager from '../GiftedFormManager';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SelectWidget',
      multiple: false,
      onSelect: () => {},
      onClose: () => {},
      onSetOptionTitleList: () => {},
    };
  },

  unSelectAll() {
    React.Children.forEach(this._childrenWithProps, (child, idx) => {
      this.refs[child.ref]._onChange(false);
    });
  },

  render() {
    const titleList = [];
    var fieldVal = GiftedFormManager.getValue(this.props.formName, this.props.name)
    this._childrenWithProps = React.Children.map(this.props.children, (child, idx) => {
      var val = child.props.value || child.props.title;
      titleList[child.props.value] = child.props.title;
      return React.cloneElement(child, {
        formStyles: this.props.formStyles,
        openModal: this.props.openModal,
        formName: this.props.formName,
        navigator: this.props.navigator,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onValidation: this.props.onValidation,
        onValueChange: this.props.onValueChange,

        isSelected: fieldVal && Array.isArray(fieldVal) && fieldVal.indexOf(val) >= 0,
        fieldVal,
        name: this.props.name+'{'+val+'}',
        ref: this.props.name+'{'+val+'}',
        value: val,
        unSelectAll: this.unSelectAll,

        multiple: this.props.multiple,
        onClose: this.props.onClose, // got from ModalWidget
        onSelect: this.props.onSelect, // got from DayPickerWidget
      });
    });
    this.props.onSetOptionTitleList(titleList);
    return (
      <View>
        {this._childrenWithProps}
      </View>
    );
  },
});
