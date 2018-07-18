/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface DatalistSelector {
      'items': string[];
    }
  }

  interface HTMLDatalistSelectorElement extends StencilComponents.DatalistSelector, HTMLStencilElement {}

  var HTMLDatalistSelectorElement: {
    prototype: HTMLDatalistSelectorElement;
    new (): HTMLDatalistSelectorElement;
  };
  interface HTMLElementTagNameMap {
    'datalist-selector': HTMLDatalistSelectorElement;
  }
  interface ElementTagNameMap {
    'datalist-selector': HTMLDatalistSelectorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'datalist-selector': JSXElements.DatalistSelectorAttributes;
    }
  }
  namespace JSXElements {
    export interface DatalistSelectorAttributes extends HTMLAttributes {
      'items'?: string[];
      'onOnSelect'?: (event: CustomEvent) => void;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
