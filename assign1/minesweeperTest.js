
//This is the canary test
describe('canary', function(){

  it('runs', function(){
  	console.log('Running canary test...');

  	//test will fail
    //expect(false).toEqual(true);

    //test will pass
    expect(true).toEqual(true);
  });

});