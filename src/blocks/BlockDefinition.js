/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define custom blocks.
 * @author abbychau@gmail.com (Abby Chau)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks


import * as Blockly from 'blockly/core';

Blockly.Blocks['jogmove'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("关节运动"), "jogMoveName")
        .appendField(new Blockly.FieldLabelSerializable("J1"), "jog1")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog1Input")
        .appendField(new Blockly.FieldLabelSerializable("J2"), "jog2")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog2Input")
        .appendField(new Blockly.FieldLabelSerializable("J3"), "jog3")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog3Input")
        .appendField(new Blockly.FieldLabelSerializable("J4"), "jog4")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog4Input")
        .appendField(new Blockly.FieldLabelSerializable("J5"), "jog5")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog5Input")
        .appendField(new Blockly.FieldLabelSerializable("J6"), "jog6")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog6Input")
        .appendField(new Blockly.FieldLabelSerializable("J7"), "jog7")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "jog7Input");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cartmove'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("笛卡尔运动"), "cartMoveNAME")
        .appendField(new Blockly.FieldLabelSerializable("X"), "XNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 400, 0.01), "XInput")
        .appendField(new Blockly.FieldLabelSerializable("Y"), "YNAME")
        .appendField(new Blockly.FieldNumber(0, -200, 200, 0.01), "YInput")
        .appendField(new Blockly.FieldLabelSerializable("Z"), "ZNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 400, 0.01), "ZInput")
        .appendField(new Blockly.FieldLabelSerializable("A"), "ANAME")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "AInput")
        .appendField(new Blockly.FieldLabelSerializable("B"), "BNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "BInput")
        .appendField(new Blockly.FieldLabelSerializable("C"), "CNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "CInput")
        .appendField(new Blockly.FieldLabelSerializable("Pos"), "PosNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 360, 0.01), "PosInput");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['zero'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("零点"), "zeroNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['motionstate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("运动状态"), "motionStateNAME")
        .appendField(new Blockly.FieldDropdown([["暂停","suspendedState"], ["继续","continueState"], ["停止","stopState"]]), "StateNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['jogincre'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("关节增量运动"), "jogIncreNAME")
        .appendField(new Blockly.FieldLabelSerializable("J1"), "J1NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J1InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J2"), "J2NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J2InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J3"), "J3NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J3InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J4"), "J4NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J4InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J5"), "J5NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J5InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J6"), "J6NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J6InputNAME")
        .appendField(new Blockly.FieldLabelSerializable("J7"), "J7NAME")
        .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "J7InputNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cartincre'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("笛卡尔增量运动"), "CartIncreNAME")
        .appendField(new Blockly.FieldLabelSerializable("X"), "XNAME")
        .appendField(new Blockly.FieldNumber(0, -800, 800, 0.01), "XInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("Y"), "YNAME")
        .appendField(new Blockly.FieldNumber(0, -800, 800, 0.01), "YInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("Z"), "ZNAME")
        .appendField(new Blockly.FieldNumber(0, -800, 800, 0.01), "ZInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("A"), "ANAME")
        .appendField(new Blockly.FieldNumber(0, -306, 360, 0.01), "AInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("B"), "BNAME")
        .appendField(new Blockly.FieldNumber(0, -306, 360, 0.01), "BInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("C"), "CNAME")
        .appendField(new Blockly.FieldNumber(0, -306, 360, 0.01), "CInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("Pos"), "PosNAME")
        .appendField(new Blockly.FieldNumber(0, -306, 360, 0.01), "PosInputNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['stay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("停留"), "stayNAME")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 0.01), "stayInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("秒"), "sNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['jogspeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("设置关节速度"), "jogSpeedNAME")
        .appendField(new Blockly.FieldNumber(0, -9999, 9999, 0.01), "jogSpeedInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("°/s"), "°/sNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['jogacceleration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("设置关节加速度"), "jogAccelerationNAME")
        .appendField(new Blockly.FieldNumber(0, -9999, 9999, 0.01), "jogAccelerationinputNAME")
        .appendField(new Blockly.FieldLabelSerializable("°/s²"), "°/s²NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cartspeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("设置空间运动速度"), "cartSpeedNAME")
        .appendField(new Blockly.FieldNumber(0, -9999, 9999, 0.01), "cartSpeedInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("mm/s"), "mm/sNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cartacceleration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("设置空间运动加速度"), "cartAccelerationNAME")
        .appendField(new Blockly.FieldNumber(0, -9999, 9999, 0.01), "cartAccelerationInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("mm/s²"), "mm/s²NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['endoffset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("设置末端偏移"), "endOffsetNAME")
        .appendField(new Blockly.FieldLabelSerializable("X"), "XNAME")
        .appendField(new Blockly.FieldTextInput("0"), "XInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("Y"), "YNAME")
        .appendField(new Blockly.FieldTextInput("0"), "YInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("Z"), "ZNAME")
        .appendField(new Blockly.FieldTextInput("0"), "ZInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("A"), "ANAME")
        .appendField(new Blockly.FieldTextInput("0"), "AInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("B"), "BNAME")
        .appendField(new Blockly.FieldTextInput("0"), "BInputNAME")
        .appendField(new Blockly.FieldLabelSerializable("C"), "CNAME")
        .appendField(new Blockly.FieldTextInput("0"), "CInputNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




Blockly.JavaScript['jogmove'] = function(block) {
  var number_jog1input = block.getFieldValue('jog1Input');
  var number_jog2input = block.getFieldValue('jog2Input');
  var number_jog3input = block.getFieldValue('jog3Input');
  var number_jog4input = block.getFieldValue('jog4Input');
  var number_jog5input = block.getFieldValue('jog5Input');
  var number_jog6input = block.getFieldValue('jog6Input');
  var number_jog7input = block.getFieldValue('jog7Input');
  // TODO: Assemble JavaScript into code variable.
  //var code = '...;\n';
  var code = 'this.jogMove('+number_jog1input+','+number_jog2input+','+number_jog3input+','+number_jog4input+','+number_jog5input+','+number_jog6input+','+number_jog7input+')\n';
  return code;
};

Blockly.JavaScript['cartmove'] = function(block) {
  var number_xinput = block.getFieldValue('XInput');
  var number_yinput = block.getFieldValue('YInput');
  var number_zinput = block.getFieldValue('ZInput');
  var number_ainput = block.getFieldValue('AInput');
  var number_binput = block.getFieldValue('BInput');
  var number_cinput = block.getFieldValue('CInput');
  var number_posinput = block.getFieldValue('PosInput');
  // TODO: Assemble JavaScript into code variable.
  //var code = '...;\n';
  var code = 'this.cartMove('+number_xinput+','+number_yinput+','+number_zinput+','+number_ainput+','+number_binput+','+number_cinput+')\n';
  return code;
};

Blockly.JavaScript['zero'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "this.zero();\n";
  return code;
};

Blockly.JavaScript['motionstate'] = function(block) {
  var dropdown_statename = block.getFieldValue('StateNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.motionStates('+dropdown_statename+')\n';
  return code;
};

Blockly.JavaScript['jogincre'] = function(block) {
  var number_j1inputname = block.getFieldValue('J1InputNAME');
  var number_j2inputname = block.getFieldValue('J2InputNAME');
  var number_j3inputname = block.getFieldValue('J3InputNAME');
  var number_j4inputname = block.getFieldValue('J4InputNAME');
  var number_j5inputname = block.getFieldValue('J5InputNAME');
  var number_j6inputname = block.getFieldValue('J6InputNAME');
  var number_j7inputname = block.getFieldValue('J7InputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.jogIncreMove('+number_j1inputname+','+number_j2inputname+','+number_j3inputname+','+number_j4inputname+','+number_j5inputname+','+number_j6inputname+','+number_j7inputname+')\n';
  return code;
};

Blockly.JavaScript['cartincre'] = function(block) {
  var number_xinputname = block.getFieldValue('XInputNAME');
  var number_yinputname = block.getFieldValue('YInputNAME');
  var number_zinputname = block.getFieldValue('ZInputNAME');
  var number_ainputname = block.getFieldValue('AInputNAME');
  var number_binputname = block.getFieldValue('BInputNAME');
  var number_cinputname = block.getFieldValue('CInputNAME');
  var number_posinputname = block.getFieldValue('PosInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.cartIncreMove('+number_xinputname+','+number_yinputname+','+number_zinputname+','+number_ainputname+','+number_binputname+','+number_cinputname+','+number_posinputname+')\n';
  return code;
};

Blockly.JavaScript['stay'] = function(block) {
  var number_stayinputname = block.getFieldValue('stayInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.stay('+number_stayinputname+');\n';
  return code;
};

Blockly.JavaScript['jogspeed'] = function(block) {
  var number_jogspeedinputname = block.getFieldValue('jogSpeedInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.jogSpeed('+number_jogspeedinputname+');\n';
  return code;
};

Blockly.JavaScript['jogacceleration'] = function(block) {
  var number_jogaccelerationinputname = block.getFieldValue('jogAccelerationinputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.jogAcceleration('+number_jogaccelerationinputname+');\n';
  return code;
};

Blockly.JavaScript['cartspeed'] = function(block) {
  var number_cartspeedinputname = block.getFieldValue('cartSpeedInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.cartSpeed('+number_cartspeedinputname+');\n';
  return code;
};

Blockly.JavaScript['cartacceleration'] = function(block) {
  var number_cartaccelerationinputname = block.getFieldValue('cartAccelerationInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.cartAcceleration('+number_cartaccelerationinputname+');\n';
  return code;
};

Blockly.JavaScript['endoffset'] = function(block) {
  var text_xinputname = block.getFieldValue('XInputNAME');
  var text_yinputname = block.getFieldValue('YInputNAME');
  var text_zinputname = block.getFieldValue('ZInputNAME');
  var text_ainputname = block.getFieldValue('AInputNAME');
  var text_binputname = block.getFieldValue('BInputNAME');
  var text_cinputname = block.getFieldValue('CInputNAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.endoffset('+text_xinputname+','+text_yinputname+','+text_zinputname+','+text_ainputname+','+text_binputname+','+number_cinputname+','+text_cinputname+');\n';
  return code;
};