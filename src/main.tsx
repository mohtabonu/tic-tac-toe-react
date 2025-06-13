import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Tictac } from './tictac';

const root = createRoot(document.getElementById('root')!);

root.render(
	<StrictMode>
		<Tictac />
	</StrictMode>
);
