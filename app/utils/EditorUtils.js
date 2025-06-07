// utils/flowIO.ts

export function downloadFlowAsJSON(nodes, edges, filename = "flow.json") {
  const element = window.document.createElement("a");
  const file = new Blob([JSON.stringify({ nodes, edges }, null, 2)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function readFlowJSONFile(file, callback) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const result = JSON.parse(event.target.result);
      if (Array.isArray(result.nodes) && Array.isArray(result.edges)) {
        callback(result);
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
}
