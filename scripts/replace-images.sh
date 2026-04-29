#!/bin/bash
# Replace all placeholder images with Unsplash images

# Hero/Header images (large landscape)
find . -name "Header*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600\&q=80\&auto=format\&fit=crop|g' {} \;

# Property cards (portrait 5:6 ratio) - cycle through different properties
find . -name "Product9.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i '0,/placeholder-image.svg/{s|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800\&q=75\&auto=format\&fit=crop|}' {} \;

# Gallery images (square)
find . -name "Gallery22.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600\&q=75\&auto=format\&fit=crop|g' {} \;

# Testimonial avatars (small circular)
find . -name "Testimonial*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100\&q=80\&auto=format\&fit=crop\&crop=face|g' {} \;

# Team avatars
find . -name "Team*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200\&q=80\&auto=format\&fit=crop\&crop=face|g' {} \;

# CTA landscape images
find . -name "Cta*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg|https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400\&q=80\&auto=format\&fit=crop|g' {} \;

# Layout portrait images
find . -name "Layout*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-portrait.svg|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800\&q=75\&auto=format\&fit=crop|g' {} \;

# Layout landscape images
find . -name "Layout*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg|https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200\&q=80\&auto=format\&fit=crop|g' {} \;

# Generic placeholder images (catch-all for remaining)
find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg|https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200\&q=80\&auto=format\&fit=crop|g' {} \;

# Numbered placeholder images (for Layout356 and similar)
find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200\&q=80\&auto=format\&fit=crop|g' {} \;
find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg|https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1200\&q=80\&auto=format\&fit=crop|g' {} \;
find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg|https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200\&q=80\&auto=format\&fit=crop|g' {} \;

# Contact/Office images
find . -path "*/contact/*" -name "*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://images.unsplash.com/photo-1560518883-ce09059eeffa|https://images.unsplash.com/photo-1497366216548-37526070297c|g' {} \;

# Blog images
find . -name "Blog*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg|https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800\&q=75\&auto=format\&fit=crop|g' {} \;

# Stats images
find . -name "Stats*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://images.unsplash.com/photo-1560518883-ce09059eeffa|https://images.unsplash.com/photo-1486325212027-8081e485255e|g' {} \;

# Navbar featured images
find . -name "Navbar*.jsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec sed -i 's|https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600\&q=75\&auto=format\&fit=crop|g' {} \;

echo "✅ Image replacement complete!"
