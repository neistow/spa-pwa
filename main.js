function loadData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function renderTable(el, tableConfig, data) {
    const renderHeader = headerCols =>
        `<thead>
            <tr>
                ${headerCols.map(c => `<th scope="col">${c}</th>`).join('')}
                <th>Action</th>
            </tr>
        </thead>`;

    const renderBody = (bodyColumns, rows) => {
        const renderItem = (row, col) => `<td>${row[col]}</td>`;
        const renderRow = row =>
            `<tr>
                    ${bodyColumns.map(col => renderItem(row, col)).join('')}
                    <td delete-btn del-id="${row.id}" class="text-danger">Delete</td>
                </tr>`;
        return `<tbody>${rows.map(row => renderRow(row)).join('')}</tbody>`;
    };

    render(el, `<table class="table">
                        ${renderHeader(tableConfig.headerColumns)}
                        ${renderBody(tableConfig.bodyColumns, data)}
                      </table>`);

    setTimeout(() => {
        document.querySelectorAll('td[delete-btn]')
                .forEach(n => n.addEventListener('click', () => tableConfig.deleteHandler(n.getAttribute('del-id'))))
    })
}

function render(el, content) {
    el.innerHTML = content;
}
