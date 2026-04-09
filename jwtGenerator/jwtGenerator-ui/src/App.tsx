
import { useState } from "react";
import { generateToken } from "./jwtService";
import "./App.css";
import { Copy } from "lucide-react";


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
  Lab = "lab"
}

function App() {
  const [env, setEnv] = useState("ct2" as Environment);
  const [pnr, setPnr] = useState("199001011234");
  const [result, setResult] = useState<TokenResponse | null>(null);

  const handleGenerate = async () => {
    try {

      const res = await generateToken(pnr, env);
      setResult(res);
    } catch (err) {
      setResult(null);
    }
  };

  function prettierToken(token: string, start = 5, end = 10): string {
    if (!token) return "";

    if (token.length <= start + end) return token;

    const first = token.slice(0, start);
    const last = token.slice(-end);

    return `${first} ••••••••••• ${last}`;
  }

  return (
    <div className="app">
      <div className="container">
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
          <button className="btn-primary" onClick={handleGenerate}>
            Generate token
          </button>
          <h3>Response:</h3>

          <div className="embedded-respons">
            <p className="token-line">

              <strong> access token: </strong>
              <span className="token-text">
                {result ? prettierToken(result.access_token) : "No token generated"}
              </span>

              {result && (
                <button
                  className="copy-icon-btn"
                  onClick={() => navigator.clipboard.writeText(result.access_token)}
                >
                  <Copy size={18} strokeWidth={1.5} />
                </button>
              )}
            </p>

            <p>
              <strong>scope:</strong> {result ? result.scope : "N/A"}</p>
            <p> <strong>token type:</strong> {result ? result.token_type : "N/A"}</p>
            <p> <strong>expires in:</strong> {result ? result.expires_in : "N/A"} seconds</p>
          </div>
          {result && (
            <>
              <h3>Access Token:</h3>
              <textarea
                style={{ width: "100%", height: 180 }}
                value={result.access_token}
                readOnly
              />


            </>
          )}
        </div>
      </div>
    </div>
  );
}



export default App
