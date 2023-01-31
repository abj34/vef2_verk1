function template(title, content) {
  return `<!DOCTYPE html>
<html lang="is">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="../public/styles.css"/>
    </head>
    <body>${content}</body>
</html>`;
}

function formatValue(val) {
  if (val === undefined) {
    return "óskilgreint";
  }

  if (val === ",") {
    return null;
  }

  return val.toString();
}

function removeComma(val) {
  const trueval = val.replace(/\,/g, "");
  return trueval;
}

export function stats(result) {
  const entries = result.classes;

  const resultHtml = entries
    .map(
      (i) => `<tr>
                ${i.map((k) => `<th>${formatValue(k)}</th>`)}
                </tr>`
    )
    .join("\n");

  return `<table>
        ${removeComma(resultHtml)}
        </table>`;
}

export function statsTemplate(title, result) {
  return template(title, stats(result));
}
