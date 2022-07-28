import * as React from 'react';

type state = React.Dispatch<React.SetStateAction<string>>

function feedBack(fn: state, message: string, delay: number) {
	fn(message);
	setTimeout(() => {
		fn('');
	}, delay);
}

export default feedBack;