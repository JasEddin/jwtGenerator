 
import { useState } from "react";
import { generateToken } from "./jwtService";

 

export type TokenResponse = {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
};
enum Environment {
          Stable = "stable",
          Ct2 = "ct2",
          Ct3 = "ct3",
          Ct4 = "ct4",
          Ct5 = "ct5",
          U3 = "u3",
          U4 = "u4",
          U5 = "u5",
          Lab = "lab"}

function App() {
  const [env, setEnv] = useState("ct2" as Environment);
  const [pnr, setPnr] = useState( "199001011234" );
  const [result, setResult] = useState<TokenResponse | null>(null);

  const handleGenerate = async () => {
    try {

      const res = await generateToken(pnr, env);
      setResult(res);
    } catch (err) {   
      setResult(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Token Generator</h2>

      <label>Environment: </label>
      {/* dropdown for environment selection */}
      <select value={env} onChange={(e) => setEnv(e.target.value as Environment)}>
        {Object.values(Environment).map((envOption) => (
          <option key={envOption} value={envOption}>
            {envOption.toUpperCase()}
          </option>
        ))}
      </select>

      <br /><br />

      <label> Personnummer : </label>
      <input
        value={pnr}
        onChange={(e) => setPnr(e.target.value)}
      />
      <br /><br />
      <button onClick={handleGenerate}>Generate Token</button>
      <h3>Result:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No result"  }</pre>

           {result && (
        <>
          <h3>Access Token:</h3>
          <textarea
            style={{ width: "100%", height: 160 }}
            value={result.access_token}
            readOnly
          />

          <button
            onClick={() => {
              navigator.clipboard.writeText(result.access_token);
            }}
          >
            Copy Access Token
          </button>
        </>
      )}
    </div>
  );
}



export default App
