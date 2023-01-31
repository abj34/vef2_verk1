
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


    return val.toString();
}

export function stats(result) {
    
    const entries = Object.entries(result.classes);

    const resultHtml = entries
        .map(
            (i) => `<ul><li>${formatValue(i)}</li></ul>` 
        )
        .join('\n');
    
    return `
        ${resultHtml}
        `;
}

export function statsTemplate(title, result) {
    return template(title, stats(result));
}