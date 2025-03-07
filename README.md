# Solar Fusion

A multilingual web application for solar energy solutions, built with Astro and React.

![Solar Fusion](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Overview

Solar Fusion is a modern, performant website designed to showcase solar energy solutions, educate visitors about renewable energy options, and provide interactive tools for potential customers. The site features multilingual support for Croatian, English, Slovenian, German, Italian, and Hungarian.

### Key Features

- **Multilingual Support**: Full i18n implementation with 6 languages
- **Interactive Solar Calculator**: Helps visitors estimate their energy needs and costs
- **Project Gallery**: Showcase of completed solar installations
- **Building Types**: Information about solar solutions for different building types
- **Responsive Design**: Works seamlessly across all device sizes
- **Performance Optimized**: Fast loading times with Astro's partial hydration

## 📂 Project Structure

```text
/
├── public/           # Static assets and files
├── src/
│   ├── assets/       # Project images and SVGs
│   ├── components/   # UI components
│   │   └── calculator/  # Solar calculator components
│   ├── i18n/         # Internationalization
│   │   └── locales/  # Translation files
│   ├── layouts/      # Page layouts
│   ├── pages/        # Site pages and routes
│   │   └── [lang]/   # Language-specific routes
│   └── types/        # TypeScript type definitions
└── package.json
```

## 🛠️ Technologies Used

- **[Astro](https://astro.build/)**: Core framework with partial hydration
- **[React](https://reactjs.org/)**: For interactive components
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling
- **[i18next](https://www.i18next.com/)**: For internationalization
- **[Framer Motion](https://www.framer.com/motion/)**: For animations
- **[Swiper](https://swiperjs.com/)**: For carousel components
- **[Zod](https://github.com/colinhacks/zod)**: For form validation

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🌐 Deployment

The site is built and optimized for production using the `npm run build` command. The generated files in the `dist` directory can be deployed to any static hosting service.

## 📝 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
