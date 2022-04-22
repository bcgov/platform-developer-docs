
# Writing guide for Platform Services technical documentation

Use this guide to reference the approach taken to rewrite the Platform Services technical documentation. While this is a good place to start, this document is still alive and breathing and can be modified and improved upon as needed. Don't be shy. Documentation should evolve and improve!

Also, reference the [style guide](https://docs.google.com/spreadsheets/d/1uNueaRQSQ7ssrMF8zo9YQUJeHj7dL307rLww2hzGuiE/edit#gid=0) that's still in development for more specific rules. Keep in mind that the style guide tracks rules for granular usage of terms or formatting and is built around decisions made during the writing process by writers and stakeholders.

## On this page
- [Formatting](#format)
- [Tone and voice](#tone)
- [Audience](#audience)
- [Page structure and elements](#structure)
- [Accessibility](#accessibility)
- [Writing step-by-step instructions](#instructions)
- [Resources](#resources)

## Formatting<a name="format"></a>
Use the following guidelines for basic formatting.
- [Define abbreviations at first use](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/abbreviations#define-abbreviations).

  The only exception is if you're confident that the audience understands the abbreviation or it's so common that most people would know. For example, PDF, JPEG.

- Spell out numbers one to ten, use digits for everything after.

  For more guidance and exceptions, see [Writing numbers and dates in web content](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/numbers).

- Rules for lists are clearly laid out in the [Web Style Guide](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/lists).

- When writing code or commands, generally set them on their own line, like so:

  `code example that seriously rocks`

## Tone and voice<a name="tone"></a>
The [Grammar, spelling and tone](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/grammar-spelling-tone) section of the Web Style Guide thoroughly covers tone and voice, but here are the most important points to keep in mind:

- Avoid the passive voice and use verb-forward language. The best way to eliminate passive voice is to consider the person or thing performing the verb in the sentence you're writing. Who does what? Even if it's a thing and not a person. For example, a program notifies a person.

- [Use contractions](https://docs.microsoft.com/en-us/style-guide/word-choice/use-contractions).

- Use simple words and phrases. Replace more complex words and phrases with a simpler alternative, where possible.

- Write in the present tense.

- Omit needless verbs, adverbs, and double verbs.

- Use less jargon. Strike a balance between formal and approachable.

- [Don't use Latin abbreviations](https://insidegovuk.blog.gov.uk/2016/07/20/changes-to-the-style-guide-no-more-eg-and-ie-etc/) (e.g., i.e., etc.). They're not always familiar to non-native English speakers, they don't always get read correctly by screen readers, and people don't speak Latin. Write around them or use the full term.

## Audience and perspective<a name="audience"></a>
The audience for the technical documentation generally has a high-level of devops knowledge and there are also other avenues for assistance (for example, RocketChat).

### Duplicate content
Don't duplicate content across pages. Remember the principle of **one topic = one page**. Rather than duplicating conent, link to content that's needed.

This also helps maintenance of documentation in the long run. If information or a process changes, only needs to be updated in one place. Do you future self a favour.

### Linking strategy
[The Nielson Norman Group has extensive and thorough guidance on writing excellent hyperlinks](https://www.nngroup.com/articles/writing-links/).

Make sure that the link to an external page is descriptive. The user should know (or have a good idea) where the link is going to take them before they click on it.

### FAQs
[Don't write FAQs](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/faqs) or format sections as a question and answer. Just tell the reader what they need to know.

## Page structure and elements<a name="structure"></a>

### Titles
Use a descriptive and specific title. What does the reader do with the page? What specific information do they gain?

Good titles help with findability and usability.

### Images
Use images sparingly. If you need to use images, make sure they are supplementary to the writing. Don't rely on them to explain a process.

Consider the following before using an image:

- Does the image should show something that can't be explained using words?

- Does the image meet [accessibility standards](https://www2.gov.bc.ca/gov/content/home/accessible-government/toolkit/accessible-digital-content/graphics)?

- Will the image require updates in the future? (Remember, help future _you_)

- Does the image contain elements that need to be clicked on or interacted with but can't be? For example, hyperlinks.

### On this page

Use the **On this page** section as a simple table of contents. See this section on [Anchor links](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/links).

### People

Avoid using people's names in documentation. There are many good reasons for this:

- They might be away
- They may have left the position or changed positions
- Organizational contact methods or means may have changed

You get the idea. Essentially, when you avoid using their name, it means you avoid questions and also don't have to go back and update it later. Use their position or reference more general means of contact. For example, a RocketChat channel or a team email.

## Accessibility<a name="accessibility"></a>

Use the [BC Government's guidelines and tools](https://www2.gov.bc.ca/gov/content/home/accessible-government/toolkit) to ensure your work is accessible and inclusive.

## Writing step-by-step instructions<a name="instructions"></a>
Occasionally, you'll have to write procedures. Find some of the most useful tips below but also check out [Microsoft's best practices for instructions](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/). It's a great crash course.

- Use numbered and bullet lists but not multi-level lists. Don't write single-item lists.

- Front load your content. What is the most important part of a given sentence? Give the reader what they need the most as soon as possible.

- Tell people what they should do, not what they shouldn't do.

- Here is especially important to write in the present tense.

- Use specific verbs.

- When you can, familiarize yourself with tools and programs so you can reference the UI accurately. However, tell the reader what they need to do, rather than getting too specific on the UI. Remember that the audience is already quite technical.

## Resources<a name="resources"></a>
- [BC Government: Writing for the web](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide): My all-purpose style source for this specific project.
- [BC Government: Accessibility and Inclusion Toolkit](https://www2.gov.bc.ca/gov/content/home/accessible-government/toolkit): A must-have guide to inform you and/or check against to ensure your writing is accessible and inclusive.
- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/): The single best resource for web writing. If you read anything here, check out their [Top 10 tips for Microsoft style and voice](https://docs.microsoft.com/en-us/style-guide/top-10-tips-style-voice).
