import Header from "./components/Header";
import Personal from "./components/Personal";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Personal />
      </Container>
    </div>
  );
}

export default App;
