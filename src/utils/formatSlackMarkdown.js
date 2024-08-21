const formatSlackMarkdown = (input) => {
	return (
		input
			// Bold: *bold* or *bold*
			.replace(/\*\*([^*]+)\*\*/g, '*$1*')
			.replace(/\_\_([^_]+)\_\_/g, '*$1*')

			// Italic: _italic_
			.replace(/\_([^_]+)\_/g, '_$1_')

			// Strikethrough: ~strikethrough~ or ~strikethrough~
			.replace(/\~\~([^~]+)\~\~/g, '~$1~')
			.replace(/\~([^~]+)\~/g, '~$1~')

			// Links: [text](url)
			.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<$2|$1>')

			// Inline Code: `code`
			.replace(/`([^`]+)`/g, '`$1`')

			// Block Code: ```code
			.replace(/```([^`]+)```/g, '```$1```')
			// Unordered lists: - item or * item
			.replace(/^\s*([-]) (.)$/gm, (match, marker, item) => {
				return `• ${item}`; // Chuyển danh sách chính thành dấu tròn
			})
			// Ordered lists: 1. item
			.replace(/^\d+\. (.*)$/gm, (match, item) => {
				const index = match.match(/^\d+/)[0]; // Lấy số ở đầu dòng
				return `${index}. ${item}`; // Giữ nguyên số thứ tự
			})
			// Heading: # Heading to ###### Heading
			.replace(/^(#+) (.+)$/gm, (match, hashes, text) => {
				return `*${text}*`; // Chuyển tất cả tiêu đề thành bold
			})
	);
};
export default formatSlackMarkdown;
