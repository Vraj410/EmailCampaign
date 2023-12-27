import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Fetch the API route to test the MongoDB connection
    fetch('/api/dbTest')
      .then(response => {
        // Make sure the response is in JSON format
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message); // Expected to be "Connected to MongoDB"
      })
      .catch(error => {
        console.error('Error fetching MongoDB status:', error);
      });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
