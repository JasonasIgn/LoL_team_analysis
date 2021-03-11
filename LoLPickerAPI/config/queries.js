"use strict";

module.exports = {
  getRoleWinsByRole: function (role) {
    return `
  SELECT team1_${role} as championId, SUM(wins) AS totalWins
  FROM (
    SELECT team1_${role}, SUM(team1_wins) AS wins
    FROM matchups
    GROUP BY team1_${role}

    UNION ALL

    SELECT team2_${role}, SUM(team2_wins) AS wins
    FROM matchups
    GROUP BY team2_${role}
  ) t
  GROUP BY team1_${role}
  ORDER BY championId ASC;
  `;
  },
  getRoleTotalGamesByRole: function(role) {return `
  SELECT championId, COUNT(*) as totalGames
  FROM (
      SELECT team1_${role} AS championId 
      FROM matchups

      UNION ALL

      SELECT team2_${role} AS championId 
      FROM matchups
  ) t
  group by championId
  ORDER BY championId ASC;
`},
};
