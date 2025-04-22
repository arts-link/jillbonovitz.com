---
title: "{{ replace .Name "-" " " | title }}"
type: "gallery"
# This gallery uses a slideshow to display images with captions
# Place all images in a folder called "images" in the same directory as this file

# Structure of slides:
# - id: (number - must be unique)
#   image: "images/filename.jpg" (path to image file inside content folder)
#   caption: "Description text" (caption text displayed below image)

slides:
  - id: 1
    image: "images/example-1.jpg"
    caption: "Title/Date, Materials, Dimensions"
  
  - id: 2
    image: "images/example-2.jpg"
    caption: "Title/Date, Materials, Dimensions"

  # Add more slides by copying the structure above
  # Make sure each slide has a unique id number
---

<!-- Do not add content here it does not get displayed on gallery pages -->
