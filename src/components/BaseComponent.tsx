import React, { Component } from 'react'
function inject_unmount (target: any) {
  let next = target.prototype.componentWillUmmount
  target.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...arguments);
    this.unmount = true
  }
  let setState = target.prototype.setState
  target.prototype.setState = function () {
    if (this.unmount) return
    setState.call(this, ...arguments)
  }
}

@inject_unmount
class BaseComponent extends Component {}

export default BaseComponent