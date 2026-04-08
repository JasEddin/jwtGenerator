 
import { useState } from "react";
import { generateToken } from "./jwtService";

function App() {
  const [env, setEnv] = useState("ct2");
  const [params, setParams] = useState(`{
  "clientid": "i_web_individual_short",
  "client_secret": "mysecret",
  "preset": "individual",
  "grant_type": "client_credentials",
  "sub": "196901014081",
  "national_id": "196901014081",
  "scope": "account_read system_read"
}`);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    try {
      const data = {
        environment: env,
        parameters: JSON.parse(params)
      };

      const res = await generateToken(data);
      setResult(JSON.stringify(res, null, 2));
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Token Generator</h2>

      <label>Environment:</label>
      <input value={env} onChange={(e) => setEnv(e.target.value)} />

      <br /><br />

      <label>Parameters (JSON):</label>
      <textarea
        rows={10}
        cols={60}
        value={params}
        onChange={(e) => setParams(e.target.value)}
      />

      <br /><br />

      <button onClick={handleGenerate}>Generate Token</button>

      <h3>Result:</h3>
      <pre>{result}</pre>
    </div>
  );
}



export default App
