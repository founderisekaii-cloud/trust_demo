// This file acts as a central registry for all images used in the application.
// By defining image metadata here, we can easily manage and reference images
// from a single source of truth.

// HOW IT WORKS:
// 1. All images are stored in the `public/images` directory.
// 2. This file imports `placeholder-images.json`, which contains a list of all images.
// 3. Each entry in the JSON file maps a unique `id` to an image's `imageUrl` (its path in `public/images`), a `description`, and a `imageHint`.
// 4. Components throughout the application can then import `PlaceHolderImages` and use the `find` method to get the correct image data by its `id`.

// HOW TO ADD OR UPDATE IMAGES:
// 1. Add your new image file to the `public/images` directory.
// 2. Open `src/lib/placeholder-images.json`.
// 3. Add a new object to the `placeholderImages` array with a unique `id`, a descriptive `description`, the correct `imageUrl` (e.g., "/images/your-new-image.jpg"), and a two-word `imageHint`.
// 4. To update an existing image, simply replace the image file in `public/images` with a new one that has the exact same filename. No code changes are needed.

import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
