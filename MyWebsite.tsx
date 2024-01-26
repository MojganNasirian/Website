// MyWebsite.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const API_URL = 'https://run.mocky.io/v3/bca27736-b535-4547-88a8-3b5e04687d0d?mocky-delay=1000ms';

interface MenuItem {
  id: number;
  title: string;
  subItems?: MenuItem[];
}
// The try-catch block is used to catch errors during the data fetching process, and the setError function is called to set the error state.
//This way, the user will see a loading indicator while the data is being fetched, an error message if there's an issue, and the actual menu once the data is loaded successfully.
const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.menuItems as MenuItem[];
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
//I added a LoadingIndicator component that will be displayed when data is being fetched.
const LoadingIndicator = () => <div>Loading...</div>;
//I added an ErrorDisplay component that will be displayed if there is an error fetching the data.
const ErrorDisplay = () => <div>Error fetching data</div>;

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
//The loading and error states are used to conditionally render the loading indicator or error display components.
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link to={`/category/${item.id}`}>{item.title}</Link>
            {item.subItems && (
              <ul>
                {item.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <Link to={`/category/${subItem.id}`}>{subItem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


const Header = () => {
  return <div className="header">Header</div>;
};

const Main = () => {
  return <div className="main">Main</div>;
};
// The react-router-dom library is used for routing. The Router, Switch, and Route components are used for handling navigation. 
// The Link component is used for creating links to different categories. When a user clicks on a category link, it will render the Main component with the corresponding category ID.
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/category/:id" component={Main} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
// Sidebar, Header, Main, LoadingIndicator, and ErrorDisplay are all functional components:
