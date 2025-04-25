# Jill Bonovitz Website

The portfolio website for artist Jill Bonovitz built with Hugo static site generator.

## Technologies Used

- **[Hugo](https://gohugo.io/)**: Fast static site generator written in Go
- **SCSS**: For advanced styling with variables and nesting
- **JavaScript**: For interactive elements like the slideshow gallery
- **HTML5**: For semantic markup
- **Responsive Design**: Adapts to mobile, tablet, and desktop viewports

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (Extended version recommended)
- Git

### Local Development

1. Clone this repository
2. Navigate to the project directory
3. Run Hugo's development server:

```bash
hugo server -D
```

This launches a local server at http://localhost:1313/ with live reloading.

## Content Management

The website content is managed through Markdown files in the `content/` directory.

### Updating Content

1. Navigate to the appropriate content file in the `content/` directory
2. Edit the Markdown file using any text editor
3. Save your changes
4. If running the development server, changes will appear immediately

### Page Structure

Each section of the website has its own directory under `content/`:

- `content/bio/` - Bio page content
- `content/clay/` - Clay artworks gallery
- `content/wire/` - Wire artworks gallery
- `content/linkspress/` - Links and Press information 
- `content/contact/` - Contact information

## Managing Image Galleries

The site uses a custom slideshow component for image galleries.

### Adding Images to an Existing Gallery

1. Place your new image file in the gallery's `images/` directory (e.g., `content/clay/images/`)
2. Open the appropriate `index.md` file in the section directory
3. Add a new entry to the `slides` list in the front matter:

```yaml
---
title: "Gallery Title"
slides:
  - id: [next-number-in-sequence]
    image: "images/your-new-image-filename.jpg"
    caption: "Your image caption, year, medium, dimensions"
---
```

Example caption format: `"title, 2023, porcelain clay with glaze, 4\"H x 6\"W"`

### Creating a New Gallery

#### Method 1: Using the Gallery Archetype (Recommended)

The site includes a gallery archetype that provides a template with helpful comments:

1. Create a new gallery using Hugo:

```bash
hugo new ceramics/index.md --kind gallery
```
2. Create an `images` directory for your gallery:
3. Add your images to this directory
4. Edit the generated index.md file to update image paths and captions


#### Method 2: Manual Creation

1. Create a new directory under `content/` with an appropriate name
2. Create an `images/` subdirectory inside your new gallery directory
3. Create an `index.md` file with the following structure:

```yaml
---
title: "New Gallery Title"
slides:
  - id: 1
    image: "images/first-image.jpg"
    caption: "First image caption"
  - id: 2
    image: "images/second-image.jpg"
    caption: "Second image caption"
---

Any introductory text for your gallery goes here.
```

4. Add your images to the gallery's `images/` subdirectory (e.g., `content/new-gallery/images/`)

## Image Requirements

- Use web-optimized images (JPG or PNG)
- Recommended dimensions: Images will display up to 1280px wide
- File naming convention: Use lowercase and hyphens instead of spaces
- Add `-web` suffix to optimized web images

## Deployment

The site is built as static HTML and can be deployed to any web hosting service. Current deployment uses GitHub Pages.

To build the site for production:

```bash
hugo --minify
```

This generates the static site in the `public/` directory.

## Theme Customization

Custom styling is managed through SCSS files in `themes/jill-artist-theme/assets/scss/`.

- `_variables.scss`: Colors, fonts, breakpoints
- `_responsive.scss`: Media queries for different screen sizes
- `_slideshow.scss`: Gallery slideshow styling

## Need Help?

For technical assistance or to request changes beyond what's documented here, please contact Ben.
