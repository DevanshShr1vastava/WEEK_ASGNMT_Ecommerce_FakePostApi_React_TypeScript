import { Container } from "react-bootstrap";
import { AppContext } from "./components/AppContexts";

function App() {
  
  return (
    <Container>
      <AppContext.Provider value ={undefined}>
        
      </AppContext.Provider>
    </Container>
      
  )
}

export default App
