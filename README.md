# LearnHub — Online Course Catalog

LearnHub is a simple, responsive course catalog built as a beginner-friendly React project. Browse a small collection of local sample courses, search by title, filter by category, and open a course to read more details.

## Technologies used

- HTML5
- CSS3
- JavaScript (ES modules)
- React with Vite

## Main features

- Eight sample courses stored in a local JavaScript array
- Case-insensitive course title search
- Category dropdown that works together with search
- Course detail modal with instructor, duration, level, category, price, and description
- Responsive layout for desktop, tablet, and mobile

## Run locally

Install a current version of Node.js, then open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To create a production build, run `npm run build`. To preview that build locally, run `npm run preview`.

## Project structure

```text
src/
├── components/   Reusable page sections and course UI
├── data/         Local course objects and category names
├── App.jsx       Main page and shared React state
├── main.jsx      React entry point
└── index.css     Global styles and responsive layout
```
