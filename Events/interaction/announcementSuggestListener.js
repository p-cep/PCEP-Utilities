const suggestionsChannelId = "926743021008068608";
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isButton()) {
      if (interaction.channel.id === suggestionsChannelId) {

      }
    }
  },
};
