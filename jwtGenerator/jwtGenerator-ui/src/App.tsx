
import { useState } from "react";
import { generateToken } from "./jwtService";
import "./App.css";
import { Copy,  Trash2Icon } from "lucide-react";
import { isValidPnr } from "./validator";

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
type Parameter = {
  id: number;
  name: string;
  value: string;
  enabled: boolean;
}

function App() {
  const [env, setEnv] = useState("ct2" as Environment);
  const [pnr, setPnr] = useState("199001012070");
  const [result, setResult] = useState<TokenResponse | null>(null);
  const [officerActAsCustomer, setOfficerActAsCustomer] = useState(false);
  const [officerAsCustomerPnr, setOfficerAsCustomerPnr] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [preset, setPreset] = useState<"individual" | "officer" | "system">("individual");
  const [hasError, setHasError] = useState(false);
  const [parameters, setParameters] = useState<Parameter[]>([]);

  const addParameter = () => {
    setParameters(
      (prev) => [
        ...prev, { id: Date.now(), name: "", value: "", enabled: true }
      ]
    )
  }

  const removeParameter = (id: number) => {
    setParameters(
      (prev) => prev.filter(x => x.id != id)
    )
  }

  const updateParameter = (id: number, field: "value" | "name", newValue: string) => {
    setParameters(
      (prev) => prev.map(x =>
        x.id === id ? { ...x, [field]: newValue } : x
      )
    )
  }

  const hasGeneralError = () => {
    const hasInvalidParam = parameters.some(x => x.enabled && (!x.name || !x.value));
    if (hasInvalidParam || !isValidPnr(pnr) || (preset === "officer" && officerActAsCustomer && !isValidPnr(officerAsCustomerPnr))) {
      return true
    }
    return false;
  }

  const handleGenerate = async () => {
    if (!hasGeneralError()) {
      const extraPatameters: Record<string, string> = Object.fromEntries(
        parameters
          .filter(p => p.enabled)
          .map(p =>
            [p.name, p.value]
          ));

      const res = await generateToken(pnr, env, preset, extraPatameters, officerAsCustomerPnr);
      setResult(res);
      setHasError(false);
    }
    else { setHasError(true) }
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
          <label>Personnummer (ÅÅÅÅMMDDXXXX) </label>
          <input
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            style={{ width: "93%", marginBottom: 0 }}
          />
          {hasError && !isValidPnr(pnr) && <p style={{ color: "red", marginTop: 0 }}>Ogiltigt personnummer</p>}
          <label>Environment: </label>
          <select value={env} onChange={(e) => setEnv(e.target.value as Environment)}>
            {Object.values(Environment).map((envOption) => (
              <option key={envOption} value={envOption}>
                {envOption.toUpperCase()}
              </option>
            ))}
          </select>
          <label >Preset: </label>
          <select value={preset} onChange={(e) => setPreset(e.target.value as "individual" | "officer" | "system")}>
            <option value="individual">Kund</option>
            <option value="officer">Handläggare</option>
            <option value="system">System</option>
          </select>
          {preset === "officer" && (
            <label style={{ marginInline: 0 }}>
              som en kund
              <input style={{ width: "9%" }} type="checkbox" id="asdfs" onChange={(e) => setOfficerActAsCustomer(e.target.checked)} />
            </label>
          )}
          {preset === "officer" && officerActAsCustomer &&
            <>
              <label>Ange personnummer för kunden</label>
              <input
                value={officerAsCustomerPnr}
                onChange={(e) => setOfficerAsCustomerPnr(e.target.value)}
                style={{ width: "93%", marginBottom: 0 }}
              />
              {hasError && !isValidPnr(officerAsCustomerPnr) && <p style={{ color: "red", marginTop: 0 }}>Ogiltigt personnummer för kunden</p>}
            </>
          }
          <hr />
          {
            <div className="params">
              {parameters.map((param) => (
                <div key={param.id} className={`${param.enabled? "param-card" : "param-card_disabled"}`}>
                  <div className="param-row">
                    <input
                      type="checkbox"
                      checked={param.enabled}
                      onChange={() =>
                        setParameters(prev =>
                          prev.map(p =>
                            p.id === param.id ? { ...p, enabled: !p.enabled } : p
                          )
                        )
                      }
                    />
                    <input
                      className={`input_${hasError && param.enabled && !param.name ? "error" : ""}`}
                      value={param.name}
                 
                    placeholder="name"
                      onChange={(e) => updateParameter(param.id, "name", e.target.value)}
                    />
                    <input
                      className={`input_${hasError && param.enabled && !param.value ? "error" : ""}`}
                      value={param.value}
                      placeholder="value"
                      onChange={(e) => updateParameter(param.id, "value", e.target.value)}
                    />
                    <Trash2Icon
                      className="delete-icon"
                      size={17
                      }
                      onClick={() => removeParameter(param.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          }
          <button className="add-btn" onClick={addParameter}>
              Add parameter
        </button>
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
                  onClick={() => {
                    navigator.clipboard.writeText(result.access_token);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                >
                  {isCopied ? " ✔ copied" : <Copy size={18} strokeWidth={1.5} />}
                </button>
              )}
            </p>
            <p><strong>scope:</strong> {result ? result.scope : "N/A"}</p>
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
