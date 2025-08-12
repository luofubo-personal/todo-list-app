# CSS Styling Specification

## Overall Design Approach
- Clean, minimalist design with ample whitespace
- Modern color scheme with good contrast for readability
- Responsive layout that works on mobile and desktop
- Smooth transitions and visual feedback for interactions

## Color Palette
- Primary color: Blue (#3498db) for accents and interactive elements
- Background: Light gray (#f5f5f5) for page background
- Todo item background: White (#ffffff)
- Text: Dark gray (#333333) for primary text
- Completed items: Light gray (#999999) text color
- Borders: Light gray (#e0e0e0)

## Typography
- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Font sizes:
  * Header: 2rem
  * Todo items: 1rem
  * Small text (counters): 0.875rem

## Layout and Spacing
- Centered container with max-width of 500px
- Padding of 20px on sides (10px on mobile)
- Vertical spacing of 15px between elements
- Rounded corners (border-radius: 5px) for containers

## Input Section Styling
- Full-width input field with padding
- Subtle border with focus state styling
- Add button with primary color background
- Hover and active states for button

## Todo Item Styling
- Each item in its own container with shadow
- Checkbox with custom styling
- Delete button with hover effects
- Completed items with strikethrough and faded appearance
- Hover effects on todo items

## Responsive Design
- Media query for screens under 600px wide
- Adjust padding and font sizes for mobile
- Ensure touch targets are minimum 44px for usability

## Animations and Transitions
- Smooth transitions for hover states
- Fade-in effect for new todo items
- Smooth strikethrough animation for completed items