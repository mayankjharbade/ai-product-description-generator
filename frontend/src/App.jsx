import { useState } from "react";

function App() {

  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateDescription = async () => {

    if (!productName || !features) {
      alert("Please enter product name and features");
      return;
    }

    setLoading(true);
    setDescription("");
    setCopied(false);

    try {

      const response = await fetch("https://ai-product-description-generator-q27g.onrender.com/generate-description",
 {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          productName,
          features
        })

      });

      const data = await response.json();

      setDescription(data.description);

    } catch (error) {

      setDescription("Error generating description");

    }

    setLoading(false);

  };


  const copyToClipboard = () => {

    navigator.clipboard.writeText(description);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);

  };


  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          AI Product Description Generator
        </h1>

        <p style={styles.subtitle}>
          Generate powerful ecommerce descriptions using AI
        </p>


        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={styles.input}
        />


        <textarea
          placeholder="Enter product features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          style={styles.textarea}
        />


        <button
          onClick={generateDescription}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <span style={styles.loader}></span>
          ) : (
            "Generate Description"
          )}
        </button>


        {description && (

          <div style={styles.resultBox}>

            <div style={styles.resultHeader}>

              <h3 style={{ margin: 0 }}>Generated Description</h3>

              <button
                onClick={copyToClipboard}
                style={styles.copyButton}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>

            </div>

            <p style={styles.resultText}>
              {description}
            </p>

          </div>

        )}

      </div>

    </div>

  );

}



const styles = {

  page: {

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "linear-gradient(135deg, #0f0f1a, #1a0033)",

    fontFamily: "system-ui, -apple-system, sans-serif",

    padding: "20px",

  },


  card: {

    background: "#111",

    padding: "40px",

    borderRadius: "16px",

    width: "100%",

    maxWidth: "800px",

    boxShadow: "0 0 40px rgba(128,0,255,0.2)",

    border: "1px solid rgba(128,0,255,0.2)",

  },


  title: {

    color: "white",

    marginBottom: "10px",

    fontSize: "28px",

  },


  subtitle: {

    color: "#aaa",

    marginBottom: "30px",

  },


  input: {

    width: "100%",

    padding: "14px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid #333",

    background: "#1a1a1a",

    color: "white",

    fontSize: "16px",

  },


  textarea: {

    width: "100%",

    padding: "14px",

    height: "140px",

    marginBottom: "20px",

    borderRadius: "8px",

    border: "1px solid #333",

    background: "#1a1a1a",

    color: "white",

    fontSize: "16px",

  },


  button: {

    width: "100%",

    padding: "14px",

    background: "linear-gradient(90deg, #7b2ff7, #f107a3)",

    border: "none",

    borderRadius: "8px",

    color: "white",

    fontSize: "16px",

    cursor: "pointer",

    marginBottom: "20px",

  },


  loader: {

    width: "20px",

    height: "20px",

    border: "3px solid white",

    borderTop: "3px solid transparent",

    borderRadius: "50%",

    display: "inline-block",

    animation: "spin 1s linear infinite",

  },


  resultBox: {

    background: "#1a1a1a",

    padding: "20px",

    borderRadius: "10px",

    border: "1px solid #333",

  },


  resultHeader: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "10px",

    color: "white",

  },


  resultText: {

    color: "#ddd",

    lineHeight: "1.6",

  },


  copyButton: {

    background: "#7b2ff7",

    border: "none",

    padding: "6px 12px",

    borderRadius: "6px",

    color: "white",

    cursor: "pointer",

  },

};


// animation fix
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);


export default App;