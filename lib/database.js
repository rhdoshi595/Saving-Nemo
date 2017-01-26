const leaderCompare = (leaders) => {
  const allLeaders = Object.keys(leaders);
  const idx = allLeaders.indexOf('low');
  const sortedLeaders =
    allLeaders.slice(0, idx).concat(allLeaders.slice(idx + 1));

  sortedLeaders.sort((a, b) => {
    if (leaders[a] < leaders[b]) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedLeaders;
};

const populateLeaderboard = (sortedLeaders, leaders) => {
  const leaderList = $('.leader-list');
  leaderList.empty();

  for (let i = 0; i < sortedLeaders.length; i++) {
    let leaderItem = $('<li>');
    let leader = sortedLeaders[i].split('___')[0];
    leaderItem.text(`${leader} - ${leaders[sortedLeaders[i]]}`);
    leaderList.append(leaderItem);
  }
};

const setLowScore = (database, score, leaders, sortedLeaders) => {
  const newLow = leaders[sortedLeaders[9]];
  const oldLow = leaders[sortedLeaders[10]];
  if (oldLow) {
    database.ref(`leaderboard/${sortedLeaders[10]}`).remove();
  } else {
    database.ref(`leaderboard/low`).set(newLow);
  }
};

const renderLeaderForm = (database, score, newHighScoreCB) => {
  $('.leader-form').removeClass('hidden');
  $('.form')[0].value = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = $('.form')[0].value;
    const salt1 = Math.floor(Math.random() * 1000);
    const salt2 = Math.floor(Math.random() * 1000);
    const leaderName = `${name}___${salt1 * salt2}`;
    database.ref(`leaderboard/${leaderName}`).set(score);
    $('.leader-form').addClass('hidden');
    $('.leader').removeClass('hidden');
    newHighScoreCB();
    $('.l-form').off('submit', handleSubmit);
  };
  $('.l-form').on('submit', handleSubmit);
};

const Database = {
  fetchHighscores(GameView, database) {
    let leaders;
    let sortedLeaders;

    database.ref(`leaderboard/`).on('value', (snapshot) => {
      leaders = snapshot.val();
      sortedLeaders = leaderCompare(leaders);
      GameView.currentLow = leaders['low'];
      populateLeaderboard(sortedLeaders, leaders);
    });
  },

  setHighscore(database, score) {
    const newHighScoreCB = () => {
      database.ref(`leaderboard/`).once('value').then((snapshot) => {
        const leaders = snapshot.val();
        const sortedLeaders = leaderCompare(leaders);
        setLowScore(database, score, leaders, sortedLeaders);
      });
    };
    renderLeaderForm(database, score, newHighScoreCB);
  },
};

module.exports = Database;
