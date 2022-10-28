import '../scss/style.scss'
import createTable from './create-table.js';
import response from '../assets/tickets.json';

// Здесь мы имитируем получение данных,
// но для получения настоящий данных могли бы использовать
// библиотеку "Axios" или же fetch запросы встроенные в браузер
const getTickets = async () => {


  // Изменяем данные по условию задачи
  const ticketsData = response.map(ticket => ({
    ...ticket,
    equal_price: ticket.type === 'benefits' ?
    0 : ticket.type === 'group' ?
    Math.round(ticket.equal_price / 3) : ticket.equal_price,
  }));

  const table = createTable(ticketsData)

  document.body.querySelector('.container').append(table)

}

getTickets()
