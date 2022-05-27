---
title: Icons

slug: icons

description: Describes the standards for using icons for B.C. Government webpages and details the Font Awesome icon library implementation 

keywords: design, UI, components, icons, accessibility, guidelines

page_purpose: Define the accessibility standards used by the BC Government and link to relevant resources

audience: developer

author: Matt Spencer

content_owner: Tyler Krys

sort_order: 5
---

# Icons

Iconography uses images and symbols to represent an idea visually. They communicate a message and should be distinct and informative.

## [](https://developer.gov.bc.ca/Design-System/Icons#implementation)Implementation

The design system supports using the Font Awesome icon library. Use these icons in your application by:

* Hosting the [font library locally](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself) in your project source files
* Using npm if you are using [Vue](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs), [Angular](https://fontawesome.com/how-to-use/on-the-web/using-with/angular), or [React](https://fontawesome.com/how-to-use/on-the-web/using-with/react) componentsIconLabelClass Name

![magnifying glass](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/search.png?raw=true)Search`<i class="fas fa-search"></i>`

![bars](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/bars-solid.png?raw=true)Menu Bars`<i class="fas fa-bars"></i>`

![envelope](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/envelope-solid.png?raw=true)Envelope`<i class="fas fa-envelope"></i>`

![phone](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/phone-solid.png?raw=true)Phone`<i class="fas fa-phone"></i>`

![external link](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/external-link-alt-solid.png?raw=true)External Link`<i class="fas fa-external-link-alt"></i>`

![Upload](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/upload-solid.png?raw=true)Upload`<i class="fas fa-upload"></i>`

![up arrow](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/chevron-up-solid.png?raw=true)Up Arrow`<i class="fas fa-chevron-up"></i>`

![right arrow](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/chevron-right-solid.png?raw=true)Right Arrow`<i class="fas fa-chevron-right"></i>`

![down arrow](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/chevron-down-solid.png?raw=true)Down Arrow`<i class="fas fa-chevron-down"></i>`

![left arrow](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-pngs/chevron-left-solid.png?raw=true)Left Arrow`<i class="fas fa-chevron-left"></i>`

## [](https://developer.gov.bc.ca/Design-System/Icons#design-guidance)Design Guidance

* Icons should be used sparingly throughout the application to provide clarity and reduce cognitive load on users.
* Icons do not have globally recognized meaning, and will vary based on people's past experiences. Always test the icons you use to make sure they are understandable
* Provide a text label with icons to clarify meaning
* Do not provide a text label when the icon is decorative
* Use solid icons rather than outline icons

Read more about [Icon Usability - Nielsen Norman Group](https://www.nngroup.com/articles/icon-usability/)

## [](https://developer.gov.bc.ca/Design-System/Icons#accessibility)Accessibility

### [](https://developer.gov.bc.ca/Design-System/Icons#screenreaders)Screenreaders

* If your icon has a text label you should hide the icon from screen readers by using the `aria-hidden="true"` attribute
* If your icon doesn't have a text label, you'll need to manually add a few things so that your icon is appropriately accessible

  * Hide the text label from screen readers by using the `aria-hidden="true"` attribute
  * Provide a text alternative inside a (or similar) element. Also include appropriate CSS to visually hide the element while keeping it accessible to assistive technologies.
  * Include a title attribute on the icon to provide a tooltip for sighted mouse users.

Read more about [Font Awesome Accessibility](https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility)

### [](https://developer.gov.bc.ca/Design-System/Icons#icon-size)Icon Size

The [click or tap area](https://www.w3.org/WAI/WCAG21/quickref/#target-size) around an icon should be a minimum of 44px by 44px (WCAG 2.1 AAA)

![Three icons that visually show a target area of 44px surrounding the icon](../../images/target-area.png)

### [](https://developer.gov.bc.ca/Design-System/Icons#colour-contrast)Colour Contrast

* Icons must have a 3:1 [color contrast ratio](https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast) (WCAG 2.1 AA) with the background colour.

![Two versions of the same icon with different contrast ratios](https://github.com/bcgov/design-system/blob/master/styles/Icons/icon-contrast.png?raw=true)

## [](https://developer.gov.bc.ca/Design-System/Icons#prototyping-with-font-awesome-icons)Prototyping with Font Awesome Icons

Download the [Font Awesome Icons](https://fontawesome.com/how-to-use/on-the-desktop/setup/getting-started) for your desktop to use in your mockups and prototypes.



---
Rewrite sources:
* https://developer.gov.bc.ca/Design-System/Icons
---
