
# Writing guide for Platform Services technical documentation

Use this guide to reference the approach taken to rewrite the Platform Services technical documentation. While this document is a good place to start, it's still alive and breathing and can be modified and improved upon as needed. Don't be shy. Documentation should evolve and improve!

This is the paragraph I'm changing.

Also, reference the [style and terminology guide](https://docs.google.com/spreadsheets/d/1uNueaRQSQ7ssrMF8zo9YQUJeHj7dL307rLww2hzGuiE/edit#gid=0) that's still in development for more specific rules. Keep in mind that the style guide tracks rules for granular usage of terms or formatting and is built around decisions made during the writing process by writers and stakeholders.

## On this page
- [Formatting](#format)
- [Tone and voice](#tone)
- [Audience](#audience)
- [Page structure and elements](#structure)
- [Accessibility](#accessibility)
- [Writing step-by-step instructions](#instructions)
- [Metadata](#metadata)
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
Don't duplicate content across pages. Remember the principle of **one topic = one page**. Rather than duplicating content, link to content that's needed. There's a couple solid reasons for this:

- **Maintenance:** If documentation, information, or processes change, it only needs to be updated in one place. Do your future self a favour.

- **Findability:** Having only one topic per page helps users find what the specific topic they need. Users know what's on the page and what they'll get out of reading the page.

For example, from our own tech docs library: [BC Government organizations in GitHub](https://github.com/bcgov/platform-developer-docs/blob/main/docs/use-github-in-bcgov/bc-government-organizations-in-github.md). The first draft of this page originally contained three topics:

- [BC Government organizations in GitHub](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/use-github-in-bcgov/bc-government-organizations-in-github.md)
- [Remove a user's BCGov GitHub access](https://github.com/bcgov/platform-developer-docs/blob/main/src/docs/use-github-in-bcgov/remove-user-bcgov-github-access.md)
- [Request BCGov GitHub access or repository creation](https://github.com/bcgov/platform-developer-docs/commit/40ddd75ed72cb4599a119e581df9b7a668a774b3)

After getting feedback, these pages needed to be split. Each page now seems pretty clear what they're about and the user doesn't have to wade through the original page to find content on requests or removals.

Essentially, try to put yourself in the shoes of the user and assume they'll want to go directly to the content they need, rather than stumble upon it.

The resources below have more information. They are concerned largely with forms, but similar principles apply to topics:

- [One thing per page](https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/)
- [One thing per page principle](https://mgearon.com/ux/one-thing-per-page-principle/)

### Linking strategy
[The Nielson Norman Group has extensive and thorough guidance on writing excellent hyperlinks](https://www.nngroup.com/articles/writing-links/).

Make sure that the link to an external page is descriptive. The user should know (or have a good idea) where the link is going to take them before they click it.

When linking from one Markdown page in the `./src/docs/` folder to another, write the link in the form `/<slug of the target page>/`. While these links won't work when viewing the page on GitHub, they will work on the Gatsby site.

When linking from Markdown pages in `./src/docs/` to the Cloud WordPress site, use the token `%WORDPRESS_BASE_URL%` in place of the site address and before the path of the document being linked to, in the form `%WORDPRESS_BASE_URL%/path-to-page/`. This is to allow for different WordPress URLs to be injected depending on the environment. 

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

One final note on images. Writing them in markdown doesn't give a lot of options for display or to implement very specific standards, so image standards may have to be ironed out on the developer end of things.

Also, when placing images in the documents, make sure they have a relative link format. For example, `../../images/image-name.png`. This ensures the images appear in the GitHub file and on the tech docs site.

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

## Metadata<a name="metadata"></a>

Track the metadata in the fields of each page based on these descriptions:

- **title**: The title of the page. The _best_ title you can create.

- **slug**: This appends the URL, so it shows the path of the page on the Gatsby site. Ex: Using `slug: landing-page` will cause the page to appear on the Gatsby site at `/landing-page`.

- **description**: A brief, precise description of what a reader will find on the page.

- **keywords**: These tags are important (see more below) to describe what the page is about. What kind of terms bring a reader here? What will they find?

- **page_purpose**: A more in-depth description.

- **audience**: Typically, a **developer** or a **technical lead**.

- **author**: Whoever wrote the original draft (or drafted the rewrite).

- **content_owner**: The SME of the page. They are responsible for the factual accuracy of the content.

- **sort_order**: Determines the order of the link to the page within the navigation menu.

### Keywords, tags, and taxonomy

It's important to track relevant keywords for each page and to refine them as the content becomes clearer. Eventually, the team uses a taxonomy to help pages get found when users search for them. But there are distinct differences, as shown in [the quotes from this blog below](https://contentstrategyinc.com/mays-vancouver-iacs-meetup-understanding-taxonomies/):

- "Tags themselves are not taxonomies. You can use your taxonomic terms as tags, but the tags themselves are not taxonomy. Taxonomy is not just a list of words, it’s a controlled vocabulary."

- "Metadata is information about information. Metadata describes the content and taxonomy organizes the content. Taxonomical terms should be stored as metadata, but metadata itself isn’t taxonomy."

## Resources<a name="resources"></a>

- [BC Government: Writing for the web](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide): My all-purpose style source for this specific project.

- [BC Government: Accessibility and Inclusion Toolkit](https://www2.gov.bc.ca/gov/content/home/accessible-government/toolkit): A must-have guide to inform you and/or check against to ensure your writing is accessible and inclusive.

- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/): The single best resource for web writing. If you read anything here, check out their [Top 10 tips for Microsoft style and voice](https://docs.microsoft.com/en-us/style-guide/top-10-tips-style-voice).
