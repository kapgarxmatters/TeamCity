/*
 * Library used to get the individual changes of committers to a failed build.
 */



exports.teamcityGet = function(buildid){
  console.log("Get TeamCity Info: " + buildid);
   var teamcityRequest = http.request({
        'endpoint': 'TeamCity',
        'method': 'GET',
        'path': '/app/rest/changes?locator=build:(id:' + buildid + ')',
        'headers': {
            'Content-Type': 'application/json'
        }
    });


    /** Make the request to the external system and verify that it is successful. **/
    var response = teamcityRequest.write();
    if (response.statusCode != 200 ) {
        console.log('\nThere was an error updating the external system.\n');
        return;
    }

    /** Write the response from the external system to the activity stream. **/
    console.log(JSON.stringify(response));
    return JSON.parse(response.body);
}
