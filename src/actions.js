//@flow

export function updatePlayerState(prevoiusState: string, currentState: string) {
	return {
		type: 'UPDATE_PLAYER_STATE',
		obj: {prevoiusState, currentState}
	};
}

export function updateIsPlaying(isPlaying: boolean) {
	return {
		type: 'UPDATE_IS_PLAYING',
		isPlaying
	};
}

export function updateCurrentTime(currentTime: number) {
	return {
		type: 'UPDATE_CURRENT_TIME',
		currentTime
	};
}

export function updateVirtualTime(virtualTime: number) {
	return {
		type: 'UPDATE_SEEKBAR_VIRTUAL_PROGRESS',
		virtualTime
	};
}

export function updateSeekbarDraggingStatus(draggingActive: boolean) {
	return {
		type: 'UPDATE_SEEKBAR_DRAGGING_STATUS',
		draggingActive
	};
}

export function updateDuration(duration: number) {
	return {
		type: 'UPDATE_DURATION',
		duration
	};
}

export function updateVolume(volume: number) {
	return {
		type: 'UPDATE_VOLUME',
		volume
	};
}

export function updateVolumeDraggingStatus(draggingActive: boolean) {
	return {
		type: 'UPDATE_VOLUME_DRAGGING_STATUS',
		draggingActive
	};
}

export function updateMuted(muted: boolean) {
	return {
		type: 'UPDATE_MUTED',
		muted
	};
}

export function updateFullscreen(fullscreen: boolean) {
	return {
		type: 'UPDATE_FULLSCREEN',
		fullscreen
	};
}

export function updateLoadingSpinnerState(showLoadingSpinner: boolean) {
	return {
		type: 'UPDATE_LOADING_SPINNER_STATE',
		showLoadingSpinner
	};
}

export function addPlayerClass(className: string) {
	return {
		type: 'ADD_PLAYER_CLASS',
		className
	};
}

export function removePlayerClass(className: string) {
	return {
		type: 'REMOVE_PLAYER_CLASS',
		className
	};
}
