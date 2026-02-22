const { workspace } = require("vscode")

module.exports = {
	shorthand_for_properties: new Map(
		workspace
			.getConfiguration()
			.get(
				"click-css.custom.shorthand_for_properties"
			)
	),
	shorthand_for_values: new Map(
		workspace
			.getConfiguration()
			.get(
				"click-css.custom.shorthand_for_values"
			)
	),
	shorthand_for_media_condition: new Map(
		workspace
			.getConfiguration()
			.get(
				"click-css.custom.shorthand_for_media_condition"
			)
	),
	default_unit: "px"
}