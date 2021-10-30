const colorTask = require("../../tasks/colorChangeTask");
const newsTask = require("../../tasks/news");
module.exports = {
  name: "task",
  description: "admin only command for initiating a task",
  options: [
    {
      name: "selecttask",
      description: "Which task would you like to initiate?",
      type: "STRING",
      choices: [
        {
          name: "colorchange",
          value: "colorchange",
        },
        {
          name: "news",
          value: "news",
        },
      ],
    },
  ],
  execute(interaction) {
    if (interaction.options.getString("selecttask") === "colorchange") {
      interaction.followUp("done");
      colorTask();
    } else if (interaction.options.getString("selecttask") === "news") {
      interaction.followUp("done");
      newsTask();
    }
  },
};
