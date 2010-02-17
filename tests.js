// HOLY CRAP HOW DO YOU TEST THIS?!?!?!?
if(!window.fireunit) alert('requires firebug and fireunit');
else{
	var eventTesters = {}
	$.Protokol.register( 'test', 'click', function( evt ){
		eventTesters['ONE'] = {
			msg: 'First bound event fired with success',
			ok: true
		};
	}).register( 'test', 'submit',function( evt ){
		eventTesters['NULL'] = {
			msg: 'The submit event should not have fired on a anchor click',
			ok: false
		};
	}).register( 'test','click',function( evt ){
		eventTesters['TWO'] = {
			msg: 'Second bound event fired with success',
			ok: true
		};
	}).unregister( 'test', 'submit');
	$(document).one('click',function(){
		fireunit.ok( window.fireunit, 'Fireunit is in da house!' );		
		
		fireunit.group('Anchors')
			if(eventTesters['ONE']) fireunit.ok(eventTesters['ONE'].ok,eventTesters['ONE'].msg);
			else fireunit.ok(false,'First handler not fired!');
			if(eventTesters['NULL']) fireunit.ok(eventTesters['NULL'].ok,eventTesters['NULL'].msg);		
			else fireunit.ok(true, 'Submit events do not fire on anchor clicks, good');
			if(eventTesters['TWO']) fireunit.ok(eventTesters['TWO'].ok,eventTesters['TWO'].msg);
			else fireunit.ok(false,'Second handler not fired!');
		fireunit.groupEnd()
		
		fireunit.group('Forms');
		fireunit.groupEnd();		

		fireunit.testDone();
	});
};//END ELSE
// start tests
$(function(){
	
	$('#testanchor').trigger('click');
	$('#submit').trigger('click');
})