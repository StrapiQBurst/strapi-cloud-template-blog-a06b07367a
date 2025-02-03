import type { Schema, Struct } from '@strapi/strapi';

export interface AppointmentMethodsAppointmentMethods
  extends Struct.ComponentSchema {
  collectionName: 'components_appointment_methods_appointment_methods';
  info: {
    displayName: 'appointmentMethods';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface BannerBaner extends Struct.ComponentSchema {
  collectionName: 'components_baner_baners';
  info: {
    description: '';
    displayName: 'Banner';
  };
  attributes: {
    bgAttachment: Schema.Attribute.Enumeration<['scroll', 'fixed']>;
    buttons: Schema.Attribute.Component<'button.button', true>;
    description: Schema.Attribute.String;
    discountDetails: Schema.Attribute.String;
    imageUrl: Schema.Attribute.String;
    justify: Schema.Attribute.Enumeration<['start', 'end', 'center']>;
    link: Schema.Attribute.String;
    multiPartHeading: Schema.Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    offerDescription: Schema.Attribute.Text;
    offerTitle: Schema.Attribute.String;
    offerType: Schema.Attribute.String;
    textAlign: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    title: Schema.Attribute.String;
  };
}

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: 'components_button_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['button-primary', 'button-secondary', 'link']
    >;
  };
}

export interface ErrorPageErrorPage extends Struct.ComponentSchema {
  collectionName: 'components_error_page_error_pages';
  info: {
    displayName: 'ErrorPage';
  };
  attributes: {
    description: Schema.Attribute.String;
    errorTitle: Schema.Attribute.String;
    pageTitle: Schema.Attribute.String;
    returnHomeLabel: Schema.Attribute.String;
  };
}

export interface FeatureListBanerItem extends Struct.ComponentSchema {
  collectionName: 'components_baner_baner_items';
  info: {
    description: '';
    displayName: 'FeatureItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    imageUrl: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface FeatureSectionFeatureSection extends Struct.ComponentSchema {
  collectionName: 'components_feature_section_feature_sections';
  info: {
    description: '';
    displayName: 'featureSection';
  };
  attributes: {
    featureList: Schema.Attribute.Component<'feature-list.baner-item', true>;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_link_footer_links';
  info: {
    description: '';
    displayName: 'FooterLink';
  };
  attributes: {
    links: Schema.Attribute.Component<'link.links', true>;
    title: Schema.Attribute.String;
  };
}

export interface HeroSectionHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_hero_section_hero_sections';
  info: {
    description: '';
    displayName: 'HeroSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'button.button', true>;
    description: Schema.Attribute.String;
    imageUrl: Schema.Attribute.String;
    multiPartHeading: Schema.Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

export interface HomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_banners';
  info: {
    displayName: 'banner';
    icon: 'archive';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false>;
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['video', 'left-content', 'right-content']
    >;
  };
}

export interface HomeCategory extends Struct.ComponentSchema {
  collectionName: 'components_home_categories';
  info: {
    description: '';
    displayName: 'Category';
    icon: 'apps';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeCollection extends Struct.ComponentSchema {
  collectionName: 'components_home_collections';
  info: {
    displayName: 'Collection';
    icon: 'stack';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeFeature extends Struct.ComponentSchema {
  collectionName: 'components_home_features';
  info: {
    displayName: 'Feature';
    icon: 'apps';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeFeatureList extends Struct.ComponentSchema {
  collectionName: 'components_home_feature_lists';
  info: {
    description: '';
    displayName: 'FeatureList';
  };
  attributes: {
    features: Schema.Attribute.Component<'home.feature', true>;
    title: Schema.Attribute.String;
  };
}

export interface InfoPanelInfoPanel extends Struct.ComponentSchema {
  collectionName: 'components_info_panel_info_panels';
  info: {
    description: '';
    displayName: 'infoPanel';
  };
  attributes: {
    bgImgUrl: Schema.Attribute.String;
    buttonLeft: Schema.Attribute.Component<'button.button', false>;
    leftContent: Schema.Attribute.Component<'left-content.left-content', false>;
    multiPartHeading: Schema.Attribute.Component<
      'multi-part-heading.multi-part-heading',
      true
    >;
    rightContent: Schema.Attribute.Component<
      'right-content.right-content',
      false
    >;
  };
}

export interface LeftContentLeftContent extends Struct.ComponentSchema {
  collectionName: 'components_left_content_left_contents';
  info: {
    description: '';
    displayName: 'leftContent';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['start', 'end', 'center']>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
    topTitle: Schema.Attribute.String;
  };
}

export interface LinkLinks extends Struct.ComponentSchema {
  collectionName: 'components_link_links';
  info: {
    description: '';
    displayName: 'Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface MultiPartHeadingMultiPartHeading
  extends Struct.ComponentSchema {
  collectionName: 'components_multi_part_heading_multi_part_headings';
  info: {
    description: '';
    displayName: 'multiPartHeading';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface MyAccountEventBanner extends Struct.ComponentSchema {
  collectionName: 'components_my_account_event_banners';
  info: {
    displayName: 'EventBanner';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    joinUsText: Schema.Attribute.String;
    launchesAndShowCasesText: Schema.Attribute.String;
    stayUpdatedText: Schema.Attribute.String;
  };
}

export interface NavigationMenuItemsNavItems extends Struct.ComponentSchema {
  collectionName: 'components_nav_items_nav_items';
  info: {
    description: '';
    displayName: 'navigationMenuItems';
  };
  attributes: {
    activeIcon: Schema.Attribute.String;
    defaultIcon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    overlayMenu: Schema.Attribute.Relation<'oneToMany', 'api::gender.gender'>;
    popUpMenu: Schema.Attribute.Component<'pop-up-menu.pop-up-menu', true>;
    variant: Schema.Attribute.Enumeration<
      ['link', 'overlayMenu', 'popUpMenu', 'disabled']
    >;
  };
}

export interface OverlayMenuOverlayMenu extends Struct.ComponentSchema {
  collectionName: 'components_overlay_menu_overlay_menus';
  info: {
    description: '';
    displayName: 'overlayMenu';
  };
  attributes: {};
}

export interface PdpAccordian extends Struct.ComponentSchema {
  collectionName: 'components_pdp_accordians';
  info: {
    displayName: 'Accordian';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PdpDetailsSection extends Struct.ComponentSchema {
  collectionName: 'components_pdp_details_sections';
  info: {
    description: '';
    displayName: 'DetailsSection';
  };
  attributes: {
    description: Schema.Attribute.String;
    learnMoreButton: Schema.Attribute.Component<'button.button', false>;
    title: Schema.Attribute.String;
  };
}

export interface PdpTiffanyExperience extends Struct.ComponentSchema {
  collectionName: 'components_pdp_tiffany_experiences';
  info: {
    displayName: 'TiffanyExperience';
  };
  attributes: {
    accordionData: Schema.Attribute.Component<'pdp.accordian', true>;
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface PopUpMenuPopUpMenu extends Struct.ComponentSchema {
  collectionName: 'components_pop_up_menu_pop_up_menus';
  info: {
    displayName: 'popUpMenu';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface ProductCollectionProductCollection
  extends Struct.ComponentSchema {
  collectionName: 'components_p_s_p_ss';
  info: {
    description: '';
    displayName: 'ProductCollection';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

export interface RightContentRightContent extends Struct.ComponentSchema {
  collectionName: 'components_right_content_right_contents';
  info: {
    displayName: 'rightContent';
  };
  attributes: {
    imgUrl: Schema.Attribute.String;
  };
}

export interface SocialButtonSocialButton extends Struct.ComponentSchema {
  collectionName: 'components_social_button_social_buttons';
  info: {
    displayName: 'SocialButton';
  };
  attributes: {
    logoUrl: Schema.Attribute.String;
    socialLink: Schema.Attribute.String;
  };
}

export interface SortingSorting extends Struct.ComponentSchema {
  collectionName: 'components_sorting_sortings';
  info: {
    displayName: 'sorting';
  };
  attributes: {
    default: Schema.Attribute.Boolean;
    field: Schema.Attribute.String;
    name: Schema.Attribute.String;
    order: Schema.Attribute.Enumeration<['asc', 'desc']>;
  };
}

export interface TestimonialContentTestimonialContent
  extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_content_testimonial_contents';
  info: {
    description: '';
    displayName: 'testimonialContent';
  };
  attributes: {
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    review: Schema.Attribute.Text;
    userName: Schema.Attribute.String;
  };
}

export interface TestimonialTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonials';
  info: {
    description: '';
    displayName: 'testimonial';
  };
  attributes: {
    bgImageUrl: Schema.Attribute.String;
    testimonialContent: Schema.Attribute.Component<
      'testimonial-content.testimonial-content',
      true
    >;
    title: Schema.Attribute.String;
    topTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'appointment-methods.appointment-methods': AppointmentMethodsAppointmentMethods;
      'banner.baner': BannerBaner;
      'button.button': ButtonButton;
      'error-page.error-page': ErrorPageErrorPage;
      'feature-list.baner-item': FeatureListBanerItem;
      'feature-section.feature-section': FeatureSectionFeatureSection;
      'footer.footer-link': FooterFooterLink;
      'hero-section.hero-section': HeroSectionHeroSection;
      'home.banner': HomeBanner;
      'home.category': HomeCategory;
      'home.collection': HomeCollection;
      'home.feature': HomeFeature;
      'home.feature-list': HomeFeatureList;
      'info-panel.info-panel': InfoPanelInfoPanel;
      'left-content.left-content': LeftContentLeftContent;
      'link.links': LinkLinks;
      'multi-part-heading.multi-part-heading': MultiPartHeadingMultiPartHeading;
      'my-account.event-banner': MyAccountEventBanner;
      'navigation-menu-items.nav-items': NavigationMenuItemsNavItems;
      'overlay-menu.overlay-menu': OverlayMenuOverlayMenu;
      'pdp.accordian': PdpAccordian;
      'pdp.details-section': PdpDetailsSection;
      'pdp.tiffany-experience': PdpTiffanyExperience;
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
