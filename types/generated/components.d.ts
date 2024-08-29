import type { Schema, Attribute } from '@strapi/strapi';

export interface LinkLinks extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Links';
  };
  attributes: {
    Name: Attribute.String;
    Url: Attribute.String;
  };
}

export interface ButtonButton extends Schema.Component {
  collectionName: 'components_button_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    ButtonText: Attribute.String;
    ButtonLink: Attribute.String;
    Type: Attribute.Enumeration<['Primary', 'Secondary']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'link.links': LinkLinks;
      'button.button': ButtonButton;
    }
  }
}
