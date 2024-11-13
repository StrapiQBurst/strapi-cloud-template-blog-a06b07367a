import type { Schema, Attribute } from '@strapi/strapi';

export interface TestimonialContentTestimonialContent extends Schema.Component {
  collectionName: 'components_testimonial_content_testimonial_contents';
  info: {
    displayName: 'testimonialContent';
    description: '';
  };
  attributes: {
    rating: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    review: Attribute.Text;
    userName: Attribute.String;
  };
}

export interface TestimonialTestimonial extends Schema.Component {
  collectionName: 'components_testimonial_testimonials';
  info: {
    displayName: 'testimonial';
    description: '';
  };
  attributes: {
    topTitle: Attribute.String;
    bgImageUrl: Attribute.String;
    title: Attribute.String;
    testimonialContent: Attribute.Component<
      'testimonial-content.testimonial-content',
      true
    >;
  };
}

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

export interface RightContentRightContent extends Schema.Component {
  collectionName: 'components_right_content_right_contents';
  info: {
    displayName: 'rightContent';
  };
  attributes: {
    imgUrl: Attribute.String;
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
    topTitle: Attribute.String;
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
    popUpMenu: Attribute.Component<'pop-up-menu.pop-up-menu', true>;
    overlayMenu: Attribute.Relation<
      'navigation-menu-items.nav-items',
      'oneToMany',
      'api::gender.gender'
    >;
  };
}

export interface MultiPartHeadingMultiPartHeading extends Schema.Component {
  collectionName: 'components_multi_part_heading_multi_part_headings';
  info: {
    displayName: 'multiPartHeading';
    description: '';
  };
  attributes: {
    title: Attribute.String;
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

export interface OverlayMenuOverlayMenu extends Schema.Component {
  collectionName: 'components_overlay_menu_overlay_menus';
  info: {
    displayName: 'overlayMenu';
    description: '';
  };
  attributes: {};
}

export interface LeftContentLeftContent extends Schema.Component {
  collectionName: 'components_left_content_left_contents';
  info: {
    displayName: 'leftContent';
    description: '';
  };
  attributes: {
    topTitle: Attribute.String;
    description: Attribute.Text;
    align: Attribute.Enumeration<['start', 'end', 'center']>;
    title: Attribute.Text;
  };
}

export interface InfoPanelInfoPanel extends Schema.Component {
  collectionName: 'components_info_panel_info_panels';
  info: {
    displayName: 'infoPanel';
    description: '';
  };
  attributes: {
    bgImgUrl: Attribute.String;
    leftContent: Attribute.Component<'left-content.left-content'>;
    rightContent: Attribute.Component<'right-content.right-content'>;
    buttonLeft: Attribute.Component<'button.button'>;
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
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
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    topTitle: Attribute.String;
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

export interface FeatureSectionFeatureSection extends Schema.Component {
  collectionName: 'components_feature_section_feature_sections';
  info: {
    displayName: 'featureSection';
    description: '';
  };
  attributes: {
    featureList: Attribute.Component<'feature-list.baner-item', true>;
    topTitle: Attribute.String;
    title: Attribute.String;
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

export interface ErrorPageErrorPage extends Schema.Component {
  collectionName: 'components_error_page_error_pages';
  info: {
    displayName: 'ErrorPage';
  };
  attributes: {
    pageTitle: Attribute.String;
    errorTitle: Attribute.String;
    description: Attribute.String;
    returnHomeLabel: Attribute.String;
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

export interface AppointmentMethodsAppointmentMethods extends Schema.Component {
  collectionName: 'components_appointment_methods_appointment_methods';
  info: {
    displayName: 'appointmentMethods';
  };
  attributes: {
    label: Attribute.String;
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
    offerDescription: Attribute.Text;
    discountDetails: Attribute.String;
    buttons: Attribute.Component<'button.button', true>;
    imageUrl: Attribute.String;
    textAlign: Attribute.Enumeration<['left', 'right', 'center']>;
    justify: Attribute.Enumeration<['start', 'end', 'center']>;
    bgAttachment: Attribute.Enumeration<['scroll', 'fixed']>;
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    offerTitle: Attribute.String;
    description: Attribute.String;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'testimonial-content.testimonial-content': TestimonialContentTestimonialContent;
      'testimonial.testimonial': TestimonialTestimonial;
      'sorting.sorting': SortingSorting;
      'social-button.social-button': SocialButtonSocialButton;
      'right-content.right-content': RightContentRightContent;
      'product-collection.product-collection': ProductCollectionProductCollection;
      'pop-up-menu.pop-up-menu': PopUpMenuPopUpMenu;
      'navigation-menu-items.nav-items': NavigationMenuItemsNavItems;
      'multi-part-heading.multi-part-heading': MultiPartHeadingMultiPartHeading;
      'link.links': LinkLinks;
      'overlay-menu.overlay-menu': OverlayMenuOverlayMenu;
      'left-content.left-content': LeftContentLeftContent;
      'info-panel.info-panel': InfoPanelInfoPanel;
      'hero-section.hero-section': HeroSectionHeroSection;
      'footer.footer-link': FooterFooterLink;
      'feature-section.feature-section': FeatureSectionFeatureSection;
      'feature-list.baner-item': FeatureListBanerItem;
      'error-page.error-page': ErrorPageErrorPage;
      'button.button': ButtonButton;
      'appointment-methods.appointment-methods': AppointmentMethodsAppointmentMethods;
      'banner.baner': BannerBaner;
    }
  }
}
