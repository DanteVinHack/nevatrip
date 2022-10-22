const addTableHeader = (infoHeader) => {
  const tHead = document.createElement('thead')
  const tr = document.createElement('tr')

  for (const info in infoHeader) {
    const th = document.createElement('th')
    th.classList = 'th'
    
    th.textContent = info;

    tr.append(th)
  }

  tHead.append(tr)
  
  return tHead
}

const addTableBody = (infoBody) => {
  const tBody = document.createElement('tbody')

  for (const body of infoBody) {
    const tr = document.createElement('tr')

    for (const info in body) {
      const td = document.createElement('td')
      td.classList = 'td'
      
      td.textContent = body[info];

      tr.append(td)
    }

    tBody.append(tr)
  }

  return tBody
}


export default (usersOrder) => {
  const table = document.createElement('table');
  table.className = 'table';

  const tHead = addTableHeader(usersOrder[0]);
  const tBody = addTableBody(usersOrder);

  document.body.append(tHead)

  table.append(tHead)
  table.append(tBody)
  
  return table;
}