/* eslint-disable quotes */
function template(title, content) {
  // eslint-disable-next-line no-use-before-define
  const jsScript = sortingScript();
  return `<!DOCTYPE html>
<html lang="is">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="../public/styles.css"/>
    </head>
    <body>${content}</body>
    ${jsScript}
</html>`;
}

function removeComma(val) {
  const trueval = val.replace(/,/g, "");
  return trueval;
}

export function stats(result) {
  const entries = result.classes;

  const resultHeader = entries
    .splice(0, 1)
    .map(
      (i) => `<tr>
                ${i.map(
                  (k) => `<th onclick="sortTable(${i.indexOf(k)})">${k}</th>`
                )}
                </tr>`
    )
    .join("\r\n");

  const resultHtml = entries
    .splice(1)
    .map(
      (i) => `<tr>
                ${i.map((k) => `<td>${k}</td>`)}
                </tr>`
    )
    .join("\r\n");

  return `
  <h2 class="title"></h2>
  <p class="description"></p>
    	<table id="myTable">
        ${removeComma(resultHeader)}
        ${removeComma(resultHtml)}
        </table>`;
}

export function index(result) {
  const entries = result;

  const list = entries
    .slice(1)
    .map(
      (i) => `
  <li>
    <h2>${i[0]}</h2>
    <p>${i[1]}</p>
    <a href="${i[2].replace(".csv", ".html")}">Hlekkur að námsbraut</a>
    </li>`
    )
    .join("\r\n");

  return `<section>
  <h1>Kennsluskrá</h1>
  <ul>${list}</ul>
</section>`;
}

export function statsTemplate(title, result) {
  return template(title, stats(result));
}

export function indexTemplate(results) {
  return template("Kennsluskrá", index(results));
}

function sortingScript() {
  return `<script>
    function sortTable(n) {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
                  no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
                    first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
                      one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
                      based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
                      and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
                      set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
  </script>`;
}
