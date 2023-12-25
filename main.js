   function createContributionCell(level, contributions, date) {
    const cell = document.createElement('div');
    cell.classList.add('contribution-cell', `level-${level}`);
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = `Contributions: ${contributions}\nDate: ${formatDate(date)}`;
    cell.appendChild(tooltip);

    return cell;
  }

  function drawContributionGraph(data) {
    const container = document.getElementById('app');
    const contributionGrid = document.createElement('div');
    contributionGrid.classList.add('contribution-grid');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 50 * 7); // От текущей даты -50 недель
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 51; j++) {
        const dateKey = currentDate.toISOString().split('T')[0];
        const contributions = data[dateKey] || 0;
        const level = getContributionLevel(contributions);

        const cell = createContributionCell(level, contributions, currentDate);
        contributionGrid.appendChild(cell);

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    container.appendChild(contributionGrid);
  }

  
   function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

function getContributionLevel(contributions) {
  if (contributions === 0) return '0';
  if (contributions >= 1 && contributions <= 9) return '1-9';
  if (contributions >= 10 && contributions <= 19) return '10-19';
  if (contributions >= 20 && contributions <= 29) return '20-29';
  return '30';
}

fetch('https://dpg.gg/test/calendar.json')
  .then(res => res.json())
  .then(data => drawContributionGraph(data))
  .catch(error => console.error('Ошибка при получении данных:', error));