import { Component, Prop, Event, EventEmitter  } from '@stencil/core';

@Component({
  tag: 'datalist-selector',
  styleUrl: 'datalist-selector.component.scss'
})
export class DatalistSelectorComponent {

  @Prop() items: string[];
  @Event() onSelect: EventEmitter;

  handleChange(event) {
    this.onSelect.emit(event.target.value);
  }

  render() {
    const items = this.items || ['No "items" Prop provided.']
    return (
      <div>
        <input list="datalist-selector" 
          onChange={(event) => this.handleChange(event)} />
        
        <datalist id="datalist-selector">
          {items.map(item =>
            <option value={item}></option>
          )}
        </datalist>
      </div>
    )
  }
}