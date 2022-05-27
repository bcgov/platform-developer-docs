---
title: Typography

slug: typography

description: Describes the accessibility standards for B.C. Government webpages

keywords: design, UI, components, typography, guidelines

page_purpose: Define the typography standards used by the BC Government and link to relevant resources

audience: developer

author: Matt Spencer

content_owner: Tyler Krys

sort_order: 4
---

# Accessibility

# Typography

Good typography maintains a clear hierarchy of information and structures the content to help users understand and navigate your service.

## [](https://developer.gov.bc.ca/Design-System/Typography#bc-sans)BC Sans

The standard font for B.C. Government digital services is BC Sans. BC Sans is an open source font family, and is a modified version of Noto Sans, developed by Google. BC Sans includes modifications to support Indigenous languages in British Columbia.

Font weights and styles included:

* BC Sans Regular - 400
* BC Sans Italic - 400
* BC Sans Bold - 700
* BC Sans Bold Italic - 700

Typography standards for print are on the [B.C. Visual Identity Program](https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/bc-visual-identity/design-guidelines#palette-typography) page.

### [](https://developer.gov.bc.ca/Design-System/Typography#download-files)Download Files

Download and include the font files in your project

* [Download files for web development](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/policies-procedures-standards/web-content-development-guides/corporate-identity-assets/visid-files/bc-sans-font-woff.zip) (.woff)
* [Download files for your local computer](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/policies-procedures-standards/web-content-development-guides/corporate-identity-assets/visid-files/bc-sans-font-otf.zip) (.otf)
* [Download all font files](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/policies-procedures-standards/web-content-development-guides/corporate-identity-assets/visid-files/bc-sans-font-all.zip) (.eot, .ttf, .otf, .woff, .woff2)

### [](https://developer.gov.bc.ca/Design-System/Typography#npm-font-package)npm Font Package

`npm i --save @bcgov/bc-sans`

#### [](https://developer.gov.bc.ca/Design-System/Typography#react)React

Embed into a root level component `import '@bcgov/bc-sans/css/BCSans.css'`

### [](https://developer.gov.bc.ca/Design-System/Typography#typographyjs)Typography.js

A high-level elegant API for expressing typographic design intent
> 
> See Typography.js installation instructions [here](https://github.com/KyleAMathews/typography.js)

    import Typography from 'typography'; import '@bcgov/bc-sans/css/BCSans.css'; const typography = new Typography({ baseFontSize: '16px', baseLineHeight: 1.25, headerFontFamily: ['BCSans', 'Noto Sans', 'Verdana', 'Arial', 'sans-serif'], bodyFontFamily: ['BCSans', 'Noto Sans', 'Verdana', 'Arial', 'sans-serif'], scaleRatio: 2.074, }); export default typography;

### [](https://developer.gov.bc.ca/Design-System/Typography#font-face)@font-face

    @font-face { font-family: 'BCSans'; font-style: normal; src: url('assets/fonts/BCSans/BCSans-Regular.woff2') format('woff2'), /* Optimized for very modern browsers */ url('assets/fonts/BCSans/BCSans-Regular.woff') format('woff'); /* Modern Browsers */ } @font-face { font-family: 'BCSans'; font-style: italic; src: url('assets/fonts/BCSans/BCSans-Italic.woff2') format('woff2'), /* Optimized for very modern browsers */ url('assets/fonts/BCSans/BCSans-Italic.woff') format('woff'); /* Modern Browsers */ } @font-face { font-family: 'BCSans'; font-weight: 700; src: url('assets/fonts/BCSans/BCSans-Bold.woff2') format('woff2'), /* Optimized for very modern browsers */ url('assets/fonts/BCSans/BCSans-Bold.woff') format('woff'); /* Modern Browsers */ } @font-face { font-family: 'BCSans'; font-style: italic; font-weight: 700; src: url('assets/fonts/BCSans/BCSans-BoldItalic.woff2') format('woff2'), /* Optimized for very modern browsers */ url('assets/fonts/BCSans/BCSans-BoldItalic.woff') format('woff'); /* Modern Browsers */ }

### [](https://developer.gov.bc.ca/Design-System/Typography#font-stack)Font Stack

`font-family: 'BCSans', 'Noto Sans', Verdana, Arial, sans-serif;`

## [](https://developer.gov.bc.ca/Design-System/Typography#paragraphs)Paragraphs

### [](https://developer.gov.bc.ca/Design-System/Typography#example)Example

<!-- Need suggestion for formatting this example-->

Members of the public service are the politically impartial government employees who are responsible for carrying out the day-to-day activities of government and for delivering public services to the citizens of B.C

The default paragraph font size is 16px (1em) with a line height of 1.6.

# 
    p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 36px;
    color: #313132; 
    }

## Headings
Heading are sized based on a Minor Third (1.200) scale to achieve a harmonious increase of sizes.

# Heading 1 - 2.074em (37.32px)

## Heading 2 - 1.728em (31.10px)

### Heading 3 - 1.44em (25.92px)

#### Heading 4 - 1.2em (21.60px)



---
Rewrite sources:
* https://developer.gov.bc.ca/Design-System/Typography
---
