/*  _______           __ _______               __         __   
   |   |   |.-----.--|  |   _   |.-----.-----.|__|.-----.|  |_ 
   |       ||  _  |  _  |       ||__ --|__ --||  ||__ --||   _|
   |__|_|__||_____|_____|___|___||_____|_____||__||_____||____|
   (c) 2022-present FSG Modding.  MIT License. */

// Debug window UI

/* global processL10N, fsgUtil, bootstrap */

window.debug.receive('fromMain_debugLog', (data) => {
	const showData  = []
	const levelInfo = new RegExp(/<span class="log_level .+?">(.+?)<\/span>/)
	const showThese = fsgUtil.queryA(':checked').map((element) => element.id.replace('debug_', '').toUpperCase() )

	for ( const line of data.split('\n') ) {
		if ( showThese.includes(line.match(levelInfo)[1].trim()) ) { showData.push(line) }
	}

	fsgUtil.byId('debug_log').innerHTML = showData.join('\n')
})

function clientResetButtons() {
	for ( const element of fsgUtil.query('.filter_only') ) {
		element.checked = ! ( element.id === 'debug_debug' )
	}
	window.debug.getDebugLogContents()
}

window.addEventListener('DOMContentLoaded', () => {
	processL10N()

	fsgUtil.queryA('[data-bs-toggle="tooltip"]').map((element) => new bootstrap.Tooltip(element))
})
