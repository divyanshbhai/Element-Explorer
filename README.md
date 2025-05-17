
# Element Explorer: Interactive Periodic Table

Element Explorer is a modern, interactive web application that allows users to explore the periodic table of elements. Built with Next.js, React, and ShadCN UI, it provides a visually appealing and informative experience for learning about chemical elements.
<img width="1440" alt="Screenshot 2025-05-17 at 12 15 17 PM" src="https://github.com/user-attachments/assets/b8a612df-c5f3-4498-a3a7-c8277a72977c" />
<table>
<tr>
  <td>
    <img width="1440" alt="Screenshot 2025-05-17 at 12 15 33 PM" src="https://github.com/user-attachments/assets/71a5bd31-3256-4f57-bb80-cde8d9a6214c" />
  </td>
  <td>
    <img width="1440" alt="Screenshot 2025-05-17 at 12 15 55 PM" src="https://github.com/user-attachments/assets/b914c45b-ba5a-4fde-a74c-32b1e7489279" />
  </td>
  <td>
    <img width="1440" alt="Screenshot 2025-05-17 at 12 16 13 PM" src="https://github.com/user-attachments/assets/317f5f83-fc8b-4ee1-8ec7-edbb9262c04e" />
  </td>
</tr>
</table>


## Features

*   **Full Periodic Table Display:** Visualizes all 118 chemical elements in their standard layout.
*   **Search Functionality:** Quickly find elements by name, symbol, or atomic number.
*   **Category Filtering:** Filter elements by their chemical categories (e.g., alkali metal, halogen, noble gas) using a dropdown menu.
*   **Detailed Element View:** Click on any element to open a modal displaying comprehensive information, including:
    *   Atomic number, symbol, name, atomic mass.
    *   Category, phase, density, melting/boiling points.
    *   Electron configuration and shell structure.
    *   Discovery details (discovered by, named by).
    *   Summary of the element.
*   **Interactive Electron Shell Diagrams:** Visual representation of electron shells for each element in the detailed view and comparison pane.
*   **Element Comparison:** Select up to two elements to compare their key properties side-by-side.
*   **Responsive Data Table:** View all element data in a sortable and filterable table at the bottom of the page.
*   **Modern UI/UX:** Clean, themeable interface built with ShadCN UI components and Tailwind CSS.
*   **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile devices.

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Component Library:** ShadCN UI
*   **Styling:** Tailwind CSS
*   **State Management:** React Hooks (`useState`, `useCallback`, `useEffect`)
*   **(Potentially in the future for AI features):** Genkit

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

### Running Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
2.  Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to view the application.

## Project Structure (Key Directories)

```
/src
├── app/                # Next.js App Router (pages, layout)
│   ├── page.tsx        # Main page component
│   └── layout.tsx      # Root layout
│   └── globals.css     # Global styles and Tailwind directives
├── components/         # React components
│   ├── ui/             # ShadCN UI components
│   └── ...             # Custom application components
├── data/               # Static data (e.g., elements.ts)
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── (ai/)               # (Potential future directory for Genkit flows)
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add new features, please feel free to:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


This README provides a good overview of the Element Explorer project. You can expand on any section or add new ones as needed!
