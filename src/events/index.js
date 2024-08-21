import registerAppMentionEvent from './appMention.js';
import registerMessageEvent from './message.js';
import registerAppHomeOpenedEvent from './appHomeOpened.js';
import registerAppHomeSubmitConfigEvent from './appHomeSubmitConfig.js';

export const registerEvents = (app) => {
	registerAppMentionEvent(app);
	registerMessageEvent(app);
	registerAppHomeOpenedEvent(app);
	registerAppHomeSubmitConfigEvent(app);
};
