// Imports
import '../scss/style.scss';

const routeSelect = document.querySelector('#route');
let selectedRoute, selectedTimeReverse, selectedTime, ticketCount;

routeSelect.addEventListener('change', ({ target }) => {
  selectedRoute = target.value;

  if (!document.body.querySelector('#reverse-time')) {
    const label = document.createElement('label');
    label.id = 'reverse-label-js'
    label.className = 'label';
    label.innerText = 'Выбиреты обратное время билета'

    const reverseTimeSelect = document.createElement('select');
    reverseTimeSelect.id = 'reverse-time'

    reverseTimeSelect.addEventListener('change', ({ target }) => selectedTimeReverse = target.value);

    const timeOptions = document.querySelectorAll('#time option');

    timeOptions.forEach(option => reverseTimeSelect.append(option.cloneNode(true)))

    target.after(reverseTimeSelect);
    reverseTimeSelect.before(label);
    return;
  }
  if (selectedRoute !== 'из A в B и обратно в А') {
    document.body.querySelector('#reverse-time').remove();
    document.body.querySelector('#reverse-label-js').remove()
  }
});

const timeSelect = document.querySelector('#time');

timeSelect.addEventListener('change', ({ target }) => selectedTime = target.value);

const countInput = document.querySelector('#num');

countInput.addEventListener('input', ({ target }) => ticketCount = target.value);

const calcButton = document.querySelector('#calc');

calcButton.addEventListener('click', ({ target }) => {
  const resultText = document.createElement('p');
  resultText.id = 'result-js';

  let finalCost, travelTime, time;
  finalCost = caclFinalCost(ticketCount, selectedRoute);

  if (!selectedTimeReverse) {
    travelTime = calcTravelTime(selectedRoute);
    time = calcTime(selectedTime);
  } else {
    let selectTime = selectedTime.split('(')[0];
    let reverseTime = selectedTimeReverse.split('(')[0];
    let selectPlace = selectedTime.split('(')[1];
    let reversePlace = selectedTimeReverse.split('(')[1];

    if (selectTime === reverseTime && selectPlace === reversePlace) {
      resultText.innerText = 'Вы не можете отправляться в одно и тоже время'
    } else {
      travelTime = calcTravelTime(selectedRoute);
      time = calcTime(selectedTime);
    }
  }

  resultText.innerText = resultText.innerText || `
    Вы выбрали ${ticketCount} билета по маршруту ${selectedRoute} стоимостью ${finalCost}р.
    Это путешествие займет у вас ${travelTime}.
    Теплоход отправляется в ${time.start}, а прибудет в ${time.end}.
  `

  if (document.body.querySelector('#result-js')) {
      const result = document.querySelector('#result-js');
      result.replaceWith(resultText)
  } else {
    target.after(resultText)
  }
})

function caclFinalCost(ticketCount, route) {
  if (route === 'из A в B' || route === 'из B в A') {
    return ticketCount * 700;
  } else {
    return ticketCount * 1200;
  }
}

function calcTravelTime(route) {
  if (route === 'из A в B' || route === 'из B в A') {
    return '50 минут'
  } else {
    return '1 час и 40 минут'
  }
}

function calcTime(time) {
  const [ startTime ] = time.split('(');
  const travelTime = calcTravelTime(selectedRoute);

  const endTime = calcEndTime(startTime, travelTime);

  return {start: startTime, end: endTime};
}

function calcEndTime(time, travelTime) {
  const endTime = time.split(':');

  if (travelTime === '50 минут') {
    endTime[1] = +endTime[1] + 50;

  } else {
    endTime[0] = +endTime[0] + 1
    endTime[1] = +endTime[1] + 40
  }

  while (+endTime[1] >= 60) {
    endTime[0]++;
    endTime[1] = +endTime[1] - 60
  }

  return endTime.join(':');
}
