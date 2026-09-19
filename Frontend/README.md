# React + Vite

## Google patient signup

Create a Google OAuth Web application client in Google Cloud Console and add the same client ID to:

```env
# Frontend/.env
VITE_GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com

# backend/.env
GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
```

Add the Frontend development URL (for example, `http://localhost:5173`) to the OAuth client's authorized JavaScript origins. The Google button appears on the patient Sign Up screen once `VITE_GOOGLE_CLIENT_ID` is configured.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
