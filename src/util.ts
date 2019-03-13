export type OutputHandler = (...args: any) => void;

export interface OutputHandlers {
	echo: OutputHandler;
	notice: OutputHandler;
	warn: OutputHandler;
	err: OutputHandler;
}
