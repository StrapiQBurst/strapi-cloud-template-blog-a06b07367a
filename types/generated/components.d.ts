import type { Schema, Attribute } from '@strapi/strapi';

export interface SortingSorting extends Schema.Component {
  collectionName: 'components_sorting_sortings';
  info: {
    displayName: 'sorting';
  };
  attributes: {
    name: Attribute.String;
    field: Attribute.String;
    order: Attribute.Enumeration<['asc', 'desc']>;
    default: Attribute.Boolean;
  };
}

export interface SocialButtonSocialButton extends Schema.Component {
  collectionName: 'components_social_button_social_buttons';
  info: {
    displayName: 'SocialButton';
  };
  attributes: {
    logoUrl: Attribute.String;
    socialLink: Attribute.String;
  };
}

export interface ProductCollectionProductCollection extends Schema.Component {
  collectionName: 'components_p_s_p_ss';
  info: {
    displayName: 'ProductCollection';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'product-collection.product-collection',
      'oneToMany',
      'api::product.product'
    >;
  };
}

export interface PopUpMenuPopUpMenu extends Schema.Component {
  collectionName: 'components_pop_up_menu_pop_up_menus';
  info: {
    displayName: 'popUpMenu';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface OverlayMenuOverlayMenu extends Schema.Component {
  collectionName: 'components_overlay_menu_overlay_menus';
  info: {
    displayName: 'overlayMenu';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface NavigationMenuItemsNavItems extends Schema.Component {
  collectionName: 'components_nav_items_nav_items';
  info: {
    displayName: 'navigationMenuItems';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
    defaultIcon: Attribute.String;
    activeIcon: Attribute.String;
    variant: Attribute.Enumeration<
      ['link', 'overlayMenu', 'popUpMenu', 'disabled']
    >;
    popUpMenu: Attribute.Component<'pop-up-menu.pop-up-menu'>;
    overlayMenu: Attribute.Component<'overlay-menu.overlay-menu', true>;
  };
}

export interface LinkLinks extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Links';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface HeroSectionHeroSection extends Schema.Component {
  collectionName: 'components_hero_section_hero_sections';
  info: {
    displayName: 'HeroSection';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    imageUrl: Attribute.String;
    buttons: Attribute.Component<'button.button', true>;
  };
}

export interface FooterFooterLink extends Schema.Component {
  collectionName: 'components_footer_link_footer_links';
  info: {
    displayName: 'FooterLink';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'link.links', true>;
  };
}

export interface FeatureListBanerItem extends Schema.Component {
  collectionName: 'components_baner_baner_items';
  info: {
    displayName: 'FeatureItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    imageUrl: Attribute.String;
    description: Attribute.Text;
  };
}

export interface ButtonButton extends Schema.Component {
  collectionName: 'components_button_buttons';
  info: {
    displayName: 'Button';
    description: '';
  };
  attributes: {
    buttonText: Attribute.String;
    buttonLink: Attribute.String;
    type: Attribute.Enumeration<['button-primary', 'button-secondary', 'link']>;
  };
}

export interface BannerBaner extends Schema.Component {
  collectionName: 'components_baner_baners';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    offerType: Attribute.String;
    offerTitle: Attribute.String;
    offerDescription: Attribute.Text;
    discountDetails: Attribute.String;
    buttons: Attribute.Component<'button.button', true>;
    imageUrl: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sorting.sorting': SortingSorting;
      'social-button.social-button': SocialButtonSocialButton;
      'product-collection.product-collection': ProductCollectionProductCollection;
      'pop-up-menu.pop-up-menu': PopUpMenuPopUpMenu;
      'overlay-menu.overlay-menu': OverlayMenuOverlayMenu;
      'navigation-menu-items.nav-items': NavigationMenuItemsNavItems;
      'link.links': LinkLinks;
      'hero-section.hero-section': HeroSectionHeroSection;
      'footer.footer-link': FooterFooterLink;
      'feature-list.baner-item': FeatureListBanerItem;
      'button.button': ButtonButton;
      'banner.baner': BannerBaner;
    }
  }
}
