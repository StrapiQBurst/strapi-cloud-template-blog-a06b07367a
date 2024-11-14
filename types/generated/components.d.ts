import type { Attribute, Schema } from '@strapi/strapi';

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
    description: '';
    displayName: 'Banner';
  };
  attributes: {
    bgAttachment: Attribute.Enumeration<['scroll', 'fixed']>;
    buttons: Attribute.Component<'button.button', true>;
    description: Attribute.String;
    discountDetails: Attribute.String;
    imageUrl: Attribute.String;
    justify: Attribute.Enumeration<['start', 'end', 'center']>;
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    offerDescription: Attribute.Text;
    offerTitle: Attribute.String;
    offerType: Attribute.String;
    textAlign: Attribute.Enumeration<['left', 'right', 'center']>;
    title: Attribute.String;
  };
}

export interface ButtonButton extends Schema.Component {
  collectionName: 'components_button_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    buttonLink: Attribute.String;
    buttonText: Attribute.String;
    type: Attribute.Enumeration<['button-primary', 'button-secondary', 'link']>;
  };
}

export interface ErrorPageErrorPage extends Schema.Component {
  collectionName: 'components_error_page_error_pages';
  info: {
    displayName: 'ErrorPage';
  };
  attributes: {
    description: Attribute.String;
    errorTitle: Attribute.String;
    pageTitle: Attribute.String;
    returnHomeLabel: Attribute.String;
  };
}

export interface FeatureListBanerItem extends Schema.Component {
  collectionName: 'components_baner_baner_items';
  info: {
    description: '';
    displayName: 'FeatureItem';
  };
  attributes: {
    description: Attribute.Text;
    imageUrl: Attribute.String;
    title: Attribute.String;
  };
}

export interface FeatureSectionFeatureSection extends Schema.Component {
  collectionName: 'components_feature_section_feature_sections';
  info: {
    description: '';
    displayName: 'featureSection';
  };
  attributes: {
    featureList: Attribute.Component<'feature-list.baner-item', true>;
    title: Attribute.String;
    topTitle: Attribute.String;
  };
}

export interface FooterFooterLink extends Schema.Component {
  collectionName: 'components_footer_link_footer_links';
  info: {
    description: '';
    displayName: 'FooterLink';
  };
  attributes: {
    links: Attribute.Component<'link.links', true>;
    title: Attribute.String;
  };
}

export interface HeroSectionHeroSection extends Schema.Component {
  collectionName: 'components_hero_section_hero_sections';
  info: {
    description: '';
    displayName: 'HeroSection';
  };
  attributes: {
    buttons: Attribute.Component<'button.button', true>;
    description: Attribute.String;
    imageUrl: Attribute.String;
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    title: Attribute.String;
    topTitle: Attribute.String;
  };
}

export interface InfoPanelInfoPanel extends Schema.Component {
  collectionName: 'components_info_panel_info_panels';
  info: {
    description: '';
    displayName: 'infoPanel';
  };
  attributes: {
    bgImgUrl: Attribute.String;
    buttonLeft: Attribute.Component<'button.button'>;
    leftContent: Attribute.Component<'left-content.left-content'>;
    multiPartHeading: Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    rightContent: Attribute.Component<'right-content.right-content'>;
  };
}

export interface LeftContentLeftContent extends Schema.Component {
  collectionName: 'components_left_content_left_contents';
  info: {
    description: '';
    displayName: 'leftContent';
  };
  attributes: {
    align: Attribute.Enumeration<['start', 'end', 'center']>;
    description: Attribute.Text;
    title: Attribute.Text;
    topTitle: Attribute.String;
  };
}

export interface LinkLinks extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    description: '';
    displayName: 'Links';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface MultiPartHeadingMultiPartHeading extends Schema.Component {
  collectionName: 'components_multi_part_heading_multi_part_headings';
  info: {
    description: '';
    displayName: 'multiPartHeading';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface NavigationMenuItemsNavItems extends Schema.Component {
  collectionName: 'components_nav_items_nav_items';
  info: {
    description: '';
    displayName: 'navigationMenuItems';
  };
  attributes: {
    activeIcon: Attribute.String;
    defaultIcon: Attribute.String;
    label: Attribute.String;
    link: Attribute.String;
    overlayMenu: Attribute.Relation<
      'navigation-menu-items.nav-items',
      'oneToMany',
      'api::gender.gender'
    >;
    popUpMenu: Attribute.Component<'pop-up-menu.pop-up-menu', true>;
    variant: Attribute.Enumeration<
      ['link', 'overlayMenu', 'popUpMenu', 'disabled']
    >;
  };
}

export interface OverlayMenuOverlayMenu extends Schema.Component {
  collectionName: 'components_overlay_menu_overlay_menus';
  info: {
    description: '';
    displayName: 'overlayMenu';
  };
  attributes: {};
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

export interface ProductCollectionProductCollection extends Schema.Component {
  collectionName: 'components_p_s_p_ss';
  info: {
    description: '';
    displayName: 'ProductCollection';
  };
  attributes: {
    products: Attribute.Relation<
      'product-collection.product-collection',
      'oneToMany',
      'api::product.product'
    >;
    title: Attribute.String;
    topTitle: Attribute.String;
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

export interface SortingSorting extends Schema.Component {
  collectionName: 'components_sorting_sortings';
  info: {
    displayName: 'sorting';
  };
  attributes: {
    default: Attribute.Boolean;
    field: Attribute.String;
    name: Attribute.String;
    order: Attribute.Enumeration<['asc', 'desc']>;
  };
}

export interface TestimonialContentTestimonialContent extends Schema.Component {
  collectionName: 'components_testimonial_content_testimonial_contents';
  info: {
    description: '';
    displayName: 'testimonialContent';
  };
  attributes: {
    rating: Attribute.Integer &
      Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
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
    description: '';
    displayName: 'testimonial';
  };
  attributes: {
    bgImageUrl: Attribute.String;
    testimonialContent: Attribute.Component<
      'testimonial-content.testimonial-content',
      true
    >;
    title: Attribute.String;
    topTitle: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'appointment-methods.appointment-methods': AppointmentMethodsAppointmentMethods;
      'banner.baner': BannerBaner;
      'button.button': ButtonButton;
      'error-page.error-page': ErrorPageErrorPage;
      'feature-list.baner-item': FeatureListBanerItem;
      'feature-section.feature-section': FeatureSectionFeatureSection;
      'footer.footer-link': FooterFooterLink;
      'hero-section.hero-section': HeroSectionHeroSection;
      'info-panel.info-panel': InfoPanelInfoPanel;
      'left-content.left-content': LeftContentLeftContent;
      'link.links': LinkLinks;
      'multi-part-heading.multi-part-heading': MultiPartHeadingMultiPartHeading;
      'navigation-menu-items.nav-items': NavigationMenuItemsNavItems;
      'overlay-menu.overlay-menu': OverlayMenuOverlayMenu;
      'pop-up-menu.pop-up-menu': PopUpMenuPopUpMenu;
      'product-collection.product-collection': ProductCollectionProductCollection;
      'right-content.right-content': RightContentRightContent;
      'social-button.social-button': SocialButtonSocialButton;
      'sorting.sorting': SortingSorting;
      'testimonial-content.testimonial-content': TestimonialContentTestimonialContent;
      'testimonial.testimonial': TestimonialTestimonial;
    }
  }
}
